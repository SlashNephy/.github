import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

enum SocialStatus {
  Invisible = 4,
}

document.addEventListener('DOMNodeInserted', () => {
  switch (unsafeWindow.socialTab?.socialStatus?.currentStatus) {
    case SocialStatus.Invisible:
    case undefined:
      return
    default:
      unsafeWindow.socialTab?.socialStatus?.changeSocialStatus(SocialStatus.Invisible)
  }
})

addScriptData({
  name: 'Private Session',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Set invisible status automatically.',
})
