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
| `npm run dev`       | Dev server with hot reload                |
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

## Motion architecture

- **Lenis** provides inertial scrolling, wired into GSAP's ticker so **ScrollTrigger** stays in sync.
- **GSAP ScrollTrigger** drives the scroll-spy and the pinned split-scroll sections.
- **Framer Motion** handles entrance reveals, masked headlines, page transitions, and pointer
  interactions (magnetic buttons, spotlight cards).
- **React Three Fiber** renders the particle fields.

### Performance rules the code follows

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

## Deployment

Deploy as a standard Next.js app (Vercel, or any Node host):

```bash
npm run build
npm start
```

Set the environment variables above in your host's dashboard. Update `NEXT_PUBLIC_SITE_URL` to the
production domain so canonical URLs, `sitemap.xml`, and `robots.txt` resolve correctly.

---

## Note on the legal pages

`privacy.html` and `terms.html` previously had no policy text. The new `/privacy` and `/terms` pages
contain real content that describes what this site actually does (contact form + newsletter stored in
Supabase, no tracking or advertising cookies). **Have a qualified lawyer review both before launch** —
they are accurate to the codebase, not a substitute for legal advice.

---

## License

Proprietary. All rights reserved by AxxonTek.
