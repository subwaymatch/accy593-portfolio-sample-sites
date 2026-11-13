# ACCY 593 Portfolio Sample Sites

Ten sample portfolio websites, each in a different visual style, for the
ACCY 593 "Portfolio Website with a Coding Agent" project. Every sample meets the
assignment's requirements: an About page or section with contact details, at
least ten work items (at least three on analytics, design or a business topic),
and a layout that works on desktop and mobile.

The people in the samples are fictional, and every image was generated with
OpenAI GPT Image 2.6 (quality: low).

## Stack

- [Vinext](https://github.com/cloudflare/vinext): the Next.js App Router API on Vite
- One Cloudflare Worker serves the hub page and all ten sites
- React 19, TypeScript, CSS Modules and Tailwind CSS

## Project layout

```
app/
  page.tsx              hub page listing the ten samples
  <site-slug>/          one folder per sample site (layout, pages, CSS)
public/<site-slug>/     images for that site
scripts/gen_image.py    image generation (GPT Image 2.6, quality: low)
scripts/check_site.mjs  desktop/phone screenshots + overflow checks
docs/SITE_GUIDE.md      rules each sample site follows
```

## Run locally

```bash
npm install
```

```bash
npm run dev
```

## Deploy to Cloudflare Workers

This project is configured for the Cloudflare CLI (`cf`) through
`cloudflare.config.ts`, not through a Wrangler config file. Plain
`npx wrangler deploy` does not work with it.

### From your machine

```bash
npm run deploy
```

`npm run deploy` runs `vinext-cloudflare deploy`, which builds the app and
deploys it. It needs a Cloudflare login (`npx cf login`) or the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables.

### With Workers Builds (Git integration)

Workers Builds defaults to `npx wrangler deploy`, which fails here with
"It looks like you've run `wrangler deploy` in a project that builds for the
Cloudflare CLI". In the Worker's **Settings → Build**, set:

| Setting | Value |
|---|---|
| Build command | *(leave empty)* |
| Deploy command | `npm run deploy` |
| Non-production branch deploy command | `npx vinext-cloudflare previews deploy` |

- The deploy command already builds the app, so the build command stays empty.
- The Worker connected to the repository must be named
  `accy593-portfolio-sample-sites`, the `name` in `cloudflare.config.ts`.
- `.node-version` pins Node 22.23.4, because `cf` needs Node 22.23+ or 24.22+
  and the build image's default Node is older.
