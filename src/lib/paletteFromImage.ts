import jpeg from "jpeg-js";
import { PNG } from "pngjs";
import {
  contrastRatio,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/lib/colors";

const WHITE: [number, number, number] = [248, 250, 252];
const OUT = 48;

function decodeBufferToRgba(
  buffer: Buffer
): { data: Uint8Array; width: number; height: number } {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const raw = jpeg.decode(buffer, {
      useTArray: true,
      maxMemoryUsageInMB: 64,
    });
    return {
      width: raw.width,
      height: raw.height,
      data: new Uint8Array(raw.data.buffer, raw.data.byteOffset, raw.data.length),
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
    "Album art must be JPEG or PNG for theme extraction (Spotify sometimes serves WebP; try another image size or track)."
  );
}

/** Nearest-sample downscale to OUT x OUT RGBA */
function downsampleRgba48(
  src: Uint8Array,
  sw: number,
  sh: number
): Uint8Array {
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

/** Pick saturated mid-tone pixel cluster as seed; clamp for white-on-accent contrast */
export async function extractThemeFromImageBuffer(
  buffer: Buffer
): Promise<{
  accent: string;
  accentSoft: string;
  accentMuted: string;
  accentGlow: string;
  gold: string;
  goldMuted: string;
  tealAccent: string;
  pageBg: string;
  surface: string;
  surfaceElevated: string;
}> {
  const { width, height, data: rgba } = decodeBufferToRgba(buffer);
  const data = downsampleRgba48(rgba, width, height);
  const ch = 4;

  let bestScore = -1;
  let seed = { r: 255, g: 61, b: 92 };

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;
    const { s, l } = rgbToHsl(r, g, b);
    if (s < 12 || l < 6 || l > 96) continue;
    const score = s * Math.min(l, 100 - l);
    if (score > bestScore) {
      bestScore = score;
      seed = { r, g, b };
    }
  }

  const seedHsl = rgbToHsl(seed.r, seed.g, seed.b);
  const h = seedHsl.h;
  let s = seedHsl.s;
  let l = seedHsl.l;
  s = Math.min(92, Math.max(45, s + 8));
  l = Math.min(56, Math.max(38, l));

  let rgb = hslToRgb(h, s, l);
  let guard = 0;
  while (contrastRatio(WHITE, [rgb.r, rgb.g, rgb.b]) < 4.5 && guard++ < 28) {
    l = Math.max(18, l - 3);
    rgb = hslToRgb(h, s, l);
  }

  const accent = rgbToHex(rgb.r, rgb.g, rgb.b);
  const soft = hslToRgb(h, Math.max(35, s - 12), Math.min(80, l + 16));
  const accentSoft = rgbToHex(soft.r, soft.g, soft.b);

  const goldRgb = hslToRgb((h + 42) % 360, Math.min(92, s + 6), Math.min(72, l + 14));
  const gold = rgbToHex(goldRgb.r, goldRgb.g, goldRgb.b);

  const tealRgb = hslToRgb((h + 198) % 360, Math.min(78, s), Math.min(68, l + 8));
  const tealAccent = rgbToHex(tealRgb.r, tealRgb.g, tealRgb.b);

  const accentMuted = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.24)`;
  const accentGlow = `rgba(${Math.min(255, Math.round(rgb.r * 1.1))}, ${Math.min(255, Math.round(rgb.g * 1.05))}, ${Math.min(255, Math.round(rgb.b * 1.08))}, 0.55)`;

  const goldMuted = `rgba(${goldRgb.r}, ${goldRgb.g}, ${goldRgb.b}, 0.22)`;

  const bgSat = Math.min(24, Math.max(9, seedHsl.s * 0.32 + (seedHsl.s < 14 ? 8 : 0)));
  let pageL = 9.2;
  let pageRgb = hslToRgb(h, bgSat, pageL);
  let bgGuard = 0;
  while (
    contrastRatio(WHITE, [pageRgb.r, pageRgb.g, pageRgb.b]) < 6.5 &&
    pageL > 5.2 &&
    bgGuard++ < 28
  ) {
    pageL -= 0.35;
    pageRgb = hslToRgb(h, bgSat, pageL);
  }

  const pageBg = rgbToHex(pageRgb.r, pageRgb.g, pageRgb.b);
  const surfRgb = hslToRgb(h, Math.max(7, bgSat * 0.88), Math.min(14, pageL + 3.6));
  const elevatedRgb = hslToRgb(
    h,
    Math.max(8, bgSat * 0.9),
    Math.min(18, pageL + 7.2)
  );
  const surface = rgbToHex(surfRgb.r, surfRgb.g, surfRgb.b);
  const surfaceElevated = rgbToHex(
    elevatedRgb.r,
    elevatedRgb.g,
    elevatedRgb.b
  );

  return {
    accent,
    accentSoft,
    accentMuted,
    accentGlow,
    gold,
    goldMuted,
    tealAccent,
    pageBg,
    surface,
    surfaceElevated,
  };
}
