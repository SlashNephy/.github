import { onReady } from '../lib/amq/onReady'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

onReady(() => {
  GM_addStyle(`
    .qpAvatarAnswerText {
      width: calc(100% - 1em);
    }

    .qpAvatarStatusInnerContainer {
      opacity: 1;
    }
  `)

  addScriptData({
    name: 'Readable Watching Status',
    author: 'SlashNephy',
    description: 'Narrow the width of the answered anime titles to make the watching status indicator readable.',
  })
})
