<script context="module">
  import type { Writable } from 'svelte/store'
  import { writable } from 'svelte/store'

  const localStorageKey = 'tasks'

  interface Task {
    id: symbol
    name: string
    isDone: boolean
    isArchived: boolean
  }

  const exampleTasks: Task[] = [
    'Call corporate about my amazing "Somehow I Manage" book idea',
    'Plan next team building exercise (maybe laser tag?)',
    'Figure out why Toby still works here',
    'Buy new "World\'s Best Boss" mug (Dwight broke my other one)',
    'Schedule next Dundies awards ceremony',
    'Practice new character voices for meetings',
    'Ask Jan about expanding the client base to include local comedy clubs',
    'Find out what a "rundown" is',
    'Tell "That\'s what she said" joke (minimum 3x)',
    'Check on Dwight\'s weird farm stories',
    'Avoid doing actual paperwork',
    'Make sure Jim is pranking Dwight (good for office morale)',
    'Visit accounting to bother Oscar with movie quotes',
    'Learn to make better toast',
    'Perfect my impression of a wise Italian mobster',
    'Convince warehouse to do another improv session',
    'Find new ways to make meetings more fun',
    'Think of better nickname for Kevin',
    'Pay rent on condo',
    'Call Mom',
    'Buy more hair gel',
    'Schedule dentist appointment (maybe)',
    'Watch new cop movie for more character inspiration',
  ].map(name => ({ name, id: Symbol(name), isArchived: Math.random() < 0.2, isDone: Math.random() < 0.2 }))

  const tasks = writable<Task[]>((() => {
    const storedTasks = localStorage.getItem('tasks')

    return storedTasks
      ? (JSON.parse(storedTasks) as Task[])
        .map(task => ({ ...task, id: Symbol(task.name) }))
      : exampleTasks
  })())

  tasks.subscribe(v => localStorage.setItem(localStorageKey, JSON.stringify(v)))
</script>

<script lang="ts">
  import { Badge } from '$lib/components/ui/badge'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import { Label } from '$lib/components/ui/label'
  import { Switch } from '$lib/components/ui/switch'
  import { cn } from '$lib/utils'
  import Icon from '@iconify/svelte'
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'
  import { toggleMode } from 'mode-watcher'
  import { flip } from 'svelte/animate'
  import { quadIn, quadInOut } from 'svelte/easing'
  import { crossfade, draw, fade, fly } from 'svelte/transition'

  let pendingAndUnarchivedCount: number
  let hiddenDoneCount: number

  $: {
    pendingAndUnarchivedCount = $tasks.filter(task => !task.isDone && !task.isArchived).length
    hiddenDoneCount = $tasks.filter(task => !task.isArchived && task.isDone).length
  }

  let newInputEl: HTMLInputElement

  const nextId: Writable<symbol> = writable(Symbol(0))
  nextId.subscribe(() => newInputEl && newInputEl.focus())

  const animationDuration = 250
  let showDone: boolean = false
  const [send, receive] = crossfade({
    duration: animationDuration,
    fallback: (node, _params, intro) => {
      if (!showDone) {
        return intro ? fly(node, { duration: animationDuration, y: '-1rem', opacity: 0 }) : fade(node, { duration: animationDuration })
      }

      return intro ? fly(node, { duration: animationDuration, y: '-1rem', opacity: 0 }) : fly(node, { duration: animationDuration, y: '1rem', opacity: 0 })
    },
  })

  function toggleIsDoneTask(id: Task['id']) {
    $tasks = $tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task,
    )
  }

  function toggleIsArchivedTask(id: Task['id']) {
    $tasks = $tasks.map(task =>
      task.id === id ? { ...task, isArchived: !task.isArchived } : task,
    )
  }

  let archivedSectionOpen = false
  let newFormEl: HTMLFormElement

  function createTask() {
    const formattedDescription = newInputEl.value.trim()
    newInputEl.value = ''

    if (formattedDescription.length) {
      tasks.update(v => ([{ name: formattedDescription, id: $nextId, isDone: false, isArchived: false }, ...v]))
      $nextId = Symbol(0)
    }
  }

  function deleteTask(id: Task['id']) {
    $tasks = $tasks.filter(v => v.id !== id)
  }

  function handleArrowNavigation(e: KeyboardEvent) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault()
      const direction = e.code === 'ArrowDown' ? 1 : -1
      const taskElems = Array.from<HTMLDivElement>(document.querySelectorAll('[data-nav]:not(.pointer-events-none)'))
      const currentIndex = taskElems.filter(el => el.tabIndex === 0 && el.checkVisibility()).findIndex(el => el === e.target)

      if (currentIndex >= 0) {
        const targetIndex = Math.min(taskElems.length - 1, Math.max(currentIndex + direction, 0))
        taskElems[targetIndex].focus()
      }
    }
  }

  let scrollY: number
  const scrollThreshold = 96

  const emptyStates = [
    'Your list is clear, enjoy your day!',
    'Nothing here! Time to relax or plan something new.',
    'Congratulations! You\'ve checked everything off!',
    'No tasks? Looks like it\'s break time!',
    'Todo list: conquered. What\'s next on your agenda?',
    'Empty list, full possibilities. What will you add?',
    'All tasks completed! Feel the freedom.',
    'A blank slate! Ready for your next big idea.',
    'You\'ve done it all - a moment of peace.',
    'List is empty, life is full. What\'s your next adventure?',
  ]

