# AxxonTek website

This is the website for AxxonTek, a technology company in Kigali. We build software, cloud
infrastructure and smart systems for businesses, schools and clinics across Africa, and we run two
products of our own, Floow and TalentLens. The site is how people find out all that, see what we
could build for them, and get in touch.

It's a Next.js 15 app (App Router) with TypeScript and Tailwind CSS v4. Smooth scrolling comes from
Lenis and the motion from GSAP. There's no database of our own to look after: the contact and
newsletter forms save to Supabase, and that's the only backend.

## Running it

You'll need Node 20 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Starts the dev server with hot reload          |
| `npm run build`     | Makes a production build                       |
| `npm start`         | Serves that production build                   |
| `npm run typecheck` | Runs TypeScript without producing any output   |
| `npm run lint`      | Runs the Next.js linter                        |
| `npm test`          | Runs the tests (Vitest)                        |
| `npm run photos`    | Shrinks photos in `public/assets/photos` to web-sized WebP |

## Setting up the forms

The contact and newsletter forms write to Supabase, so they need a few settings first. Copy
`.env.example` to `.env.local` and fill it in:

```
NEXT_PUBLIC_SITE_URL=https://axxontek.com
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Then paste [`supabase-schema.sql`](supabase-schema.sql) into your Supabase project's SQL editor and
run it once. That creates the `contact_submissions` and `newsletter_subscribers` tables.

If you skip all this, nothing breaks. The site still runs, and the forms tell the visitor they aren't
connected yet instead of pretending the message went through.

One thing to be careful with: `SUPABASE_SERVICE_ROLE_KEY` is a secret. It's only ever read inside the
API routes in `app/api`, never in the browser, so don't give it a `NEXT_PUBLIC_` prefix.

## Where things live

```
app/
  page.tsx                 the homepage
  layout.tsx               fonts, metadata, nav, footer, and the page-wide ground colour
  globals.css              design tokens, type scale and shared utilities
  products/, work/         one page per item, generated from the data files
  studio/                  the Inspiration pages (the URL is still /studio)
  solutions/, capabilities/, pricing/, about/, lab/, security/, contact/
  privacy/, terms/         the legal pages
  api/contact, api/newsletter   validated form submissions, saved to Supabase
  sitemap.ts, robots.ts    built from the same route data, so they can't drift

components/
  sections/                the big blocks pages are made of (Hero, OurProducts, AboutGoal, ...)
  studio/                  concept cards and the gallery
  layout/                  Nav, Footer, Logo
  forms/                   the two forms
  system/                  Page.tsx (the shared page building blocks), dust and dot effects, loader, reveal

lib/
  site.ts                  most of the copy and navigation lives here
  work.ts                  the list of projects on /work
  validation.ts            form checks shared with the API routes (has tests)
  supabase.ts              the server-side Supabase client
  motion.ts                the shared Lenis and GSAP hooks
```

**Changing the words on the site** usually means editing [`lib/site.ts`](lib/site.ts). The six
offerings on the homepage (`offerings`), the problem cards (`situations`), the Inspiration concepts
(`studioConcepts`), the nav and the footer links all come from there. Projects on `/work` are in
[`lib/work.ts`](lib/work.ts).

## The homepage

It runs in five parts, then the footer:

1. **Hero.** The one-line pitch and a way to start a project.
2. **Products.** The six things we build: web, mobile, cloud and hosting, SaaS, UX and UI design,
   and smart homes. On desktop, hovering a row swaps the photo beside it.
3. **About.** Who we are, what we're aiming for, and three promises about how we work.
4. **Inspiration.** Concept designs for real industries, for people who don't yet know what they want.
   Every one is labelled a concept, because none of them are client work.
5. **Solutions.** Six problems people actually have, and how we'd solve them.

### Writing for it

The copy follows a few habits, and it's worth keeping them when you add more:

- Talk to the reader, not about ourselves. "Your customers use it without a second thought" beats
  "we build user-friendly software".
- Keep it plain. Section headings are simple labels ("Our products", "Our solutions"), and each card
  gets a name and one short sentence. Nobody should have to read much to get it.
- Don't invent proof. If we don't have a number or a client we can name, we don't write one.
- No em dashes and no italics anywhere on the site.

## How it looks

The design is modelled on Apple's product pages: black background, white text, one typeface, big
calm headlines and lots of space.

- **Font.** Inter, using its optical-size setting, so large text gets the finer display cut and small
  text the sturdier one. Apple's own font isn't licensed for the web, and this is the closest match.
  Headlines are semibold, body text regular.
- **Colour.** Pure black ground, `#f5f5f7` text and `#86868b` for secondary text. Orange is the only
  accent. Colours are tokens in `app/globals.css`, so components don't hard-code them.
- **Layout.** Content is 87.5% of the screen wide (1260px at most), with 144px above and below each
  section. Some sections sit on a slightly lifted `#1d1d1f` instead of pure black (`section-alt`).
- **Type utilities.** `text-display`, `text-chapter`, `text-lede` and `label` are the sizes to reach
  for. In a `text-lede` paragraph, wrap the phrase that matters in `text-tone` and it turns white
  against the gray.
