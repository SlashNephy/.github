import { onReady } from '../lib/amq/onReady'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

onReady(() => {
  document.addEventListener('DOMNodeInserted', () => {
    switch (unsafeWindow.socialTab.socialStatus?.currentStatus) {
      case unsafeWindow.socialTab.socialStatus?.STATUS_IDS.INVISIBLE:
      case undefined:
        return
      default:
        unsafeWindow.socialTab.socialStatus?.changeSocialStatus(
          unsafeWindow.socialTab.socialStatus.STATUS_IDS.INVISIBLE
        )
    }
  })

  addScriptData({
    name: 'Private Session',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Set invisible status automatically.',
  })
})
