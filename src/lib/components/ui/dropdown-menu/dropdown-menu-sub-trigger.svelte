<script lang="ts">
  import { cn } from '$lib/utils.js'
  import { DropdownMenu as DropdownMenuPrimitive, type WithoutChild } from 'bits-ui'
  import ChevronRight from 'svelte-radix/ChevronRight.svelte'

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: WithoutChild<DropdownMenuPrimitive.SubTriggerProps> & {
    inset?: boolean
  } = $props()
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  class={cn(
    `
      flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none
      [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 data-[highlighted]:bg-accent
      data-[state=open]:bg-accent
    `,
    inset && 'pl-8',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRight class="ml-auto" />
</DropdownMenuPrimitive.SubTrigger>
