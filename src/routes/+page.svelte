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

  const profile = $state<Profile>((() => {
    const storedProfile = localStorage.getItem(localStorageProfileKey)

    return (storedProfile ? JSON.parse(storedProfile) : { showDone: true })
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

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const numberGen = function* (size: number) {
    let index = randomInt(0, size)
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
  let incrementPlaceholderOffsetInterval: NodeJS.Timeout

  let deleteAllAlertDialogOpen = $state(false)
  const pendingAndUnarchivedCount = $derived.by(() => tasks.filter(task => !task.isDone && !task.isArchived).length)
  const hiddenDoneCount = $derived.by(() => tasks.filter(task => !task.isArchived && task.isDone).length)
  let scrollY: number = $state(0)
  const scrollRatio = $derived(scrollY / 260)
  let archivedSectionOpen = $state(false)
  let newFormEl: HTMLFormElement

  const inputAttrs: Record<string, any> = { spellcheck: false, minlength: 1, type: 'text' }
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
      incrementPlaceholderOffsetInterval = setInterval(incrementPlaceholderOffsetFunction, 15_000)
    }
  }}
/>

<svelte:head>
  <title>minitodo{pendingAndUnarchivedCount ? ` (${pendingAndUnarchivedCount})` : undefined}</title>
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
        {...inputAttrs}
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
              text-muted-foreground opacity-50 lg:top-1.5 lg:text-base
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
    class={cn(buttonVariants(
      {
        class: `flex items-center hover:bg-accent/50 justify-start gap-2 transition-all 
        data-[checked=true]:opacity-40 data-[checked=true]:hover:opacity-100 focus:border-primary 
        z-0 text-base px-1`,
        variant: 'ghost',
        size: 'default',
      },
    ))}
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
    <Button
      onclick={() => toggleIsDoneTask(task.id)}
      size="icon"
      variant="link"
      class="shrink-0 group/checkbox size-8"
      title={task.isDone ? $LL.actions.markAsPending() : $LL.actions.markAsDone()}
    >
      <div class="
        relative size-4 rounded-full border-[1.5px] border-foreground bg-background/50
        stroke-foreground stroke-[1.5px] text-transparent group-hover/checkbox:border-primary
        group-hover/checkbox:stroke-primary
      ">
        {#if task.isDone}
          <svg
            width="15"
            height="15"
            class="
              absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 stroke-inherit
              text-inherit transition-all
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
    </Button>
    <div class="mr-auto w-full overflow-x-hidden" title={task.name}>
      <div class="relative w-min max-w-full p-0.5">
        <input
          {...inputAttrs}
          value={task.name}
          style:field-sizing="content"
          class="
            peer flex w-full min-w-16 max-w-full truncate rounded-md bg-transparent px-1 py-0.5
            text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
            focus-visible:invalid:border-destructive/80 focus-visible:invalid:ring-destructive
            lg:text-base
          "
          required
          onkeydown={(e) => {
            if (e.key === 'Escape') {
              e.currentTarget.value = task.name
              e.currentTarget.blur()
            }

            if (e.key === 'Enter')
              e.currentTarget.blur()
          }}
          onchange={(e) => {
            if (e.currentTarget.validity.valid) {
              task.name = e.currentTarget.value
            }
            else {
              e.currentTarget.value = task.name
            }
          }}
        />
        {#if task.isDone}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 1"
            fill="none"
            class="
              absolute top-1/2 !h-0.5 !w-full stroke-foreground stroke-1 transition-opacity
              peer-focus:opacity-0
            "
            preserveAspectRatio="none"
          >
            <path
              in:draw={{ duration: 1000, easing: quadIn }}
              out:fade={{ duration: 500, easing: quadInOut }}
              d="M0 0 10 0Z"
            />
          </svg>
        {/if}
      </div>
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
    <div class="container flex items-center gap-2 py-2">
      <button
        class="relative"
        type="button"
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <h1 class="group text-lg leading-none sm:text-xl">
          <span class="text-accent transition-all group-hover:text-primary">mini</span><span>todo</span>
        </h1>
        {#if pendingAndUnarchivedCount}
          {@const limit = 9}
          <div
            class="absolute right-0 top-0 -translate-y-2 translate-x-2"
          >
            <Badge
              class="
                flex h-4 w-4 items-center justify-center truncate rounded-full p-0.5 text-[0.625rem]
                tracking-tighter transition-all hover:bg-primary
              "
              title={String(pendingAndUnarchivedCount)}
            >
              {pendingAndUnarchivedCount > limit ? `${limit}+` : pendingAndUnarchivedCount}
            </Badge>
          </div>
        {/if}
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="mr-auto shrink-0">
          {#snippet child({ props })}
            <Button {...props} size="icon" variant="ghost">
              <Icon icon="fluent:more-vertical-16-regular" />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content preventScroll={false}>
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
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Label for="show-done" class="inline-flex items-center gap-x-2 px-2.5">
        <Switch bind:checked={profile.showDone} id="show-done" />
        <div class="line-clamp-2">{$LL.nDoneTasks({ count: hiddenDoneCount })}</div>
      </Label>
      <Button
        title={$LL.actions.newTask()}
        onclick={() => {
          newInputEl.focus()
          newInputEl.scroll({ behavior: 'smooth' })
        }}
        size="icon"
        class="flex shrink-0 sm:hidden"
      >
        <Icon icon="fluent:add-16-regular" />
        <span class="hidden sm:block">{$LL.actions.newTask()}</span>
      </Button>
      <Button
        title={$LL.actions.newTask()}
        onclick={() => {
          newInputEl.focus()
          newInputEl.scroll({ behavior: 'smooth' })
        }}
        class="hidden shrink-0 sm:flex"
      >
        <Icon icon="fluent:add-16-regular" />
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
