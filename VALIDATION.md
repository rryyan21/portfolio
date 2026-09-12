# Portfolio verification

Verified locally on September 12, 2026 against a production Next.js build.

## Required checks

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: passed. Covers content/assets, palette contrast, caching, playback state, and the theme endpoint using mocked Spotify responses.
- `npm run build`: passed; homepage and eight project case studies are prerendered. Spotify API routes remain dynamic.
- `git diff --check`: passed.

## Original redesign browser checks

Chrome/Playwright checks exercised project filters, existing video visibility, missing-video suppression, legacy redirects, the custom 404, portrait interaction, the lights-out puzzle, mobile menu dismissal, and active chapter navigation.

Axe WCAG A/AA checks reported zero violations on the homepage, archive, music, cooking, games, arcade, six case-study pages, and coming-soon page. Layout checks covered 320, 375, 390, 768, 1024, and 1440-pixel widths. Mocked browser responses also verified live/recent/failure Spotify transitions, theme application and reset, and contrast with a changed accent. Automated checks do not replace a complete manual accessibility audit.

## Original redesign mobile Lighthouse

| Category       | Score |
| -------------- | ----- |
| Performance    | 96    |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 100   |

The measured run had 0.8s first contentful paint, 2.6s largest contentful paint, 70ms total blocking time, and zero cumulative layout shift. These are local production-build results using Lighthouse’s mobile profile, with Spotify disabled. Hosting, network conditions, and live Spotify responses can change deployed results.

The three MP4 recordings total 4,772,875 bytes, down from 11,403,964 bytes (about 58% smaller). Playback remains opt-in with `preload="none"`.

## External setup

No site was deployed and no real Spotify OAuth authorization was performed during verification. Existing local credentials were not edited. Configure production Spotify variables and the exact callback URL using the README. Missing public demos, additional recordings, cooking photos, and a playlist remain optional; unavailable controls are hidden rather than linked to placeholders. Review first-person case-study wording before publishing.

## Resume and project refresh

Updated the site from the supplied Ryan_Gupta_Resume.pdf and the local FinSearch and ResumeTailor repositories. FinSearch and ResumeTailor lead selected work, followed by Compli; the archive contains eight projects and one work-in-progress entry. The timeline now covers Visa, MARC, Formula SAE, and UWAFT. The supplied PDF replaces the old download without changing its public URL.

TypeScript, lint, catalog/core tests, and the production build pass after the refresh. The text scan reports no em dashes in authored source or documentation, and the supplied PDF contains none in its extracted text. Downloaded and supplied resume files have matching SHA-256 hashes. The Lighthouse scores above are from the original redesign, not a new measurement of the content refresh.

Browser checks also passed for the refreshed homepage, archive, and both new case studies, with zero automated WCAG A/AA violations. Featured project order, timeline entries, resume/email destinations, and layouts at 320, 390, 768, and 1440 pixels were verified.

## Project-led editorial revision

The homepage now follows Start, Projects, About, Journey, and Contact. The skills grid, coursework list, and resume-style experience bullets were removed from the homepage. Featured project summaries use plain language, and case-study tool lists are expandable. TypeScript, lint, core tests, and the production build pass after this revision. Earlier Lighthouse measurements remain historical.
