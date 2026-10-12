# Ryan Gupta: portfolio

A light, chapter-based portfolio built with Next.js 15.5, React 19, TypeScript (strict), Tailwind CSS 4, and Lucide icons. The homepage scrolls through Start → Projects → About → Journey → Contact. The site uses warm paper and forest-green accents. Spotify album artwork colors only the listening activity card in the music section.

## Run locally

Use Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Spotify is optional; without configuration the site keeps its default theme and curated music picks.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

After changing route files, `npx next typegen` refreshes generated route types if TypeScript reports stale `.next/types` references. `npm run dev:clean` clears development caches. The `dev:turbo` variants are also available.

## Content and routes

| File                     | Edit here                                             |
| ------------------------ | ----------------------------------------------------- |
| `src/data/hero.ts`       | Introduction, internship availability, about text     |
| `src/data/navigation.ts` | Chapter anchors, contact links, resume path           |
| `src/data/story.ts`      | Short journey entries                                 |
| `src/data/projects.ts`   | Projects, featured selection, links, case studies     |
| `src/data/music.ts`      | On-repeat track, albums, optional public playlist URL |
| `src/data/cafes.ts`      | Café orders, visit notes, and three personal ratings  |
| `src/app/globals.css`    | Visual system and default theme                       |
| `src/app/fonts/`         | Self-hosted Inter and Space Grotesk, with licenses    |

The homepage is the recruiting path. Selected work features FinSearch, ResumeTailor, and Compli. The journey highlights Visa, MARC, Formula SAE, and UWAFT in short, plain-language stories. The downloadable resume holds the detailed background; the homepage leads with projects and has no skills grid or coursework list. ResumeTailor credits its Resuméer upstream on the case-study page. `/projects` contains the full archive and `/projects/[id]` contains case studies. `/music` and `/cafes` are supporting chapters; `/cooking` redirects to `/cafes`. `/games` opens the archive filtered to games. `/story` and `/contact` redirect to their homepage anchors. Old `/projects/[id]/demo` URLs redirect to the corresponding case study. Unknown project IDs return the custom 404.

Keep project URLs empty until a real public destination is available. Only external HTTPS demo URLs and GitHub repository URLs are shown as action buttons. Recorded walkthroughs are separate from live demos; their files are verified at build/render time and loaded only on demand. The three available recordings are compressed H.264/AAC MP4s with fast-start metadata. The resume PDF is linked from the hero and navigation.

There is no contact form, database, CMS, or paid service. Contact links open email/phone apps or the relevant profile. Photo and playlist sections remain hidden or show finished editorial content until configured.

## Spotify setup

This is an owner-account integration: all visitors see the listening activity of the account whose refresh token is configured on the server. Visitors do not sign into Spotify.

1. Create an app in the [Spotify developer dashboard](https://developer.spotify.com/dashboard).
2. Register `http://127.0.0.1:3000/api/spotify/callback` as a local redirect URI. For production, register `https://YOUR-DOMAIN/api/spotify/callback` as well.
3. Copy `.env.example` to `.env.local` and set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI`.
4. Start the site, then visit `http://127.0.0.1:3000/api/spotify/login`. Use the same hostname throughout the flow so the state cookie is available to the callback.
5. Authorize your account. Copy the displayed refresh token into `SPOTIFY_REFRESH_TOKEN` and restart the development server. On Vercel, update the environment variable and redeploy.

Required server-only variables:

```dotenv
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
SPOTIFY_REFRESH_TOKEN=
```

Never prefix these with `NEXT_PUBLIC_` or commit `.env.local`. `.env.example` is intentionally tracked. OAuth uses an HTTP-only, SameSite state cookie; callback responses containing the token are not cached.

### Runtime behavior

- The root provider requests `/api/spotify/theme` on arrival and about every 90 seconds while the tab is visible. Returning to the tab refreshes the data.
- Current playback is only labeled live when Spotify reports `is_playing: true`. Otherwise the newest recently played track is used.
- Server access tokens are cached until one minute before expiry. Payloads are cached for 30 seconds; artwork palettes are cached by image URL for 24 hours, with a bounded 24-entry cache. Concurrent identical requests share one operation.
- These caches are per Node.js process. Serverless cold starts or separate instances have separate caches; no persistent service is required.
- Artwork is decoded on the server as JPEG/PNG and sampled for a saturated midtone. A light, contrast-checked palette is returned to the browser. Unsupported artwork keeps track metadata but falls back to the default theme.
- Missing configuration, API errors, and timeouts do not show developer diagnostics to visitors. The account’s current/recent track metadata is intentionally public through this endpoint.

## Deployment: Vercel

Import this Git repository into Vercel and select its Next.js framework preset. Use the repository root, the default `npm run build` command, and Next.js’s default output settings. Configure the Spotify environment variables if desired, register the exact production callback in Spotify, then deploy.

The app requires a Node.js runtime for Spotify routes and image optimization. GitHub Pages/static export is not the deployment target. No `gh-pages` or manual `build`-directory publishing scripts are used.

Fonts are local, so builds do not require a Google Fonts request. Uploaded project assets remain under `public/assets/images/`.

## Verification and small details

`npm test` covers project asset/link integrity, case-study completeness, light-theme contrast across 24 hue samples, cache coalescing/expiry/eviction, playback status, history ordering, and theme endpoint fallbacks. Tests mock Spotify and do not use real credentials.

Motion uses a small IntersectionObserver enhancement with opacity/transform reveals; reduced-motion preferences disable movement. Navigation, filters, and the side-quest puzzle work with a keyboard. Content is visible without JavaScript before optional reveals initialize.

Two quiet side quests: press the portrait five times, or follow the footer asterisk/404 detour to `/arcade` for a lights-out puzzle. No tracking or scores are stored.

Before publishing, review the rewritten first-person case studies for exact ownership and wording. No unverified uptime, adoption, or win-rate metrics are presented. Add real demo URLs, missing walkthroughs, café notes, or a playlist only when ready.

## Café guide

Edit `src/data/cafes.ts` to add your order, short visit description, and coffee/study/overall scores from 1 to 5 in half-point increments. Leave unknown values as `null`; the UI shows them as unrated. Sorting puts higher scores first, keeps ties in the original list order with a shared rank, and places unrated cafés last. These are the owner’s ratings, not visitor votes. No browser storage or backend is needed. Café names and website links were checked against the official sites linked on each card; personal opinions are supplied only by Ryan.
