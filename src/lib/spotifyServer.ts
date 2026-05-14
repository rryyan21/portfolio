const SPOTIFY_ACCOUNTS = "https://accounts.spotify.com";
const SPOTIFY_API = "https://api.spotify.com/v1";

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
};

export async function refreshSpotifyAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyTokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(`${SPOTIFY_ACCOUNTS}/api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token refresh failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<SpotifyTokenResponse>;
}

export async function exchangeSpotifyCode(
  code: string,
  redirectUri: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyTokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(`${SPOTIFY_ACCOUNTS}/api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify code exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<SpotifyTokenResponse>;
}

export type RecentTrackMeta = {
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  /** Present for recently-played rows: when Spotify last reported this play (ISO 8601). */
  playedAt?: string;
};

type SpotifyImage = { url: string; height: number | null; width: number | null };

type RecentlyPlayedItem = {
  played_at?: string;
  track?: {
    name?: string;
    artists?: { name?: string }[];
    album?: { name?: string; images?: SpotifyImage[] };
  };
};

type RecentlyPlayedResponse = {
  items?: RecentlyPlayedItem[];
};

function pickAlbumImageUrl(images: SpotifyImage[] | undefined): string | null {
  if (!images?.length) return null;
  const sorted = [...images].sort(
    (a, b) => (a.width ?? 0) - (b.width ?? 0)
  );
  return sorted[0]?.url ?? images[0]?.url ?? null;
}

export async function fetchRecentlyPlayedTrack(
  accessToken: string
): Promise<RecentTrackMeta | null> {
  const url = new URL(`${SPOTIFY_API}/me/player/recently-played`);
  url.searchParams.set("limit", "50");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify recently-played failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as RecentlyPlayedResponse;
  const rows = (data.items ?? []).filter((row) => row.track?.name);

  if (!rows.length) return null;

  rows.sort((a, b) => {
    const ta = a.played_at ? Date.parse(a.played_at) : 0;
    const tb = b.played_at ? Date.parse(b.played_at) : 0;
    return tb - ta;
  });

  const item = rows[0];
  const track = item.track;
  if (!track?.name) return null;

  const artist =
    track.artists?.map((a) => a.name).filter(Boolean).join(", ") ?? "";
  const album = track.album?.name ?? "";
  const albumImageUrl = pickAlbumImageUrl(track.album?.images);

  return {
    name: track.name,
    artist,
    album,
    albumImageUrl,
    playedAt: item.played_at,
  };
}

export async function fetchCurrentlyPlayingTrack(
  accessToken: string
): Promise<RecentTrackMeta | null> {
  const res = await fetch(`${SPOTIFY_API}/me/player/currently-playing`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify currently-playing failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    item?: {
      name?: string;
      artists?: { name?: string }[];
      album?: { name?: string; images?: SpotifyImage[] };
    };
  };

  const track = data.item;
  if (!track?.name) return null;

  const artist =
    track.artists?.map((a) => a.name).filter(Boolean).join(", ") ?? "";
  const album = track.album?.name ?? "";
  const albumImageUrl = pickAlbumImageUrl(track.album?.images);

  return {
    name: track.name,
    artist,
    album,
    albumImageUrl,
  };
}
