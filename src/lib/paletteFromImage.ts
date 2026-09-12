import jpeg from "jpeg-js";
import { PNG } from "pngjs";
import { contrastRatio, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/colors";

const WHITE: [number, number, number] = [255, 255, 255];
const OUT = 48;

function decodeBufferToRgba(buffer: Buffer): {
  data: Uint8Array;
  width: number;
  height: number;
} {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const raw = jpeg.decode(buffer, {
      useTArray: true,
      maxMemoryUsageInMB: 64,
    });
    return {
      width: raw.width,
      height: raw.height,
      data: new Uint8Array(
        raw.data.buffer,
        raw.data.byteOffset,
        raw.data.length,
      ),
    };
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    const png = PNG.sync.read(buffer);
    return {
      width: png.width,
      height: png.height,
      data: new Uint8Array(png.data),
    };
  }

  throw new Error(
    "Album art must be JPEG or PNG for theme extraction (Spotify sometimes serves WebP; try another image size or track).",
  );
}

/** Nearest-sample downscale to OUT x OUT RGBA */
function downsampleRgba48(src: Uint8Array, sw: number, sh: number): Uint8Array {
  const dst = new Uint8Array(OUT * OUT * 4);
  for (let y = 0; y < OUT; y++) {
    for (let x = 0; x < OUT; x++) {
      const sx = Math.min(sw - 1, Math.floor((x * sw) / OUT));
      const sy = Math.min(sh - 1, Math.floor((y * sh) / OUT));
      const si = (sy * sw + sx) * 4;
      const di = (y * OUT + x) * 4;
      dst[di] = src[si] ?? 0;
      dst[di + 1] = src[si + 1] ?? 0;
      dst[di + 2] = src[si + 2] ?? 0;
      dst[di + 3] = src[si + 3] ?? 255;
    }
  }
  return dst;
}

/** Keep saturated-midtone seed selection; derive a readable paper palette. */
export async function extractThemeFromImageBuffer(buffer: Buffer) {
  const { width, height, data: rgba } = decodeBufferToRgba(buffer);
  const data = downsampleRgba48(rgba, width, height);
  let bestScore = -1;
  let seed = { r: 66, g: 99, b: 66 };
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const { s, l } = rgbToHsl(r, g, b);
    if (s < 12 || l < 6 || l > 96) continue;
    const score = s * Math.min(l, 100 - l);
    if (score > bestScore) {
      bestScore = score;
      seed = { r, g, b };
    }
  }
  const { h, s: seedS } = rgbToHsl(seed.r, seed.g, seed.b);
  const hex = (hue: number, saturation: number, lightness: number) => {
    const { r, g, b } = hslToRgb(hue, saturation, lightness);
    return rgbToHex(r, g, b);
  };
  const page = hslToRgb(h, 22, 97);
  const elevated = hslToRgb(h, 18, 92);
  const mutedBg = hslToRgb(h, 23, 91);
  const secondaryBg = hslToRgb((h + 145) % 360, 23, 93);
  const backgrounds: [number, number, number][] = [
    [page.r, page.g, page.b],
    [elevated.r, elevated.g, elevated.b],
    [mutedBg.r, mutedBg.g, mutedBg.b],
    [secondaryBg.r, secondaryBg.g, secondaryBg.b],
  ];
  const readable = (
    hue: number,
    saturation: number,
    initialLightness: number,
  ) => {
    let lightness = initialLightness;
    let rgb = hslToRgb(hue, saturation, lightness);
    while (
      lightness > 10 &&
      [WHITE, ...backgrounds].some(
        (bg) => contrastRatio([rgb.r, rgb.g, rgb.b], bg) < 4.5,
      )
    ) {
      lightness -= 1;
      rgb = hslToRgb(hue, saturation, lightness);
    }
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };
  const accent = readable(h, Math.min(65, Math.max(30, seedS)), 36);
  const secondary = readable((h + 145) % 360, 36, 37);
  return {
    pageBg: hex(h, 22, 97),
    surface: hex(h, 20, 99),
    surfaceElevated: hex(h, 18, 92),
    ink: hex(h, 12, 14),
    muted: readable(h, 7, 40),
    border: hex(h, 12, 83),
    accent,
    accentSoft: accent,
    accentMuted: hex(h, 23, 91),
    accentGlow: "transparent",
    gold: secondary,
    goldMuted: hex((h + 145) % 360, 23, 93),
    tealAccent: secondary,
  };
}
