<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  const { children } = $props()
</script>

<ModeWatcher />

<main class="container">
  {@render children()}
</main>

<style>
  :global(html) {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }
</style>
