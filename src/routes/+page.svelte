<script context="module">
  import { writable } from 'svelte/store'
  import { type Writable } from 'svelte/store'

  const localStorageKey = 'tasks'

  const storedTasks = localStorage.getItem('tasks')

  interface Task {
    description: string
    id: symbol
    checked: boolean
  }

  const exampleTasks = [
    { description: 'Call corporate about my amazing "Somehow I Manage" book idea', id: Symbol(0), checked: false },
    { description: 'Plan next team building exercise (maybe laser tag?)', id: Symbol(0), checked: false },
    { description: 'Figure out why Toby still works here', id: Symbol(0), checked: false },
    { description: 'Buy new "World\'s Best Boss" mug (Dwight broke my other one)', id: Symbol(0), checked: false },
    { description: 'Schedule next Dundies awards ceremony', id: Symbol(0), checked: false },
    { description: 'Practice new character voices for meetings', id: Symbol(0), checked: false },
    { description: 'Ask Jan about expanding the client base to include local comedy clubs', id: Symbol(0), checked: false },
    { description: 'Find out what a "rundown" is', id: Symbol(0), checked: false },
    { description: 'Tell "That\'s what she said" joke (minimum 3x)', id: Symbol(0), checked: false },
    { description: 'Check on Dwight\'s weird farm stories', id: Symbol(0), checked: false },
    { description: 'Avoid doing actual paperwork', id: Symbol(0), checked: false },
    { description: 'Make sure Jim is pranking Dwight (good for office morale)', id: Symbol(0), checked: false },
    { description: 'Visit accounting to bother Oscar with movie quotes', id: Symbol(0), checked: false },
    { description: 'Learn to make better toast', id: Symbol(0), checked: false },
    { description: 'Perfect my impression of a wise Italian mobster', id: Symbol(0), checked: false },
    { description: 'Convince warehouse to do another improv session', id: Symbol(0), checked: false },
    { description: 'Find new ways to make meetings more fun', id: Symbol(0), checked: false },
    { description: 'Think of better nickname for Kevin', id: Symbol(0), checked: false },
    { description: 'Pay rent on condo', id: Symbol(0), checked: false },
    { description: 'Call Mom', id: Symbol(0), checked: false },
    { description: 'Buy more hair gel', id: Symbol(0), checked: false },
    { description: 'Schedule dentist appointment (maybe)', id: Symbol(0), checked: false },
    { description: 'Watch new cop movie for more character inspiration', id: Symbol(0), checked: false },
  ]

  const tasks = writable<Task[]>((() => {
    if (storedTasks) {
      return (JSON.parse(storedTasks) as Task[])
        .map(task => ({ ...task, id: Symbol(task.description) }))
    }
    else {
      return exampleTasks
    }
  })())

  tasks.subscribe(v => localStorage.setItem(localStorageKey, JSON.stringify(v)))
</script>

<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import { cn } from '$lib/utils'
  import { flip } from 'svelte/animate'
  import { quadIn, quadInOut } from 'svelte/easing'
  import { crossfade, draw, fade } from 'svelte/transition'

  const nextId: Writable<symbol> = writable(Symbol(0))

  const animationDuration = 250
  const [send, receive] = crossfade({ duration: animationDuration })

  function toggleTask(id: Task['id']) {
    const i = $tasks.findIndex(x => x.id === id)

    $tasks[i].checked = !$tasks[i].checked
  }

  let doneSectionOpen = false
  let showNewInput = false
  let newInputEl: HTMLInputElement
  let newFormEl: HTMLFormElement

  function addTask() {
    const formattedDescription = newInputEl.value.trim()
    newInputEl.value = ''

    if (formattedDescription.length) {
      tasks.update(v => ([...v, { description: formattedDescription, id: $nextId, checked: false }]))
      $nextId = Symbol(0)
    }
  }

  function removeTask(id: Task['id']) {
    $tasks = $tasks.filter(v => v.id !== id)
  }

  function handleArrowNavigation(e: KeyboardEvent) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      const direction = e.code === 'ArrowDown' ? 1 : -1
      e.preventDefault()
      const taskElems = Array.from<HTMLDivElement>(document.querySelectorAll('[data-nav]:not(.pointer-events-none)'))
      const currentIndex = taskElems.filter(el => el.tabIndex === 0 && el.checkVisibility()).findIndex(el => el === e.target)

      if (currentIndex >= 0) {
        const targetIndex = Math.min(taskElems.length - 1, Math.max(currentIndex + direction, 0))
        taskElems[targetIndex].focus()
      }
    }
  }

  nextId.subscribe(() => newInputEl && newInputEl.focus())
