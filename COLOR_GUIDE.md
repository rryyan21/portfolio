# Theme and color guide

The portfolio is light-first: warm paper, near-black text, forest-green primary accents, and a clay secondary accent. It uses one “Chapters” metaphor throughout. There is no dark-mode toggle or glowing background.

## Default palette

Defaults live in `:root` in `src/app/globals.css`.

| Variable             | Default       | Purpose                                   |
| -------------------- | ------------- | ----------------------------------------- |
| `--page-bg`          | `#faf7f2`     | Page paper                                |
| `--surface`          | `#fffdf9`     | Cards and panels                          |
| `--surface-elevated` | `#f1ece4`     | Tags and inset surfaces                   |
| `--ink`              | `#242820`     | Headings and body text                    |
| `--muted`            | `#66685f`     | Secondary text                            |
| `--border`           | `#deded3`     | Dividers and subtle card outlines         |
| `--accent`           | `#426342`     | Buttons, active chapters, links           |
| `--accent-soft`      | `#426342`     | Compatible alias for readable accent text |
| `--accent-muted`     | `#e8eddf`     | Contact panel and selected backgrounds    |
| `--gold`             | `#895133`     | Secondary/clay accent                     |
| `--gold-muted`       | `#f3e7dc`     | Coffee icon backgrounds                             |
| `--teal-accent`      | `#895133`     | Compatible secondary-accent alias         |
| `--accent-glow`      | `transparent` | Legacy token retained without a glow      |

Tailwind’s `@theme inline` maps these tokens to utilities such as `text-ink`, `text-accent`, and `bg-surface`. Most shared layouts also use named CSS classes in `globals.css`. Change tokens instead of searching for obsolete `teal-*` classes.

## Spotify palette

`src/lib/paletteFromImage.ts` decodes JPEG/PNG artwork and samples a 48×48 image. It keeps the saturated-midtone seed heuristic, then derives:

- Light backgrounds at 97–99% HSL lightness, with restrained saturation.
- Near-black ink and a muted readable text color.
- A darker album-derived accent that supports white button text.
- A hue-shifted secondary accent and pale tints.

Accent and muted text derivation targets at least 4.5:1 contrast against the page and tinted surfaces. `npm test` verifies all text-role combinations across 24 hue samples, plus white-on-accent buttons. This is a color-level check, not a substitute for a rendered accessibility review.

`SpotifyThemeProvider` supplies listening data through React context while the tab is visible. `MusicSection` applies album-derived CSS variables only to its listening activity card, falling back to the default palette on failure. The page, navigation, contact panel, and other sections retain the stable paper and forest-green palette. The contact panel uses a pale green surface with green social labels and arrows.

To change dynamic colors, edit palette derivation in `paletteFromImage.ts`. If adding a new dynamic token, update `spotifyThemeTypes.ts` and the theme API mapping together. For a static-only preview, leave Spotify environment variables unset.

## Typography, layout, and motion

- Display: locally hosted Space Grotesk.
- Body: locally hosted Inter.
- Technical accents: system monospace.
- Maximum content width: 1180px; 20px mobile gutters.
- Cards: 16–24px radii, thin borders, minimal shadows.
- Sticky navigation: warm translucent paper with backdrop blur.
- Motion: transform and opacity only. Reveals progressively enhance visible HTML; `prefers-reduced-motion` disables transitions and smooth scrolling.

Font files and their licenses are in `src/app/fonts/`. Portrait, project media, and Snoopy art retain their own original colors.

See `README.md` for Spotify OAuth, environment variables, caching, and deployment instructions.
