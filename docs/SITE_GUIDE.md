# Building a sample site (guide for contributors and coding agents)

This repository is **one Vinext app** (Next.js App Router API on Vite) that deploys
to **Cloudflare Workers** as a single Worker. The hub page at `/` links to ten
sample portfolio sites, each in its own folder and visual style.

## The assignment each sample must satisfy (ACCY 593 portfolio project)

1. **About page or section**: who the person is, what they study, what they are
   interested in, and how an employer can reach them (professional email and/or
   LinkedIn). A photo is optional.
2. **At least ten work items**. At least three are about data or business
   analytics, design, or a business topic (marketing, finance, branding,
   information systems, technology). Blog-style posts count. The rest can be
   anything the person made: photos, music, apps, hobby or Arduino projects,
   knitting, crafts, and so on. Each item has a **title**, a **short description
   of what it is and what the person did**, and **shows the work** (an image, a
   link, an embedded player, a working interactive demo, or the text of a post).
3. **Works on desktop and mobile**: text readable without zooming, nothing cut off,
   no sideways scrolling, and navigation that works on a small screen.
4. **A presentable design improved over several rounds** (not a one-shot result).

## Rules for a site

- A site owns only these paths; never edit anything else:
  - `app/<slug>/**` (its routes, layout, components and CSS)
  - `public/<slug>/**` (its images)
- Do not edit `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, config files,
  `package.json`, or another site's folder. Do not add npm dependencies.
- The site's look lives in `app/<slug>/layout.tsx`. It wraps the site in one
  root element with its own class (`min-height: 100vh`, its own background, text
  colour and font). Styles go in CSS Modules (`*.module.css`) inside the site
  folder; Tailwind utility classes are also available. Never write unscoped
  global selectors (`body`, `h1`, `*`) because every site shares one document.
- Fonts: `next/font/google` works. Load fonts in the site's own `layout.tsx` and
  apply them through a CSS variable or class on the site root.
- Images: plain `<img>` tags with `width`, `height`, meaningful `alt`, and
  `loading="lazy"` below the fold. Files live in `public/<slug>/`, so the
  `src` is `/<slug>/file.webp`.
- Interactive pieces are client components (`"use client"`). Pages stay server
  components where possible.
- Multi-page sites use routes such as `app/<slug>/about/page.tsx` and
  `app/<slug>/work/[item]/page.tsx`. Dynamic routes must export
  `generateStaticParams()` and call `notFound()` (from `next/navigation`) for
  unknown slugs.
- Every page sets `metadata` (title and description).
- Include a small, unobtrusive link back to the hub (`/`), e.g. in the footer:
  "← All sample sites".
- People are fictional. Use an `@example.com` email address and link LinkedIn
  to `https://www.linkedin.com/` (no made-up profile URLs). No home address or
  phone number. Do not invent external URLs: link only to real, relevant pages
  or to pages inside the site.
- Keep secrets out of the repository. The image script reads `OPENAI_API_KEY`
  from the environment.

## Generating images

All images are generated with OpenAI GPT Image 2.6 at `quality: low`:

```bash
python3 scripts/gen_image.py public/<slug>/hero.webp "prompt..." --size 1536x1024
python3 scripts/gen_image.py public/<slug>/logo.png "prompt..." --transparent --model gpt-image-2.6-flare
```

- Models: `gpt-image-2.6-sunburst` (default) or `gpt-image-2.6-flare`.
- Sizes: `1024x1024`, `1536x1024` (landscape) or `1024x1536` (portrait).
- Output is resized to at most 1200 px wide and recompressed (prefer `.webp`).
- Each call takes about 20 to 40 seconds; run up to four in parallel with `&` and `wait`.
- Give every image a style direction that matches the site so they look like one set.

## Checking a site

```bash
npx vite dev --port <port> --strictPort        # in the background
node scripts/check_site.mjs http://localhost:<port> <screenshot-dir> /<slug> /<slug>/about ...
npm run build                                   # must succeed before you finish
```

`check_site.mjs` takes full-page screenshots at 1440 px and 390 px widths and
reports HTTP errors, horizontal overflow, broken images and console errors.
Look at the screenshots, decide what to improve, change it, and check again.
