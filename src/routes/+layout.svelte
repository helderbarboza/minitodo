<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  const { children } = $props()
</script>

<ModeWatcher />

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
