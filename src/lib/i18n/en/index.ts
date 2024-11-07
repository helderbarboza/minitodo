import type { BaseTranslation } from '../i18n-types'

const en = {
  nDoneTasks: '{count:number} done tasks',
  language: 'Language',
  mode: 'Mode light/dark',
  actions: {
    delete: 'Delete',
    cancel: 'Cancel',
    archive: 'Archive',
    unarchive: 'Unarchive',
    deleteAll: 'Delete all',
    clearArchived: 'Clear archived',
    archiveDoneTasks: 'Archive done tasks',
    newTask: 'New task',
    showArchived: 'Show archived',
    hideArchived: 'Hide archived',
  },
  dialogs: {
    deleteAll: {
      title: 'Are you sure?',
      description: 'This action cannot be undone. This will delete all {count:number} tasks, even archived ones.',
      confirm: 'Yes, delete all',
    },
  },
  toasts: {
    deleteAll: 'Tasks deleted!',
  },
  emptyState: [
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
  ],
  taskDescriptionPlaceholder: [
    'Buy a new...',
    'Research the best...',
    'Schedule an appointment for...',
    'Call to confirm...',
    'Update the details of...',
    'Organize files related to...',
    'Send a follow-up email about...',
    'Prepare a report on...',
    'Set a reminder for...',
    'Create a plan for...',
    'Check the status of...',
    'Clean up the...',
    'Talk to...',
    'Make a list of...',
    'Pick up some...',
    'Cook or prepare...',
    'Look for a place to...',
    'Recharge the...',
    'Plan a day for...',
  ],
} satisfies BaseTranslation

export default en
