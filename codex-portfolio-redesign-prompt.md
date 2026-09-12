# Codex Prompt: Redesign & Fix My Portfolio

Copy-paste this entire prompt into Codex while working in my portfolio repo.

---

You are working in my personal portfolio repository. Redesign it visually and fix everything broken in it. Work autonomously and make reasonable judgment calls where I leave room: do not ask clarifying questions unless you are truly blocked.

## 1. Repo context

- **Stack:** Next.js 15.5 (App Router) + React 19 + TypeScript (strict mode) + Tailwind CSS 4 + Lucide React icons. Framer Motion is installed but currently unused.
- **Structure:** `src/app/` (pages, layouts, API routes), `src/components/` (page sections), `src/data/` (portfolio content as typed objects/arrays), `src/lib/` (Spotify requests, theme extraction, color utils), `public/assets/images/` (headshot, project images, demo videos ~14MB total, resume PDF, 404 artwork).
- **No database, no CMS, no contact backend.** Content lives in TypeScript data files: keep it that way.
- **Spotify integration (keep it):** `/api/spotify/login`, `/api/spotify/callback`, `/api/spotify/theme` + a React provider. It is an owner-account integration: the server's refresh token supplies my listening activity, and the theme endpoint derives a color palette from the current/recent track's album artwork, applied as CSS variables site-wide. Do not remove this: adapt it (see section 6).
- **Current personality:** a game-menu concept: visitors pick "chapters," browse a "missions archive," contact via "comms." Home chapter labels: Story, Soundtrack, Kitchen, Missions, Comms. Evolve this personality; do not sterilize it.

## 2. What to preserve

- All real content: 6 projects + 1 work-in-progress entry, 5 story/experience entries (early robotics, music/piano, Michigan + MRacing autonomy stack, Waterloo Alternate Fuels Team MPC work, Youphoria/ProofIt product work), music picks, cooking stories, contact details.
- The Spotify theming system and its OAuth flow.
- The playful game-menu identity.

## 3. Research-backed design requirements

These come from research on standout student SWE portfolios and hiring-manager expectations. Treat them as requirements:

- **Layout:** single-page scrolling experience with sticky anchor nav: Hero → About → Skills → Experience → Projects → Contact. Keep `/projects/[id]` detail pages for deep dives.
- **Hero:** name, one-line identity including **"Open to Summer 2027 software engineering internships,"** portrait, CTAs (View work, Download resume), GitHub/LinkedIn/email links.
- **Projects are the centerpiece:** 3 "Selected Work" cards (image or GIF, tech tags, live demo + GitHub links). Detail pages follow: problem → my role → constraints → decisions → result, plus a "what I learned" blurb per project.
- **Skills:** grouped by category (Languages / Frameworks / Tools / Hardware). **No proficiency bars, ever.**
- **Experience:** clean timeline.
- **Typography:** one display font + one body font + monospace accents for technical identity.
- **Motion:** purposeful and subtle: fade/slide reveals on scroll (use Framer Motion or IntersectionObserver), hover micro-interactions. Animate transform/opacity only. No heavy 3D/WebGL hero unless it is genuinely excellent: restraint beats ambition.
- **Mobile-first**, single column on narrow screens. Target Lighthouse 95+.
- **Do NOT clone brittanychiang.com's visual skin.** Borrow structural ideas only: everyone copies it and recruiters notice.
- Guiding principle: hiring managers say a bad portfolio hurts more than no portfolio. Every shipped pixel must look intentional. Cut ruthlessly: no tutorial clones, no generic bios, no fake testimonials, no freelance "hire me" framing, no dead contact form.

## 4. Visual direction: light, clean, smooth, unique

- **Light-first palette:** warm paper background (e.g. `#FAF7F2`-ish), near-black ink text, one confident primary accent + one secondary accent, subtle borders and soft shadows instead of heavy glows. Dark mode is optional: only add it as a proper toggle, not an afterthought.
- **Smooth scrolling:** `scroll-behavior: smooth`, anchor nav with active-section highlighting, sticky nav with backdrop blur. Scrolling should feel clean and calm.
- **Whitespace and rhythm:** generous spacing, consistent rhythm, large rounded cards (`rounded-2xl`/`3xl`), restrained borders.
- **Unique to me:** implement a distinctive tab/switcher concept. Direction (you may refine it): either a "Modes" segmented control: e.g. **Engineer / Soundtrack / Kitchen**: that swaps the featured content rail and re-tints accents, or keep the game-menu **"Chapters"** concept as the primary nav metaphor. Pick ONE coherent metaphor and commit fully; do not do both halfway.
- **SWE-career orientation first:** everything must read as "serious SWE candidate with personality." Recruiting content leads; hobbies support.