- **Cards** have 28px corners and a 20px gap. Keep them flat: no glows or gradients on hover.
- **Inner pages** are built from `components/system/Page.tsx`: `PageHero` opens every page (small
  heading, big headline, two-tone intro, button and text link, centred), then sections alternate
  black and `#1d1d1f` using `Section`, with `StoryHead`, `RowHead`, `Tile`, `TextLink` and a
  closing `CloseAsk`. New pages should use these rather than one-off markup.
- **Tagline.** "Think Beyond Tomorrow" lives in `site.tagline`. It opens the home hero, is the
  About headline, labels the Lab, sits in the footer copyright line and the loader, and is part of
  the logo artwork. Use `site.tagline` rather than retyping it.
- **Logo and icons.** The logo is the supplied lockup (mark, name and the tagline "Think Beyond
  Tomorrow"), white on transparent, at `public/assets/logo.png`. Use the `Logo` component and never
  retype it. The favicon and touch icons are made from the mark on black (`public/favicon.ico` and
  the `icon`, `favicon` and `apple-touch-icon` files in `public/assets`). The originals are in
  `assets/`.

The light theme is switched off for now. `components/system/Ground.tsx` holds the whole site on the
dark ground. The old chapter-by-chapter light and dark switching is still in git history if you want
it back.

## Motion

Lenis smooths the scroll and GSAP's ScrollTrigger runs the scroll-linked effects. Both are set up in
`lib/motion.ts` and mounted once by `components/system/SmoothScroll.tsx`.

Everything animated starts out visible and only hides itself once JavaScript is running, so a
visitor without JavaScript still gets the whole page. Anyone who has asked their device for reduced
motion gets no smooth scroll, no parallax and no entrances.

## Particles

Two canvas effects, modelled on rho.co, live in `components/system`:

- `DustField` fills its parent with tiny drifting specks. Given `shapes`, when a mouse cursor comes
  to rest over empty space, the dust gathers into a random shape right there and stays put. Resting
  somewhere new forms a different shape there, and leaving dissolves it. Resting on text or a link
  never forms one. Without shapes it swirls round the cursor the way rho's does. `dim` and `speed`
  quieten it.
- `DotMark` redraws any image as a grid of dots that part round the cursor and spring back. With
  `color="image"` each dot keeps the image's own colour.

Both are used in the footer only (`components/layout/FooterParticles.tsx`): dust behind everything,
and the logo in dots at the very bottom (`public/assets/logo-dots.png`, the logo without its
tagline).

The robot, code and UI/UX shapes are baked dot grids in `public/assets/shapes`, one pixel per dot,
next to the icons they were made from. They are baked rather than sampled in the browser so every
visitor sees exactly the version that was checked. To change one, edit its icon and re-bake the
`-grid.png`, keeping it under about 800 dots. The globe is generated live as a tilted sphere wrapped
in rows of binary, so it can turn.

On phones the footer dust is deliberately quiet: about a third as many specks, half as bright, half
as fast, and no shapes, so it never competes with the text.

Everything pauses when off screen and stays still for visitors who ask for reduced motion.

## Adding photos

Drop a photo into `public/assets/`. Big originals are wasteful, so for anything in
`public/assets/photos` run `npm run photos` and it makes a web-sized WebP next to it. The homepage
images are in `public/assets/home` and `public/assets/inspiration`.

## Deploying

We host on Netlify. [`netlify.toml`](netlify.toml) sets up the build, the Next.js plugin (which turns
pages and API routes into Netlify Functions), security and cache headers, and redirects from the old
`.html` URLs. Because that file exists, it overrides the build settings in the Netlify dashboard. If a
deploy acts strangely, check that **Base directory** is empty in *Site configuration, Build and
deploy*, since that's the one setting the file can't control.

Set the same three variables from the setup section above in *Site configuration, Environment
variables*.

To try the real Netlify build on your own machine:

```bash
npx netlify-cli build
```

The app is an ordinary Next.js server app, so `npm run build && npm start` works on Vercel or any
Node host too, without the Netlify plugin.

A loose end: `netlify.toml` still redirects `/blog.html` and `/careers.html`, but those pages no
longer exist. Take those two redirects out or bring the pages back.

## When something's off

**"Port 3000 is in use, using 3002 instead."** An old dev server is still running. It's serving a
stale build and will throw errors for files that no longer exist, so kill it rather than moving to
the new port:

```bash
npx kill-port 3000
```

On Windows you can find the process with `netstat -ano | findstr :3000` and stop it with
`taskkill /F /PID <pid>`.

**The first page load is slow in dev.** That's normal. Turbopack compiles each route the first time
you visit it, and every load after that is quick.

## About the legal pages

The privacy and terms pages describe what this site actually does: it stores what people send through
the two forms, and it doesn't use tracking or advertising cookies. They're accurate to the code, but
they aren't legal advice, so please have a lawyer read them before launch.

## Licence

Proprietary. All rights reserved by AxxonTek.
