import { onReady } from '../lib/amq/onReady'

const handleKeydown = (event: KeyboardEvent) => {
  // eslint-disable-next-line xss/no-mixed-html
  const target = event.target as HTMLInputElement | null
  if (target === null) {
    return
  }

  // Delete キー押下でクリアできるようにする
  // Tips: Mac では Fn + delete でこのイベントが発火する
  if (event.key === 'Delete') {
    target.value = ''
  }
}

onReady(() => {
  for (const input of document.querySelectorAll<HTMLInputElement>('input.flatTextInput')) {
    input.addEventListener('keydown', handleKeydown)
  }

  AMQ_addScriptData({
    name: 'Clear Answer',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Add a feature to clear text in the answer column with delete key.',
  })
})
