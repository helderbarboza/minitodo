<script lang="ts">
  import { cn } from '$lib/utils.js'
  import { Switch as SwitchPrimitive, type WithoutChildrenOrChild } from 'bits-ui'

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props()
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  class={cn(
    `
      peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2
      border-transparent shadow-sm transition-colors data-[state=checked]:bg-primary
      data-[state=unchecked]:bg-input disabled:cursor-not-allowed disabled:opacity-50
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 focus-visible:ring-offset-background
    `,
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    class={cn(
      `
        pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0
        transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0
      `,
    )}
  />
</SwitchPrimitive.Root>
