<script lang="ts">
  import { page } from '$app/stores'
  import { Toaster } from '$lib/components/ui/sonner'
  import { baseLocale, i18nObject, loadedLocales, locales } from '$lib/i18n/i18n-util'
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  document.querySelector('html')!.setAttribute('lang', baseLocale)

  const { children } = $props()
</script>

<svelte:head>
  <meta name="description" content={loadedLocales[baseLocale].og.description} />
  <meta name="theme-color" content="#6e4d9c" />
  <link
    rel="canonical"
    href={`https://helderbarboza.github.io/minitodo/${$page.url.pathname}`}
  />

  <meta property="og:type" content="website">
  <meta property="og:title" content="minitodo">
  <meta property="og:url" content="https://helderbarboza.github.io/minitodo/">
  <meta property="og:image" content="https://helderbarboza.github.io/minitodo/cover.png">
  {#each locales as locale}
    {@const LL = i18nObject(locale)}
    {@const currentLocale = locale.replace('-', '_')}
    {LL.og.description}
    <meta
      property="og:description{baseLocale === locale ? '' : `:${currentLocale}`}"
      content={loadedLocales[locale].og.description}
    />
    <meta
      property="og:locale{baseLocale === locale ? '' : ':alternate'}"
      content={currentLocale}
    />
  {/each}
</svelte:head>

<ModeWatcher />
<Toaster />

<main>
  {@render children()}
</main>

<style>
  :global(*) {
    user-select: none;
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--accent)) hsl(var(--background));
  }

  :global(html) {
    scrollbar-gutter: stable;
  }
</style>