## 5. Easter eggs (pick 2–3, tasteful, never intrusive)

Choose 2–3 from these (or equivalents you invent), keeping them invisible to anyone not looking and never breaking accessibility:

- Konami code → retro pixel mode or a secret theme.
- A hidden `/arcade` or `/debug` page reachable from the 404 page or footer.
- Typing a command into a fake terminal hidden in the footer.
- Clicking the headshot N times → a fun animation or message.
- A secret theme unlocked by a specific Spotify track playing.
- Keep the Snoopy 404 artwork but restyle the page to match the new light theme.

## 6. Spotify integration: keep, fix, lighten

- Keep the OAuth flow and `/api/spotify/*` routes working.
- **Adapt palette extraction** (`src/lib/paletteFromImage.ts`) to emit **light-theme** CSS variables: light backgrounds/surfaces, dark readable text, album-derived accent color(s). Keep the saturated-midtone seed heuristic; change the derivation targets from dark to light.
- **Fix the copy:** the music page claims polling runs only there, but polling is site-wide. Either scope it honestly or fix the copy.
- **Performance:** stop refreshing the access token, re-downloading artwork, and recomputing the palette on every 90-second poll. Cache the token server-side and skip re-extraction when the track hasn't changed.
- **Failure modes:** never show developer troubleshooting text to visitors; fail silently back to the default theme.
- The "Live" badge must respect Spotify's `is_playing` field (currently it just checks whether a track object was returned).

## 7. Functional fixes: all of these must be resolved

1. **Contact form fakes success.** Either wire it to a real sender (e.g. a `/api/contact` route via Resend or Formspree) or replace it with direct contact links. Never show a success message for a message that wasn't sent. Make email/phone real `mailto:`/`tel:` links.
2. **Every "Live demo" link 404s** (the demo route unconditionally calls `notFound()`). Only render demo buttons that resolve; delete the demo-route trap or implement real demos.
3. **Compli, ProofIt, and Multiplayer Grapple Game reference a missing `Project4Demo.mp4`** yet render video players anyway. Only render the video player when the asset actually exists.
4. **W.A.I.L.A. and AI Tic Tac Toe use internal demo routes as their `github` URLs**: "View code" 404s. Fix to real repo URLs or remove the buttons.
5. **Cooking page shows dev setup instructions to visitors** with an empty photo wall. Replace with a graceful state: no file paths or "edit this file" text visible to visitors.
6. **Music playlist embed URL is `null`**: hide the embed section entirely until configured.
7. **Add a visible resume-download link** using the existing resume PDF. Decide on `mainImg.jpg`: use it or delete it.
8. **`/games` permanently redirects to `/cooking`.** Either build a real games section (it fits: two game projects exist) or remove the route/redirect cleanly.
9. Remove the dead `questStatus`/`tone` fields or actually use them. Move the hardcoded skill lists out of the component into the data file.
10. Use Framer Motion for the scroll/motion work, or remove the dependency.
11. **Fix deployment:** the `gh-pages` deploy script doesn't match a server-rendered app with API routes. Settle on Vercel (recommended): update `package.json` scripts and docs accordingly.
12. **Update `README.md` and `COLOR_GUIDE.md`** to describe the actual stack, theme, and Spotify setup, including required env vars.

## 8. Content & editorial cleanup

- Rewrite placeholder-ish copy (e.g. Tic Tac Toe's "PythonAnywhere (or similar)"). Verify or soften specific performance/adoption claims the repo can't substantiate.
- About section: 2–3 concrete sentences. No generic "passionate developer" filler.
- Lead with the most impressive, most complete projects.

## 9. Performance & accessibility

- Compress the ~14MB of demo videos, lazy-load media, use `next/image` everywhere, eliminate layout shift.
- Real `<label>`s on form inputs (no placeholder-only inputs), `aria-pressed`/`aria-selected` on filter buttons and tabs, verify color contrast on the light theme, keep `prefers-reduced-motion` support, keyboard-operable tabs and menus.

## 10. Constraints

- TypeScript strict passes, ESLint passes, production build succeeds.
- No new backend, database, CMS, or paid services. Content stays in the TS data files.
- Don't break existing public route URLs (or add redirects where you change them).
- Work autonomously; make reasonable calls where I've left room.

## 11. When you're done

Run the TypeScript check, lint, and a production build: fix all errors. Then summarize: what changed visually, what was fixed, what you cut, and anything you intentionally left for me (env vars to set, assets to add).

---
