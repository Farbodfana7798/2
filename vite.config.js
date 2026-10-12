import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Host allowlist for the Base44 sandbox preview.
 *
 * The preview reaches this dev server through a proxy, so the Host header the
 * server receives is `<port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN`, and the
 * sandbox id changes whenever the environment is recreated — hence the
 * wildcard over the sandbox domain rather than an exact host.
 *
 * This only applies when the platform signals preview mode
 * (BASE44_PREVIEW_MODE === '1'). With the variable unset, Vite keeps its own
 * default behaviour, so a normal `npm run dev` is unchanged.
 */
function previewAllowedHosts() {
  if (process.env.BASE44_PREVIEW_MODE !== '1') return undefined

  const hosts = []
  // Platform-provided list (Vite >= 6.1 also reads this itself).
  const extra = process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS
  if (extra) hosts.push(...extra.split(',').map((h) => h.trim()).filter(Boolean))

  const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
  if (sandboxDomain) hosts.push(`.${sandboxDomain}`)

  return hosts.length ? hosts : undefined
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: previewAllowedHosts(),
    // Bind mounts do not always deliver inotify events; polling keeps HMR
    // reliable inside the sandbox (preview mode only).
    watch: process.env.BASE44_PREVIEW_MODE === '1' ? { usePolling: true } : undefined,
  },
})
