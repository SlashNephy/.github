import { onReady } from '../lib/amq/onReady'

onReady(() => {
  AMQ_addStyle(`
    .qpAvatarAnswerText {
      width: calc(100% - 1em);
    }

    .qpAvatarStatusInnerContainer {
      opacity: 1;
    }
  `)

  AMQ_addScriptData({
    name: 'Readable Watching Status',
    author: 'SlashNephy',
    description: 'Narrow the width of the answered anime titles to make the watching status indicator readable.',
  })
})