</script>
<!-- eslint-disable svelte/valid-compile -->
{#snippet addItem()}
  {@const className = 'h-8 px-3 py-1 text-xs [grid-area:1/1]' }
  <div class="grid">
    <form
      bind:this={newFormEl}
      class="contents"
      on:submit={(e) => {
        e.preventDefault()
        addTask()
      }}
      on:reset={() => {
        showNewInput = false
      }}
    >

      <input
        minlength="1"
        autofocus={showNewInput}
        tabindex={!showNewInput ? -1 : 0}
        bind:this={newInputEl}
        data-nav
        class={cn(className, 'rounded-md border', !showNewInput && `pointer-events-none opacity-0`)}
        on:blur={(e) => {
          if (e.currentTarget.value.length) {
            newFormEl.requestSubmit()
            showNewInput = false
          }
          else {
            newFormEl.reset()
          }
        }}
        on:keyup={(e) => { e.code === 'Escape' ? newFormEl.reset() : handleArrowNavigation(e) }}
      />
    </form>
    <button
      tabindex={showNewInput ? -1 : 0}
      data-nav
      on:keyup={handleArrowNavigation}
      class={cn(buttonVariants({
        variant: 'ghost',
        size: 'sm',
        class: [className, `
        flex items-center justify-start gap-1 border border-transparent transition-all
        border-dashed hover:border-border hover:bg-transparent text-muted-foreground
      `, showNewInput && 'pointer-events-none opacity-0'],
      }))}
      on:click={() => {
        newInputEl.focus()
        showNewInput = true
      }}
    >
      <span class="m-1 font-[Arial]">+</span>
      <span>New task</span>
    </button>
  </div>

{/snippet}

{#snippet taskItem(id: Task['id'])}
  {@const data = $tasks.find(x => x.id === id)! }
  {@const className = `
    group flex items-center justify-start gap-2 transition-all
    data-[checked=true]:text-muted-foreground data-[checked=true]:opacity-50
    data-[checked=true]:hover:opacity-100 focus:border-primary
  ` }
  <div
    tabindex={0}
    class={cn(buttonVariants({ class: className, variant: 'outline', size: 'default' }))}
    data-checked={data.checked}
    data-nav
    on:keyup={handleArrowNavigation}
    on:keyup={e => e.code === 'Delete' && removeTask(data.id)}
    on:keyup={e => e.code === 'Space' && toggleTask(data.id)}
  >
    <button
      class="
        relative box-border inline-flex size-3.5 shrink-0 items-baseline rounded-full border
        border-input hover:border-primary
      "
      on:click={() => toggleTask(data.id)}
    >
      {#if data.checked}
        <svg
          width="15"
          height="15"
          class="
            absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 stroke-foreground/70
            stroke-1 text-transparent
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
            d="M10 5 7 10 5 8"
            fill="currentColor"
          ></path>
        </svg>
      {/if}
    </button>
    <span class="relative truncate" title={data.description}>
      <span contenteditable="true" bind:innerHTML={data.description}>{data.description}</span>

      {#if data.checked}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 1"
          fill="none"
          class="
            absolute left-1/2 top-1/2 h-px w-[calc(100%+0.25rem)] -translate-x-1/2 -translate-y-1/2
            stroke-muted-foreground stroke-1
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
    </span>
    <button
      on:click={() => removeTask(data.id)}
      class="ml-auto hidden p-2 text-xs text-muted-foreground group-focus-within:block">delete</button>
  </div>
{/snippet}

<div class="my-4 flex items-center gap-2">
  <h1 class="text-xl leading-none">todo</h1>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} size="icon" variant="ghost">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content preventScroll={false}>
      <DropdownMenu.Group>
        <DropdownMenu.Item onclick={() => $tasks = []} class="
          text-destructive data-[highlighted]:bg-destructive
          data-[highlighted]:text-destructive-foreground
        ">Delete all</DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>

  <div class="ml-auto">
    <Button
      variant="ghost"
      size="icon"
      onclick={() => {
        showNewInput = true
        newInputEl.focus()
        newInputEl.scroll({ behavior: 'smooth' })
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </Button>
  </div>
</div>
<section class="flex flex-col gap-1">
  {#each $tasks.filter(x => !x.checked) as task (task.id)}
    <div in:receive={{ key: task.id }} out:send={{ key: task.id }} animate:flip={{ duration: animationDuration }}>
      {@render taskItem(task.id)}
    </div>
  {/each}
  {@render addItem()}
</section>
{#if $tasks.find(t => t.checked)}
  <details bind:open={doneSectionOpen}>
    <summary
      id="done-section" data-nav
      tabindex={0}
      on:keyup={handleArrowNavigation}
      style:--text={doneSectionOpen ? '\'Hide done\'' : '\'Show done\''}
      class="
        my-1 select-none p-2 text-center text-xs text-muted-foreground underline-offset-2
        hover:underline marker:uppercase
      "
    />
    <section class="flex flex-col gap-1">
      {#each $tasks.filter(x => x.checked) as task (task.id)}

        <div in:receive={{ key: task.id }} out:send={{ key: task.id }} animate:flip={{ duration: animationDuration }}>
          {@render taskItem(task.id)}
        </div>
      {/each}
    </section>
  </details>
{/if}

<style>
  #done-section::marker {
    content: var(--text);
  }
</style>