</script>

<svelte:head>
  <title>todo{pendingAndUnarchivedCount ? ` (${pendingAndUnarchivedCount})` : ''}</title>
</svelte:head>

<!-- eslint-disable svelte/valid-compile -->
{#snippet addTaskInput()}
  <form
    bind:this={newFormEl}
    class="contents"
    on:submit={(e) => {
      e.preventDefault()
      createTask()
    }}
  >
    <input
      minlength="1"
      autofocus={true}
      bind:this={newInputEl}
      data-nav
      placeholder="Add new task"
      class="
        mb-2 flex h-9 w-full border-b border-dashed border-input bg-background px-3 py-2 text-sm
        ring-offset-background transition-all disabled:cursor-not-allowed disabled:opacity-50
        file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:rounded-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-0 placeholder:text-muted-foreground
      "
      on:blur={(e) => {
        if (e.currentTarget.value.length) {
          newFormEl.requestSubmit()
        }
        else {
          newFormEl.reset()
        }
      }}
      on:keyup={(e) => { e.code === 'Escape' ? newFormEl.reset() : handleArrowNavigation(e) }}
    />
  </form>

{/snippet}

{#snippet taskItem(id: Task['id'])}
  {@const data = $tasks.find(x => x.id === id)! }
  <div
    tabindex={0}
    class={cn(buttonVariants({ class: `
    flex items-center justify-start gap-2 transition-all 
    data-[checked=true]:opacity-40 data-[checked=true]:hover:opacity-100 focus:border-primary z-0
  `, variant: 'ghost', size: 'default' }))}
    data-checked={data.isDone}
    data-nav
    on:keyup={handleArrowNavigation}
    on:keyup={e => e.code === 'Delete' && deleteTask(data.id)}
    on:keyup={e => e.code === 'Space' && toggleIsDoneTask(data.id)}
  >
    <button
      class="inline-flex shrink-0 items-baseline p-1 group/checkbox"
      on:click={() => toggleIsDoneTask(data.id)}
    >
      <div class="
        relative size-4 rounded-full border border-foreground transition-all
        group-hover/checkbox:border-primary
      ">
        {#if data.isDone}
          <svg
            width="15"
            height="15"
            class="
              absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 fill-none
              stroke-foreground stroke-1 text-transparent transition-all
              group-hover/checkbox:stroke-primary
            "
            role="img"
            aria-label="check"
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              in:draw={{ duration: 500, easing: quadIn }}
              out:fade={{ duration: 500, easing: quadInOut }}
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 8 7 10 10 5"
              fill="currentColor"
            ></path>
          </svg>
        {/if}

      </div>
    </button>
    <div class="relative mr-auto text-ellipsis" title={data.name}>
      <span>{data.name}</span>

      {#if data.isDone}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 1"
          fill="none"
          class="
            absolute left-1/2 top-1/2 !h-0.5 !w-[calc(100%+0.5rem)] -translate-x-1/2
            -translate-y-1/2 stroke-muted-foreground stroke-1
          "
          preserveAspectRatio="none"
        >
          <path
            in:draw={{ duration: 500, easing: quadInOut }}
            out:fade={{ duration: 500, easing: quadInOut }}
            d="M0 0 10 0Z"
          />
        </svg>
      {/if}
    </div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} size="icon" variant="ghost" class="size-8">
            <Icon icon="fluent:more-vertical-16-regular" />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenu.Content preventScroll={false}>
          <DropdownMenu.Group>
            <DropdownMenu.Item onclick={() => toggleIsArchivedTask(data.id)}>
              <Icon icon="fluent:mail-inbox-16-regular" />
              {data.isArchived ? 'Unarchive' : 'Archive'}
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={() => deleteTask(data.id)}>
              <Icon icon="fluent:dismiss-16-regular" />
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenu.Root>
  </div>
{/snippet}

<svelte:window bind:scrollY></svelte:window>

<div class="relative *:px-4">
  <header
    class="
      sticky top-0 z-10 border-b bg-background backdrop-blur
      [border-image-source:radial-gradient(var(--border),transparent)]
    "
    style:--tw-bg-opacity={Math.min(1, scrollY / scrollThreshold) * 0.4}
    style:--tw-backdrop-blur="blur({Math.min(1, scrollY / scrollThreshold) * 8}px)"
    style:--tw-border-opacity={Math.min(1, scrollY / scrollThreshold) * 0.6}
  >
    <div class="container flex items-center gap-4 py-2">
      <button
        class="relative"
        type="button"
        on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <h1 class="text-xl leading-none">todo</h1>
        <Badge class="
          pointer-events-none absolute -end-3 -top-2 inline-flex size-4 items-center justify-center
          rounded-full p-0 text-[0.625rem] leading-none
        ">
          {pendingAndUnarchivedCount}
        </Badge>
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button {...props} size="icon" variant="ghost">
              <Icon icon="fluent:more-vertical-16-regular" />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content preventScroll={false}>
          <DropdownMenu.Group>
            <DropdownMenu.Item
              disabled={$tasks.filter(task => task.isDone && !task.isArchived).length === 0}
              onclick={() =>
                $tasks = $tasks.map(task =>
                  (task.isDone && !task.isArchived) ? { ...task, isArchived: true } : task)}
            >
              <Icon icon="fluent:mail-inbox-checkmark-16-regular" />
              Archive done tasks
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item
              disabled={!$tasks.find(task => !task.isDone && task.isArchived)}
              onclick={() =>
                $tasks = $tasks.map(task =>
                  (!task.isDone && task.isArchived) ? { ...task, isArchived: false } : task,
                )}
            >
              <Icon icon="fluent:mail-inbox-16-regular" />

              Restore pending tasks
            </DropdownMenu.Item>
            <DropdownMenu.Item
              disabled={!$tasks.find(task => task.isArchived)}
              onclick={() => $tasks = $tasks.filter(task => !task.isArchived)}
            >
              <Icon icon="fluent:mail-inbox-dismiss-16-regular" />
              Delete all archived
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item
              onclick={() => $tasks = []}
              class="
                text-destructive data-[highlighted]:bg-destructive
                data-[highlighted]:text-destructive-foreground
              "
            >
              <Icon icon="fluent:dismiss-square-multiple-16-regular" />
              Delete all
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onclick={() => toggleMode()}>
              <Icon icon="fluent:weather-sunny-16-regular" class="block dark:hidden" />
              <Icon icon="fluent:weather-moon-16-regular" class="hidden dark:block" />
              Mode light/dark
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={() => $tasks = exampleTasks}>
              Reset
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <div class="mx-auto"></div>
      <Label for="show-done" class="flex items-center gap-x-2 px-2.5">
        <Switch bind:checked={showDone} id="show-done" />
        <span>{hiddenDoneCount} done tasks</span>
      </Label>
      <Button
        onclick={() => {
          newInputEl.focus()
          newInputEl.scroll({ behavior: 'smooth' })
        }}
      >
        <Icon icon="fluent:square-add-16-regular" />
        <span class="hidden sm:block">New task</span>
      </Button>

    </div>

  </header>
  <section class="container mb-16 mt-4 space-y-4">
    <section class="flex flex-col p-2">
      {@render addTaskInput()}
      {#each $tasks.filter(x => !x.isArchived && !(x.isDone && !showDone)) as task (task.id)}
        <div
          in:receive={{ key: task.id }}
          out:send={{ key: task.id }}
          animate:flip={{ duration: animationDuration }}
        >
          {@render taskItem(task.id)}
        </div>
      {:else}
        <div class="px-8 py-16 text-center font-medium" in:fade>
          {emptyStates.at(Math.floor(emptyStates.length * Math.random()))}
        </div>
      {/each}
    </section>
    {#if $tasks.find(t => t.isArchived)}
      <details bind:open={archivedSectionOpen} class="rounded-md p-2 transition-all open:bg-card">
        <summary
          id="archived-section"
          data-nav
          tabindex={0}
          on:keyup={handleArrowNavigation}
          style:--text={archivedSectionOpen ? '\'Hide archived\'' : '\'Show archived\''}
          class="
            mb-1 select-none py-2 text-center text-xs text-muted-foreground underline-offset-2
            hover:underline
          "
        />
        <section class="flex flex-col gap-1">
          {#each $tasks.filter(x => x.isArchived) as task (task.id)}
            <div
              in:receive={{ key: task.id }}
              out:send={{ key: task.id }}
              animate:flip={{ duration: animationDuration }}
            >
              {@render taskItem(task.id)}
            </div>
          {/each}
        </section>
      </details>
    {/if}
  </section>
</div>

<style>
  #archived-section::marker {
    content: var(--text);
  }
</style>
