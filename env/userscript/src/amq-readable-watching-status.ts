import { isAmqReady } from '../lib/amq'
import { addScriptData, addStyle } from '../lib/thirdparty/amqScriptInfo'

if (isAmqReady()) {
  addStyle(`
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
}
