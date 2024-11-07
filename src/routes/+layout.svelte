<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner'
  import { ModeWatcher } from 'mode-watcher'

  import '../app.css'

  const { children } = $props()
</script>

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
