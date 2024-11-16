<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog'
  import { Badge } from '$lib/components/ui/badge'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import { Label } from '$lib/components/ui/label'
  import { Switch } from '$lib/components/ui/switch'
  import LL, { locale, setLocale } from '$lib/i18n/i18n-svelte'
  import { locales } from '$lib/i18n/i18n-util'
  import { cn } from '$lib/utils'
  import Icon from '@iconify/svelte'
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'
  import { toggleMode } from 'mode-watcher'
  import { flip } from 'svelte/animate'
  import { quadIn, quadInOut, quadOut } from 'svelte/easing'
  import { get } from 'svelte/store'
  import { crossfade, draw, fade, fly } from 'svelte/transition'
  import { toast } from 'svelte-sonner'

  interface Task {
    id: symbol
    name: string
    isDone: boolean
    isArchived: boolean
  }

  interface Profile {
    showDone: boolean
  }

  const localStorageTasksKey = 'tasks'
  const localStorageProfileKey = 'profile'

  const getExampleTasks = () => {
    return Object.values(get(LL).exampleTasks)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map(name => ({ name: name(), id: Symbol(name()), isArchived: Math.random() < 0.3, isDone: Math.random() < 0.7 }))
  }

  let tasks = $state<Task[]>((() => {
    const storedTasks = localStorage.getItem(localStorageTasksKey)

    return storedTasks
      ? (JSON.parse(storedTasks)).map((task: Task) => ({ ...task, id: Symbol(task.name) }))
      : getExampleTasks()
  })())

  const profile = $state((() => {
    const storedProfile = localStorage.getItem(localStorageProfileKey)

    return (storedProfile
      ? JSON.parse(storedProfile) satisfies Profile
      : { showDone: true } satisfies Profile) as Profile
  })())

  $effect(() => {
    localStorage.setItem(localStorageTasksKey, JSON.stringify(tasks))
  })

  $effect(() => {
    localStorage.setItem(localStorageProfileKey, JSON.stringify(profile))
  })

  let newInputEl: HTMLInputElement
  let newInputValue: string = $state('')

  let nextId = $state(Symbol(0))

  const animationDuration = 250
  const [send, receive] = crossfade({
    duration: animationDuration,
    fallback: (node, _params, intro) => {
      if (!profile.showDone) {
        return intro ? fly(node, { duration: animationDuration, y: '-1rem', opacity: 0 }) : fade(node, { duration: animationDuration })
      }

      return intro ? fly(node, { duration: animationDuration, y: '-1rem', opacity: 0 }) : fly(node, { duration: animationDuration, y: '1rem', opacity: 0 })
    },
  })

  function toggleIsDoneTask(id: Task['id']) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task,
    )
  }

  function toggleIsArchivedTask(id: Task['id']) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, isArchived: !task.isArchived } : task,
    )
  }

  function createTask() {
    const formattedDescription = newInputEl.value.trim()
    newInputEl.value = ''

    if (formattedDescription.length) {
      tasks = [{ name: formattedDescription, id: nextId, isDone: false, isArchived: false }, ...tasks]
      nextId = Symbol(0)
    }
  }

  function deleteTask(id: Task['id']) {
    tasks = tasks.filter(v => v.id !== id)
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

  const numberGen = function* (size: number) {
    let index = 0
    while (true) {
      const currentIndex = index
      index = (index + 1) % size
      yield currentIndex
    }
  }
  const placeholderKeyGenerator = numberGen(Object.keys($LL.taskDescriptionPlaceholder).length)
  const getNewPlaceholderKey = () => placeholderKeyGenerator.next().value.toString() as keyof typeof $LL.taskDescriptionPlaceholder
  let placeholderKey = $state(getNewPlaceholderKey())
  const incrementPlaceholderOffsetFunction = () => {
    placeholderKey = getNewPlaceholderKey()
  }
  let incrementPlaceholderOffsetInterval: number

  let deleteAllAlertDialogOpen = $state(false)
  const pendingAndUnarchivedCount = $derived.by(() => tasks.filter(task => !task.isDone && !task.isArchived).length)
  const hiddenDoneCount = $derived.by(() => tasks.filter(task => !task.isArchived && task.isDone).length)
  let scrollY: number = $state(0)
  const scrollRatio = $derived(scrollY / 260)
  let archivedSectionOpen = $state(false)
  let newFormEl: HTMLFormElement

</script>

<svelte:window
  bind:scrollY
/>

<svelte:document
  onvisibilitychange={() => {
    if (document.hidden) {
      clearInterval(incrementPlaceholderOffsetInterval)
    }
    else {
      incrementPlaceholderOffsetInterval = setInterval(incrementPlaceholderOffsetFunction, 30_000)
    }
  }}
/>

<svelte:head>
  <title>todo{pendingAndUnarchivedCount ? ` (${pendingAndUnarchivedCount})` : ''}</title>
</svelte:head>

<!-- eslint-disable svelte/valid-compile -->
{#snippet addTaskInput()}
  <form
    bind:this={newFormEl}
    class="contents"
    onsubmit={(e) => {
      e.preventDefault()
      createTask()
    }}
  >
    <div class="relative">
      <input
        minlength="1"
        bind:this={newInputEl}
        bind:value={newInputValue}
        data-nav
        class="
          mb-2 flex h-9 w-full border-b border-dashed border-input bg-background px-3 py-2 text-sm
          ring-offset-background transition-all disabled:cursor-not-allowed disabled:opacity-50
          focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-0 lg:text-base
        "
        onblur={(e) => {
          if (e.currentTarget.value.length) {
            newFormEl.requestSubmit()
          }
          else {
            newFormEl.reset()
          }
        }}
        onkeyup={(e) => {
          if (e.code === 'Escape') {
            newFormEl.reset()
            newInputEl.blur()
          }
          else {
            handleArrowNavigation(e)
          }
        }}
      />
      {#if newInputValue?.length === 0}
        {#key placeholderKey}
          <span
            aria-hidden
            class="
              pointer-events-none absolute inset-x-3 top-2 select-none truncate text-sm italic
              text-muted-foreground lg:top-1.5 lg:text-base
            "
            in:fly={{ duration: 1000, x: '-0.5rem', delay: 1000, easing: quadOut }}
            out:fly={{ duration: 1000, x: '0.5rem', easing: quadIn }}
          >&quot;{$LL.taskDescriptionPlaceholder[placeholderKey]()}&quot;</span>
        {/key}
      {/if}
    </div>
  </form>

{/snippet}

{#snippet taskItem(task: Task)}
  <div
    tabindex={0}
    class={cn(buttonVariants({ class: `
  flex items-center justify-start gap-2 transition-all 
  data-[checked=true]:opacity-40 data-[checked=true]:hover:opacity-100 focus:border-primary z-0 text-base
`, variant: 'ghost', size: 'default' }))}
    data-checked={task.isDone}
    data-nav
    onkeyup={(e) => {
      handleArrowNavigation(e)
    // if (e.code === 'Space') {
      //   toggleIsDoneTask(task.id)
      // }

      // if (e.code === 'Delete')
      //   deleteTask(task.id)
    }}
  >
    <button
      class="inline-flex shrink-0 items-baseline p-1 group/checkbox"
      onclick={() => toggleIsDoneTask(task.id)}
    >
      <div class="
        relative size-4 rounded-full border-[1.5px] border-foreground bg-background/50
        transition-all group-hover/checkbox:border-primary
      ">
        {#if task.isDone}
          <svg
            width="15"
            height="15"
            class="
              absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 fill-none
              stroke-foreground stroke-[1.5px] text-transparent transition-all
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
    <div class="relative mr-auto overflow-x-hidden" title={task.name}>
      <div contenteditable="true" spellcheck="false" class="
        max-w-full truncate text-nowrap px-1 py-0.5 text-sm focus:text-clip lg:text-base
      " onblur={e => e.currentTarget.textContent && (task.name = e.currentTarget.textContent)}>{task.name}</div>

      {#if task.isDone}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 1"
          fill="none"
          class="
            absolute left-1/2 top-1/2 !h-0.5 !w-[calc(100%+0.5rem)] -translate-x-1/2
            -translate-y-1/2 stroke-foreground stroke-1
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
          <Button {...props} size="icon" variant="ghost" class="size-8 shrink-0">
            <Icon icon="fluent:more-vertical-16-regular" />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenu.Content preventScroll={false}>
          <DropdownMenu.Group>
            <DropdownMenu.Item onclick={() => toggleIsArchivedTask(task.id)}>
              <Icon icon="fluent:mail-inbox-16-regular" />
              {task.isArchived ? $LL.actions.unarchive() : $LL.actions.archive()}
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={() => deleteTask(task.id)}>
              <Icon icon="fluent:dismiss-16-regular" />
              {$LL.actions.delete()}
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenu.Root>
  </div>

{/snippet}

<AlertDialog.Root bind:open={deleteAllAlertDialogOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{$LL.dialogs.deleteAll.title()}</AlertDialog.Title>
      <AlertDialog.Description>
        {$LL.dialogs.deleteAll.description({ count: tasks.length })}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>{$LL.actions.cancel()}</AlertDialog.Cancel>
      <AlertDialog.Action
        class={buttonVariants({ variant: 'destructive' })}
        onclick={() => {
          tasks = []
          deleteAllAlertDialogOpen = false
          toast.success($LL.toasts.deleteAll())
        }}
      >
        {$LL.dialogs.deleteAll.confirm()}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<div class="relative">
  <header
    class="
      sticky top-0 z-10 bg-background pe-2 ps-2
      shadow-[0px_1px_0px_hsl(var(--border)_/_var(--drop-shadow-opacity))] backdrop-blur
    "
    style:--tw-bg-opacity={Math.min(1, scrollRatio) * 0.4}
    style:--tw-backdrop-blur="blur({Math.min(1, scrollRatio) * 8}px)"
    style:--drop-shadow-opacity={Math.min(1, scrollRatio) * 0.8}
  >
    <div class="container flex items-center gap-4 py-2">
      <button
        class="relative"
        type="button"
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <h1 class="text-xl leading-none">todo</h1>
        {#if pendingAndUnarchivedCount}
          <Badge class="
            pointer-events-none absolute -end-3 -top-2 inline-flex size-4 items-center
            justify-center rounded-full p-0 text-[0.625rem] leading-none
          ">
            {pendingAndUnarchivedCount}
          </Badge>
        {/if}
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button {...props} size="icon" variant="ghost">
              <Icon icon="fluent:more-vertical-16-regular" />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content preventScroll={false} align="start">
          <DropdownMenu.Group>
            <DropdownMenu.Item
              disabled={tasks.filter(task => task.isDone && !task.isArchived).length === 0}
              onclick={() =>
                tasks = tasks.map(task =>
                  (task.isDone && !task.isArchived) ? { ...task, isArchived: true } : task)}
            >
              <Icon icon="fluent:mail-inbox-checkmark-16-regular" />
              {$LL.actions.archiveDoneTasks()}
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item disabled={tasks.length === 0} onclick={() => deleteAllAlertDialogOpen = true}>
              <Icon icon="fluent:dismiss-square-multiple-16-regular" />
              {$LL.actions.deleteAll()}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onclick={() => toggleMode()}>
              <Icon icon="fluent:weather-sunny-16-regular" class="block dark:hidden" />
              <Icon icon="fluent:weather-moon-16-regular" class="hidden dark:block" />
              {$LL.mode()}
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <Icon icon="fluent:local-language-16-regular" />
                {$LL.language()}
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.RadioGroup value={$locale}>
                  {#each locales as locale}
                    <DropdownMenu.RadioItem
                      value={locale}
                      onclick={() => setLocale(locale)}
                    >
                      {new Intl.DisplayNames([locale], { type: 'language' }).of(locale)}
                    </DropdownMenu.RadioItem>
                  {/each}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>

            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onclick={() => tasks = getExampleTasks()}>
              Reset
            </DropdownMenu.Item>

          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <div class="mx-auto"></div>
      <Label for="show-done" class="flex items-center gap-x-2 px-2.5">
        <Switch bind:checked={profile.showDone} id="show-done" />
        <span>{$LL.nDoneTasks({ count: hiddenDoneCount })}</span>
      </Label>
      <Button
        title={$LL.actions.newTask()}
        onclick={() => {
          newInputEl.focus()
          newInputEl.scroll({ behavior: 'smooth' })
        }}
      >
        <Icon icon="fluent:square-add-16-regular" />
        <span class="hidden sm:block">{$LL.actions.newTask()}</span>
      </Button>
    </div>
  </header>

  <section class="container mb-6 mt-4 space-y-4">
    {@render addTaskInput()}
    <section class="flex flex-col p-2">
      {#each tasks.filter(x => !x.isArchived && !(x.isDone && !profile.showDone)) as task (task.id)}
        <div
          in:receive={{ key: task.id }}
          out:send={{ key: task.id }}
          animate:flip={{ duration: animationDuration }}
        >
          {@render taskItem(task)}
        </div>
      {:else}
        <div class="
          grid h-[calc(100vh-230px)] place-items-center p-8 text-center text-lg font-normal
        " in:fade>
          {$LL.emptyState[Math.floor(Object.keys($LL.emptyState).length * Math.random()).toString() as keyof typeof $LL.emptyState]()}
        </div>
      {/each}
    </section>
    {#if tasks.find(t => t.isArchived)}
      <details
        bind:open={archivedSectionOpen}
        class="
          group rounded-md p-2 opacity-50 transition-all hover:opacity-100 open:bg-card
          open:opacity-100
        "
        ontoggle={(e) => {
          e.currentTarget.open && window.scroll({
            top: e.currentTarget.offsetTop,
            behavior: 'smooth',
          })
        }}
      >
        <summary
          data-nav
          tabindex={0}
          onkeyup={handleArrowNavigation}
          class={cn(buttonVariants({ variant: 'ghost', class: 'w-full justify-between', size: 'sm' }))}
        >

          <span>{archivedSectionOpen ? $LL.actions.hideArchived() : $LL.actions.showArchived()}</span>
          <Icon icon="fluent:chevron-down-16-regular" class="transition-all group-open:rotate-180" />
        </summary>
        <section class="flex flex-col">
          <nav class="flex justify-end px-4 py-2">
            <Button
              size="sm"
              title={$LL.actions.clearArchived()}
              variant="outline"
              disabled={!tasks.find(task => task.isArchived)}
              onclick={() => tasks = tasks.filter(task => !task.isArchived)}
            >
              <Icon icon="fluent:mail-inbox-dismiss-16-regular" />
              <span class="hidden sm:block">{$LL.actions.clearArchived()}</span>
            </Button>
          </nav>
          {#each tasks.filter(x => x.isArchived) as task (task.id)}
            <div
              in:receive={{ key: task.id }}
              out:send={{ key: task.id }}
              animate:flip={{ duration: animationDuration }}
            >
              {@render taskItem(task)}
            </div>
          {/each}
        </section>
      </details>
    {/if}
  </section>
</div>
