/* Exercise the real TypeScript modules without adding a test-runner dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { PNG } = require("pngjs");
const loaded = new Map();
function load(name) {
  const file = path.resolve(__dirname, "..", name);
  if (loaded.has(file)) return loaded.get(file).exports;
  const module = { exports: {} };
  loaded.set(file, module);
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const localRequire = (id) =>
    id.startsWith("@/") ? load(`src/${id.slice(2)}.ts`) : require(id);
  new Function("require", "module", "exports", output)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}
(async () => {
  const { cafes, sortCafes, cafeRank } = load("src/data/cafes.ts");
  assert.equal(cafes.length, 4);
  assert.equal(sortCafes(cafes, "coffee")[0].id, "caphein");
  assert.equal(sortCafes(cafes, "overall")[0].id, "cannelle");
  assert.equal(cafeRank(cafes, cafes[1], "study"), 1);
  assert.equal(cafeRank(cafes, cafes[2], "study"), 1);
  const sample = cafes.map((cafe) => ({
    ...cafe,
    ratings: { ...cafe.ratings },
  }));
  sample[3].ratings = { coffee: null, study: null, overall: null };
  sample[0].ratings = { coffee: 3, study: 5, overall: 2 };
  sample[1].ratings = { coffee: 5, study: 2, overall: 4 };
  sample[2].ratings = { coffee: 5, study: 3, overall: 5 };
  assert.deepEqual(
    sortCafes(sample, "coffee").map((c) => c.id),
    ["cannelle", "m36", "blossom", "caphein"],
  );
  assert.equal(sortCafes(sample, "study")[0].id, "blossom");
  assert.equal(sortCafes(sample, "overall")[0].id, "m36");
  assert.equal(cafeRank(sample, sample[1], "coffee"), 1);
  assert.equal(cafeRank(sample, sample[2], "coffee"), 1);
  assert.equal(cafeRank(sample, sample[0], "coffee"), 3);
  assert.equal(cafeRank(sample, sample[3], "coffee"), null);
  assert.deepEqual(sortCafes(sample, "visited"), sample);
  assert.deepEqual(
    cafes.map((c) => c.id),
    ["blossom", "cannelle", "m36", "caphein"],
  );
  console.log(
    "PASS: café sorting by three categories, shared ranks, unrated entries, and original order",
  );
  const { projects } = load("src/data/projects.ts");
  assert.equal(projects.length, 9);
  assert.equal(projects.filter((p) => p.selected).length, 3);
  assert.deepEqual(
    projects.filter((p) => p.selected).map((p) => p.id),
    ["finsearch", "resumetailor", "project6"],
  );
  const { experienceTiles } = load("src/data/story.ts");
  assert.deepEqual(
    experienceTiles.map((item) => item.id),
    ["visa", "marc", "formula-sae", "waterloo"],
  );
  for (const value of [projects, experienceTiles, load("src/data/hero.ts")]) {
    assert(
      !JSON.stringify(value).includes(String.fromCodePoint(0x2014)),
      "Content contains an em dash",
    );
  }
  for (const project of projects) {
    assert(
      fs.existsSync(path.join(__dirname, "../public", project.image)),
      `Missing image: ${project.id}`,
    );
    if (project.video)
      assert(
        fs.existsSync(path.join(__dirname, "../public", project.video)),
        `Missing video: ${project.id}`,
      );
    assert(!project.github || project.github.startsWith("https://github.com/"));
    assert(!project.demo || project.demo.startsWith("https://"));
    if (project.id !== "WIP")
      for (const field of [
        "problem",
        "role",
        "constraints",
        "decisions",
        "result",
        "learned",
      ])
        assert(project.caseStudy[field]);
  }
  console.log("PASS: catalog, case studies, links, and local assets");
  const { extractThemeFromImageBuffer } = load("src/lib/paletteFromImage.ts");
  const { contrastRatio, parseHex, hslToRgb } = load("src/lib/colors.ts");
  const channels = (hex) => {
    const c = parseHex(hex);
    return [c.r, c.g, c.b];
  };
  for (let hue = 0; hue < 360; hue += 15) {
    const png = new PNG({ width: 2, height: 2 });
    const rgb = hslToRgb(hue, 85, 55);
    for (let i = 0; i < png.data.length; i += 4)
      png.data.set([rgb.r, rgb.g, rgb.b, 255], i);
    const palette = await extractThemeFromImageBuffer(PNG.sync.write(png));
    for (const background of [
      "pageBg",
      "surface",
      "surfaceElevated",
      "accentMuted",
      "goldMuted",
    ]) {
      for (const foreground of ["ink", "muted", "accent", "gold"]) {
        assert(
          contrastRatio(
            channels(palette[foreground]),
            channels(palette[background]),
          ) >= 4.5,
          `Contrast: hue=${hue}, ${foreground}/${background}`,
        );
      }
    }
    assert(
      contrastRatio([255, 255, 255], channels(palette.accent)) >= 4.5,
      `Button contrast: ${hue}`,
    );
  }
  await assert.rejects(
    extractThemeFromImageBuffer(Buffer.from("not an image")),
  );
  console.log(
    "PASS: 24 album hues meet text and button contrast targets; invalid art rejected",
  );
  const { AsyncCache } = load("src/lib/spotifyCache.ts");
  const cache = new AsyncCache(2);
  let calls = 0;
  const producer = async () => {
    calls++;
    await new Promise((r) => setTimeout(r, 5));
    return calls;
  };
  const values = await Promise.all([
    cache.get("one", 1000, producer),
    cache.get("one", 1000, producer),
  ]);
  assert.deepEqual(values, [1, 1]);
  assert.equal(await cache.get("one", 1000, producer), 1);
  assert.equal(calls, 1);
  await cache.get("two", 0, producer);
  await cache.get("two", 1000, producer);
  assert.equal(calls, 3);
  await assert.rejects(
    cache.get("failure", 1000, async () => {
      throw new Error("offline");
    }),
  );
  assert.equal(
    await cache.get("failure", 1000, async () => "recovered"),
    "recovered",
  );
  await cache.get("three", 1000, producer);
  assert.equal(await cache.get("one", 1000, producer), 5);
  console.log(
    "PASS: cache coalescing, TTL expiry, failure recovery, and eviction",
  );
  const server = load("src/lib/spotifyServer.ts");
  const originalFetch = global.fetch;
  try {
    let requests = 0;
    global.fetch = async () => {
      requests++;
      return new Response(
        JSON.stringify({ access_token: "test-token", expires_in: 3600 }),
        { status: 200 },
      );
    };
    await Promise.all([
      server.refreshSpotifyAccessToken(
        "test-refresh",
        "test-id",
        "test-secret",
      ),
      server.refreshSpotifyAccessToken(
        "test-refresh",
        "test-id",
        "test-secret",
      ),
    ]);
    await server.refreshSpotifyAccessToken(
      "test-refresh",
      "test-id",
      "test-secret",
    );
    assert.equal(requests, 1);
    const item = {
      name: "A track",
      artists: [{ name: "Artist" }],
      album: { name: "Album", images: [] },
    };
    global.fetch = async () =>
      new Response(JSON.stringify({ is_playing: false, item }));
    assert.equal(await server.fetchCurrentlyPlayingTrack("test-token"), null);
    global.fetch = async () =>
      new Response(JSON.stringify({ is_playing: true, item }));
    assert.equal(
      (await server.fetchCurrentlyPlayingTrack("test-token")).name,
      "A track",
    );
    global.fetch = async () => new Response(null, { status: 204 });
    assert.equal(await server.fetchCurrentlyPlayingTrack("test-token"), null);
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          items: [
            {
              played_at: "2026-01-01T12:00:00Z",
              track: { ...item, name: "Older" },
            },
            {
              played_at: "2026-01-02T12:00:00Z",
              track: { ...item, name: "Newest" },
            },
          ],
        }),
      );
    assert.equal(
      (await server.fetchRecentlyPlayedTrack("test-token")).name,
      "Newest",
    );
    console.log(
      "PASS: access-token reuse, paused/live/empty playback, and recent-track order",
    );
    // Integration: paused playback uses history and second request reuses the full payload.
    process.env.SPOTIFY_CLIENT_ID = "integration-id";
    process.env.SPOTIFY_CLIENT_SECRET = "integration-secret";
    process.env.SPOTIFY_REFRESH_TOKEN = "integration-refresh";
    const artwork = new PNG({ width: 2, height: 2 });
    artwork.data.fill(180);
    let artRequests = 0;
    global.fetch = async (url) => {
      if (String(url).includes("/api/token"))
        return new Response(
          JSON.stringify({
            access_token: "integration-token",
            expires_in: 3600,
          }),
        );
      if (String(url).includes("currently-playing"))
        return new Response(JSON.stringify({ is_playing: false, item }));
      if (String(url).includes("recently-played"))
        return new Response(
          JSON.stringify({
            items: [
              {
                played_at: "2026-01-02T12:00:00Z",
                track: {
                  ...item,
                  album: {
                    name: "Album",
                    images: [
                      { url: "https://i.scdn.co/image/test", width: 64 },
                    ],
                  },
                },
              },
            ],
          }),
        );
      artRequests++;
      return new Response(PNG.sync.write(artwork));
    };
    const { GET } = load("src/app/api/spotify/theme/route.ts");
    const payload = await (await GET()).json();
    assert.equal(payload.trackSource, "recent");
    assert(payload.theme);
    assert.equal(payload.ok, true);
    await GET();
    assert.equal(artRequests, 1);
    delete process.env.SPOTIFY_REFRESH_TOKEN;
    assert.deepEqual(await (await GET()).json(), { ok: false });
    console.log(
      "PASS: theme endpoint fallback, response cache, and quiet missing-config behavior",
    );
  } finally {
    global.fetch = originalFetch;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
