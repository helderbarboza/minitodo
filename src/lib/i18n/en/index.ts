import type { BaseTranslation } from '../i18n-types'

const en = {
  nDoneTasks: '{count:number} do&shy;ne',
  language: 'Language',
  mode: 'Mode light/dark',
  actions: {
    delete: 'Delete',
    cancel: 'Cancel',
    archive: 'Archive',
    unarchive: 'Unarchive',
    deleteAll: 'Delete all',
    clearArchived: 'Clear archived',
    archiveDoneTasks: 'Archive done',
    newTask: 'New task',
    showArchived: 'Show archived',
    hideArchived: 'Hide archived',
    markAsDone: 'Mark as done',
    markAsPending: 'Mark as pending',
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
    'Empty list, multiple possibilities. What will you add?',
    'All tasks completed! Feel the freedom.',
    'A blank slate! Ready for your next big idea.',
    'You\'ve done it all - a moment of peace.',
    'It\'s so calm here, what\'s your next adventure?',
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
  exampleTasks: [
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
    'Try to convince everyone I\'m in the F.B.I.',
    'See if Pam wants to make me another cup of coffee (with a smile!)',
    'Brainstorm new ways to impress Ryan (he\'s going places)',
    'Daydream about being a famous actor',
    'Look for my magic kit',
    'Try to remember what I named my car',
    'Pretend to understand what Angela and the other accountants are talking about',
    'See if anyone wants to go to Hooters later',
    'Write a strongly worded letter to the Scranton Strangler (from Prison Mike)',
    'Practice my dance moves for the next office party',
    'Think about starting my own paper company',
    'Order a pizza (extra cheese, of course)',
    'Try to sell someone on my latest business idea (it\'s gonna be huge!)',
    'Come up with a new nickname for Pam (Beesly is so boring)',
    'Hide from Toby',
    'Pretend to do work when corporate is watching',
    'Worry about what people are saying about me behind my back',
    'Think about getting a "World\'s Best Dad" mug someday',
    'Try to remember if I left the stove on',
    'Wonder what Creed is up to (probably best not to know)',
    'Plan my next vacation (Jamaica? Vegas? Scranton?)',
    'Get Dwight a new weapon for his desk (just in case)',
    'Ask Pam to plan another birthday party for me',
    'Challenge Andy to a sing-off',
    'Tell Phyllis she\'s looking "healthy" today',
    'See if Stanley wants to invest in my next big idea (he seems like he has money)',
    'Try to convince Meredith to share one of her stories at the next meeting',
    'Ask Angela for relationship advice',
    'Borrow five bucks from Darryl',
    'Try to set Creed up on a date with Meredith',
  ],
} satisfies BaseTranslation

export default en
