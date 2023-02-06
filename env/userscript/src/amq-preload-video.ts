import { onReady } from '../lib/amq/onReady'

onReady(() => {
  document.addEventListener('DOMNodeInserted', () => {
    for (const element of document.querySelectorAll<HTMLVideoElement>('video')) {
      element.preload = 'auto'
    }
  })

  AMQ_addScriptData({
    name: 'Preload Video',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description:
      'Just enable media preloading. Speed up buffering. Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!',
  })
})
