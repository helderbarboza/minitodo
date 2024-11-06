import type { LayoutLoad } from './$types'
import { setLocale } from '$lib/i18n/i18n-svelte'
import { detectLocale } from '$lib/i18n/i18n-util'
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async'

export const ssr = false
export const csr = true

export const load = (async (event) => {
  const locale = detectLocale()
  await loadLocaleAsync(locale)
  setLocale(locale)

  return event.data
}) satisfies LayoutLoad
