import type { LayoutLoad } from './$types'
import { locale, setLocale } from '$lib/i18n/i18n-svelte'
import { detectLocale } from '$lib/i18n/i18n-util'
import { loadAllLocales } from '$lib/i18n/i18n-util.sync'

export const ssr = false
export const csr = true
export const prerender = true
export const trailingSlash = 'always'

const langParam = 'lang'

export const load = (async (event) => {
  loadAllLocales()
  const newLocale = detectLocale(() => [localStorage.getItem(langParam) ?? navigator.language])
  locale.subscribe((value) => {
    localStorage.setItem(langParam, value)
  })
  setLocale(newLocale)
  return event.data
}) satisfies LayoutLoad
