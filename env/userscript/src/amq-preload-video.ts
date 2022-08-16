import { AMQ_addScriptData } from '../lib/thirdparty/amqScriptInfo'

document.addEventListener('DOMNodeInserted', () => {
  for (const element of document.querySelectorAll<HTMLVideoElement>('video')) {
    element.preload = 'auto'
  }
})

AMQ_addScriptData({
  name: 'Preload Video',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description:
    '<p>Just enable media preloading. Speed up buffering.</p><p>Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!</p>',
})
