import { isReady } from '../lib/amq/isReady'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

if (isReady()) {
  document.addEventListener('DOMNodeInserted', () => {
    for (const element of document.querySelectorAll<HTMLVideoElement>('video')) {
      element.preload = 'auto'
    }
  })

  addScriptData({
    name: 'Preload Video',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description:
      'Just enable media preloading. Speed up buffering. Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!',
  })
}
