<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  const { children } = $props()
</script>

<ModeWatcher />

<main class="select-none">
  {@render children()}
</main>

<style>
  :global(*) {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--accent)) hsl(var(--background));
  }
</style>
