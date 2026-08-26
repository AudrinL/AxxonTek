# AxxonTek — Company Website

Marketing site for **AxxonTek**, a technology company based at Norrsken Kigali, Rwanda.

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v4**, **Framer Motion**,
**GSAP + ScrollTrigger**, **Lenis**, and **Three.js** via React Three Fiber.

---

## Quick start

```bash
npm install
npm run dev
```

The site runs at <http://localhost:3000>.

| Script              | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Dev server (Turbopack) with hot reload     |
| `npm run build`     | Production build                          |
| `npm start`         | Serve the production build                |
| `npm run typecheck` | TypeScript check, no emit                 |
| `npm run lint`      | Next.js lint                              |

---

## Environment

The contact and newsletter forms write to Supabase. Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SITE_URL=https://axxontek.com
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Then run [`supabase-schema.sql`](supabase-schema.sql) once in your Supabase project's SQL editor to
create the `contact_submissions` and `newsletter_subscribers` tables.

**Without these variables the forms still work** — they return a clear "not connected yet" message
and a `503`. They never report a false success.

> `SUPABASE_SERVICE_ROLE_KEY` is a server-only secret. It is read exclusively inside route handlers
> (`app/api/*`) and is never exposed to the browser. Do not prefix it with `NEXT_PUBLIC_`.

---

## Project structure

```
app/
├── layout.tsx              # Root shell: fonts, metadata, nav, footer, scroll behaviour
├── page.tsx                # Homepage
├── globals.css             # Design tokens + base styles (Tailwind v4 @theme)
├── about|blog|careers/     # Content pages
├── contact/                # Contact page (accepts ?email= prefill from the hero)
├── privacy|terms/          # Legal pages
├── services/[slug]/        # Six service pages, generated from lib/site.ts
├── api/contact/route.ts    # Validated contact submissions -> Supabase
├── api/newsletter/route.ts # Validated newsletter signups -> Supabase
├── sitemap.ts, robots.ts   # Generated from route data — cannot drift
└── not-found.tsx           # 404

components/
├── layout/                 # Nav, Footer, SmoothScroll, PageTransition, ScrollProgress
├── sections/               # Hero, Expertise, Capabilities, FeatureGrid, CtaBanner, ...
├── motion/                 # Reveal, MaskedWords, MagneticButton
├── forms/                  # ContactForm, NewsletterForm
├── three/                  # ParticleField (+ lazy wrapper)
└── Icon.tsx                # Line-icon set

lib/
├── site.ts                 # All copy + navigation data — edit content here
├── motion.ts               # Shared easings and variants
├── validation.ts           # Form validation shared by the API routes
└── supabase.ts             # Server-side Supabase client
```

**To edit content**, change [`lib/site.ts`](lib/site.ts). Service pages, nav, footer links, and the
sitemap all read from it.

---

## Layout & conversion structure

Sections alternate across a three-step surface ladder so the page has vertical rhythm instead of
reading as one continuous black scroll:

| Token | Use |
| --- | --- |
| `--color-surface-0` (`#030303`) | Default page ground |
| `--color-surface-1` (`#0a0a0c`) | `band` utility — raised sections (Stats, Services grid) |
| `--color-surface-2` (`#101014`) | Cards sitting on a band |
| `band-ember` | The one high-contrast break per page |

The homepage places a conversion point roughly every two screens — announcement bar, hero email
capture, services grid, ember band, closing banner — rather than a single CTA at the end.

## Motion architecture

- **Lenis** provides inertial scrolling, wired into GSAP's ticker so **ScrollTrigger** stays in sync.
- **GSAP ScrollTrigger** drives the scroll-spy and the pinned split-scroll sections.
- **Framer Motion** handles entrance reveals, masked headlines, page transitions, and pointer
  interactions (magnetic buttons, spotlight cards).
- **React Three Fiber** renders the particle fields.

### Performance rules the code follows

- **Nothing contentful waits on JavaScript.** The page-transition curtain runs only on client-side
  navigations, never the first load. Covering server-rendered HTML and starting content at
  `opacity: 0` pushed First Contentful Paint from ~0.35s to ~2.4s.
