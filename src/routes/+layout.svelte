<script lang="ts">
  import '../app.css'

  const { children } = $props()
</script>

<main class="container">
  {@render children()}
</main>

<style>
  :global(html) {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }
</style>
