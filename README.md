# AxxonTek — Company Website

Marketing site for **AxxonTek**, a technology company based at Norrsken Kigali, Rwanda.

Built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.
Light theme by default with orange as the brand accent; visitors can switch to dark mode.

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
├── layout.tsx              # Root shell: fonts, metadata, theme bootstrap, nav, footer
├── page.tsx                # Homepage
├── globals.css             # Light + dark tokens, base styles, utilities (Tailwind v4)
├── about|blog|careers/     # Content pages
├── contact/                # Contact page (accepts ?email= prefill from the hero)
├── privacy|terms/          # Legal pages
├── services/[slug]/        # Six service pages, generated from lib/site.ts
├── api/contact/route.ts    # Validated contact submissions -> Supabase
├── api/newsletter/route.ts # Validated newsletter signups -> Supabase
├── sitemap.ts, robots.ts   # Generated from route data — cannot drift
└── not-found.tsx           # 404

components/
├── layout/                 # Nav, Footer, Logo, ThemeToggle, PageTransition, ScrollProgress
├── sections/               # Hero, Stats, ServicesGrid, ProcessBand, FeatureGrid, Faq,
│                           # ContactSection, CtaBanner, PageHero, Statement, LegalBody
├── motion/                 # Reveal, MaskedWords, MagneticButton
├── forms/                  # ContactForm, NewsletterForm
└── Icon.tsx                # Line-icon set

lib/
├── site.ts                 # All copy + navigation data — services, process, FAQ, trust points
├── motion.ts               # Shared easings and variants
├── validation.ts           # Form validation shared by the API routes
└── supabase.ts             # Server-side Supabase client
```

**To edit content**, change [`lib/site.ts`](lib/site.ts). Service pages, nav, footer links, and the
sitemap all read from it.

---

## Homepage narrative

The homepage is ordered for conversion. Each section answers the question the previous one raises,
and the ask ("Book a call") is never more than one screen away:

| Section | Job | Leaves the reader asking |
| --- | --- | --- |
| Hero | What we sell, for whom, one primary CTA, three trust points | "What exactly?" |
| Stats strip | Honest snapshot (founded, team size, projects, reply time) | "Are you real?" |
| Services | The catalogue — six cards, one line each, all linking to their page | "How do you work?" |
| Process band | Research first, built by the people who scoped it (orange break + CTA) | "Why you?" |
| Why AxxonTek | Three concrete reasons | "Any catches?" |
| FAQ | The objections a buyer has before contacting us | "How do I start?" |
| Contact | The form, embedded — no extra page load | — |

Rules this order follows:

- **One service taxonomy.** `services` in `lib/site.ts` is the only list of what we sell. Nav,
  hero chips, the grid, the footer, and the sitemap all read from it.
- **The primary CTA is always "Book a call".** It appears in the nav, the hero, the process band
  and the contact section. Nothing else competes with it.
- **Numbers are static.** The stats strip is plain text so search engines and no-JS visitors see
  the real values, not a count-up starting at zero.
- **Copy is honest.** The company is young; the page says so and sells the process instead of
  inventing social proof. Replace the "Why us" cards with a named case study as soon as one exists.

### Theme

Light is the default. `[data-theme="dark"]` on `<html>` flips every token; the choice is stored in
`localStorage` under `axxontek-theme` and applied by an inline script in `app/layout.tsx` before
first paint, so there is no flash. The system preference is deliberately not consulted.

Every colour in the codebase is a semantic token (`bg-ink`, `text-bone`, `text-mute`,
`border-hairline`, `bg-ember`, `bg-ember-tint`, …) defined once per theme in `app/globals.css`.
Components never hard-code light or dark values, so adding a surface means adding a token, not
touching components.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `ink` | warm white | near black | Page ground |
| `ink-raised` | white | raised charcoal | Cards, inputs |
| `surface-1` / `band` | warm sand | warm charcoal | Alternating sections |
| `bone` / `mute` / `faint` | ink → grey | bone → grey | Text hierarchy |
| `ember` / `ember-deep` / `ember-tint` | orange | orange (brighter) | Brand accent, buttons, icon wells |
| `band-ember` | solid orange gradient | deep ember | The one high-contrast break per page |

---

## Motion architecture

- **Framer Motion** handles entrance reveals, masked headlines, page transitions, the FAQ accordion,
  and pointer interactions (magnetic buttons).
- Native scrolling. The previous Lenis/GSAP smooth-scroll and Three.js particle fields were removed:
  they cost ~200kB of JavaScript and several seconds of first paint on mobile data for no
  conversion benefit.
- The root `MotionConfig reducedMotion="user"` neutralises transform animations for visitors who
  prefer reduced motion. Components must **not** branch their markup on `useReducedMotion` — it is
  `false` during SSR, so doing that causes a hydration mismatch.

### Performance rules the code follows

- **Nothing contentful waits on JavaScript.** The page-transition curtain runs only on client-side
  navigations, never the first load. Covering server-rendered HTML and starting content at
  `opacity: 0` pushed First Contentful Paint from ~0.35s to ~2.4s.
- Source images are pre-optimised (WebP, sensibly sized).
- Components that render the same image at two breakpoints share one `sizes` value, so the browser
  downloads one derivative instead of two.
- Every decorative animation is **disabled under `prefers-reduced-motion`**, in both CSS and JS.

---

## Accessibility

- Skip-to-content link, visible focus rings, and a real keyboard-operable mobile menu
  (`aria-expanded`, Escape to close, scroll lock).
- The theme toggle is a labelled `<button>`; the FAQ is a proper disclosure pattern
  (`aria-expanded`, `aria-controls`, `role="region"`).
- Masked headline animations keep real spaces and text in the DOM, so the copy stays selectable and
  readable by assistive tech.
- Form fields have visible, persistent labels, `aria-invalid`, `aria-describedby`, and live regions
  for status messages.

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
