# Working notes for agents

Findings that are not obvious from the manifests. Keep this file short.

## Running the app

- `docker compose -f docker-compose.base44.yml up -d --build`, then
  `curl http://localhost:3000/` — host port **3000** is the web entry point.
- The container runs `npm run dev` (Vite) from the bind-mounted source. There is
  no build step in the sandbox, so code edits are picked up by the dev server.
- Dependencies install into the `node_modules` **named volume** from
  `package-lock.json` on startup. After changing `package.json`, re-run the
  `up` command (the compose command re-installs when `package.json`/lock is newer
  than the installed tree). Do not delete the volume to force a refresh.
- Healthcheck probes the dev server over HTTP via `node -e fetch(...)`.
- The repo contains **no application secrets**; nothing is required to boot.

## Sandbox-only behaviour

- `vite.config.js` gates its `server.allowedHosts` extension and file-watch
  polling on `BASE44_PREVIEW_MODE === '1'`; with the variable unset Vite keeps its
  stock defaults. Sandbox host/origin variables are passed to the container by
  compose (`BASE44_SANDBOX_HOST_DOMAIN`, `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`).
- Never hardcode a resolved `BASE44_*` value anywhere.

## Where things live

- Content and listings: `src/data/properties.js`, `src/data/site.js`.
- `src/services/propertyService.js` is the **only** module that reads the
  catalogue. Filtering/sorting (`searchProperties`) and the inquiry handoff
  (`submitInquiry`) live there — that is the seam for a real API or database.
- Forms currently validate client-side and resolve locally; there is no email
  provider wired. `submitInquiry` is the single place to add one.
- Saved properties persist in `localStorage` (`horizon.saved-properties`) via
  `src/context/FavoritesContext.jsx`.
- Every route starts with a dark hero band, which is what lets the fixed header
  be transparent at the top of the page. A new page without one needs its own
  top padding.

## Verifying a change

- Routes: `/`, `/properties`, `/properties/:slug`, `/about`, `/services`,
  `/team`, `/contact`, `/favorites`, plus any unknown path (404 page).
- Property detail slug example: `/properties/lakeside-modern-villa`.
- Check for console errors, no horizontal overflow at 320/768/1024/1440, and that
  the fixed mobile CTA bar on a property page does not cover the footer.
