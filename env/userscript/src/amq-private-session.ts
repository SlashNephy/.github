import { AMQ_addScriptData } from '../lib/thirdparty/amqScriptInfo'

const INVISIBLE_STATUS = 4

document.addEventListener('DOMNodeInserted', () => {
  switch (socialTab?.socialStatus?.currentStatus) {
    case INVISIBLE_STATUS:
    case undefined:
      return
    default:
      socialTab?.socialStatus?.changeSocialStatus(INVISIBLE_STATUS)
  }
})

AMQ_addScriptData({
  name: 'Private Session',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: '<p>Set invisible status automatically.</p>',
})
