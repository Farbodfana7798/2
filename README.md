# Horizon Properties

A premium real estate website for **Horizon Properties** — architectural homes and
property investments. Built as a production-quality React application: reusable
components, a single design system, real routing, working filters, saved
properties and responsive layouts from 320px up.

## Stack

- **React 18** + **Vite 5** (single-page app, no SSR)
- **React Router 6** for client-side routing
- Plain CSS with custom properties (`src/styles/`) — no UI framework, no CSS-in-JS
- No runtime data dependencies: the catalogue is served by a small service module

## Getting started

### Sandbox / preview (docker compose)

```bash
docker compose -f docker-compose.base44.yml up -d --build
# web entry point: http://localhost:3000
```

The app runs from the cloned source: the repo is bind-mounted into the container
and Vite serves it in dev mode, so edits appear without rebuilding an image.
Dependencies install from `package-lock.json` into a named volume on first start
(re-run the `up` command after changing `package.json` and the install repeats).

### Without docker

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production bundle in dist/
```

## Project structure

```
src/
  components/    reusable UI: Header, Footer, PropertyCard, PropertyCarousel,
                 Gallery, InquiryForm, SearchFilters, Button, Icon, SaveButton…
  sections/      homepage sections: Hero, AboutPreview, FeaturedProperties,
                 ServicesPreview, WhyChoose, TeamPreview
  pages/         routed pages (Home, Properties, PropertyDetail, About, Services,
                 Team, Contact, Favorites, NotFound)
  data/          content: properties.js (catalogue), site.js (brand, team, services)
  services/      propertyService.js — the only module that reads the catalogue
  context/       FavoritesContext — saved properties, persisted in localStorage
  lib/           formatting and image helpers
  styles/        tokens → base → components → sections
```

### Routes

| Route | Page |
| --- | --- |
| `/` | Homepage (hero, who we are, featured, services, why Horizon, team, CTA) |
| `/properties` | Portfolio with search, filters, sorting (state mirrored in the URL) |
| `/properties/:slug` | Property detail: gallery, lightbox, amenities, agent, viewing form, similar properties |
| `/about`, `/services`, `/team`, `/contact` | Content pages |
| `/favorites` | Shortlisted properties |

## Content and data

All copy and listings live in `src/data/`. Components never read the data files
directly — they go through `src/services/propertyService.js`, which is the single
place to change when the catalogue moves to a database or an HTTP API
(`searchProperties`, `getPropertyBySlug`, `getSimilarProperties`, `submitInquiry`
already return plain data / promises, so no component needs to change).

Property photography is referenced by Unsplash photo id in `src/data/properties.js`
and turned into CDN URLs (with `srcset` for responsive sizes) by `src/lib/images.js`.

### Forms

The inquiry forms (contact agent, schedule a viewing, contact page, newsletter)
validate on the client and hand the payload to `submitInquiry` in
`propertyService.js`. **No email or CRM provider is configured yet** — the call
resolves locally. Wire the provider inside that one function (e.g. `POST /api/inquiries`)
and every form starts delivering without UI changes.

Saved properties are stored in `localStorage` under `horizon.saved-properties`.

## Design system

`src/styles/tokens.css` holds every colour, type step, radius, shadow and motion
value; `base.css` is the reset and typography layer; `components.css` and
`sections.css` build on those tokens only. Change a token and the whole site
follows.

- Deep navy `#0f172a` for structure and headers
- Warm champagne `#c5a059` for labels, icons, focus and selected states
- Off-white / ivory surfaces with generous whitespace
- Plus Jakarta Sans (display) + Inter (body)

## Accessibility & performance

- Semantic landmarks, skip link, visible focus states, ARIA on carousel,
  gallery, menus and form errors; keyboard support for the carousel and lightbox
- Motion respects `prefers-reduced-motion`
- Below-the-fold images are lazy-loaded with `srcset`/`sizes` and fixed aspect
  ratios so nothing shifts while loading
- No animation or icon libraries — only React and React Router ship to the browser

## Sandbox notes

The docker setup is preview-oriented, and the only sandbox-specific behaviour is
in `vite.config.js`:

- When `BASE44_PREVIEW_MODE=1` the dev server extends Vite's `allowedHosts` with
  the sandbox host domain (passed in as `BASE44_SANDBOX_HOST_DOMAIN`) so the
  proxied preview origin can reach the dev server, and file watching switches to
  polling for reliable hot reload over the bind mount.
- With the variable unset (or any other value) Vite keeps its stock defaults, so
  a normal `npm run dev` is unchanged.
- No secrets are required to run the site; `.base44/environment.json` records an
  empty secrets list.