- Source images are pre-optimised (WebP, sensibly sized). `public/assets` is ~1.4MB total; it was
  9.8MB, including a 6.1MB PNG screenshot.
- Components that render the same image at two breakpoints share one `sizes` value, so the browser
  downloads one derivative instead of two.

- The particle field does all per-particle work — wave displacement, pointer falloff, ring
  formation, glow — **in a GLSL shader on the GPU**, not in a JS loop.
- Three.js is **lazy-loaded** (`components/three/LazyParticleField.tsx`), so it is not in the
  initial bundle.
- Canvases **suspend their frameloop** when scrolled offscreen or when the tab is hidden.
- Frame deltas are clamped so a backgrounded tab cannot jump the animation forward.
- Every decorative animation is **disabled under `prefers-reduced-motion`**, in both CSS and JS.

---

## Accessibility

- Skip-to-content link, visible focus rings, and a real keyboard-operable mobile menu
  (`aria-expanded`, Escape to close, scroll lock).
- The scroll-spy entries are `<button>`s — the section is usable without scrolling.
- Masked headline animations keep real spaces and text in the DOM, so the copy stays selectable and
  readable by assistive tech.
- Form fields have persistent labels, `aria-invalid`, `aria-describedby`, and live regions for
  status messages.

---

## Deployment (Netlify)

[`netlify.toml`](netlify.toml) configures the build. It must exist — this site is a compiled
Next.js app, not static HTML, so Netlify cannot serve the repo root directly.

It sets:

- `command = "npm run build"` and `publish = ".next"`
- `@netlify/plugin-nextjs` — turns SSR pages, `/api/*` routes, and `next/image` into Netlify
  Functions. Without it the build output is unservable.
- `NODE_VERSION = "20"`
- Cache headers for immutable assets, security headers, and 301s from the old `*.html` URLs.

Because `netlify.toml` exists, it **overrides the build settings in the Netlify UI**. If a deploy
still misbehaves, check *Site configuration → Build & deploy* and make sure **Base directory is
empty**; that one setting is not controlled by this file.

### Required environment variables

Set these in *Site configuration → Environment variables*:

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain, e.g. `https://axxontek.com`. Drives canonical URLs, `sitemap.xml`, `robots.txt`. |
| `SUPABASE_URL` | Server-side only. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only. Never prefix with `NEXT_PUBLIC_`. |

Without the two Supabase values the site deploys and renders fine, but the contact and newsletter
forms return a clear "not connected yet" message instead of saving anything.

### Forms no longer use Netlify Forms

The old static site collected the newsletter through Netlify Forms (`data-netlify="true"`). That is
gone — submissions now POST to `/api/contact` and `/api/newsletter` and are stored in Supabase, which
is what `supabase-schema.sql` was written for. If the Netlify Forms dashboard still lists an old
`newsletter` form, it will not receive anything further.

### Verifying a deploy locally

```bash
npx netlify-cli build
```

This runs the real Netlify pipeline, including the Next.js Runtime plugin and function bundling.

### Other hosts

The app is a standard Next.js server app (`npm run build && npm start`) and runs on Vercel or any
Node host without the Netlify plugin.

---

## Troubleshooting

**"Port 3000 is in use, using 3002 instead"** — an earlier dev server is still running. Whatever is
on 3000 is serving a stale build and will throw 500s and 404s for chunks that no longer exist. Kill
it rather than using the new port:

```bash
npx kill-port 3000
```

On Windows, find and kill it directly:

```bash
netstat -ano | findstr :3000
```

Then `taskkill /F /PID <pid>`. Orphaned servers are the most common cause of "the local site is
broken but the code looks fine".

**First page compile takes ~14s** — expected. Turbopack compiles each route on first request in dev;
subsequent loads are under a second, and production TTFB is 10-90ms.

---

## Note on the legal pages

`privacy.html` and `terms.html` previously had no policy text. The new `/privacy` and `/terms` pages
contain real content that describes what this site actually does (contact form + newsletter stored in
Supabase, no tracking or advertising cookies). **Have a qualified lawyer review both before launch** —
they are accurate to the codebase, not a substitute for legal advice.

---

## License

Proprietary. All rights reserved by AxxonTek.
