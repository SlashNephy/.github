// eslint-disable-next-line unused-imports/no-unused-vars
declare function AMQ_createInstalledWindow(): void
declare function AMQ_addScriptData(metadata: { name: string; author: string; description: string }): void
// eslint-disable-next-line unused-imports/no-unused-vars
declare function AMQ_addStyle(css: string): void

document.addEventListener('DOMNodeInserted', () => {
  for (const element of document.querySelectorAll<HTMLVideoElement>('video')) {
    element.preload = 'auto'
  }
})

AMQ_addScriptData({
  name: 'Preload Video',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: '<p>Just enable media preloading. Speed up buffering.</p><p>Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!</p>',
})
