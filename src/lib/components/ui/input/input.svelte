<script lang="ts">
  import type { WithElementRef } from 'bits-ui'
  import type { HTMLInputAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: WithElementRef<HTMLInputAttributes> = $props()
</script>

<input
  bind:this={ref}
  class={cn(
    `
      flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm
      transition-colors disabled:cursor-not-allowed disabled:opacity-50 file:border-0
      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
      focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground
    `,
    className,
  )}
  bind:value
  {...restProps}
/>
