import { onReady } from '../lib/amq/onReady'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    displayMessage: typeof displayMessage
  }
}

onReady(() => {
  const originalDisplayMessage = displayMessage
  unsafeWindow.displayMessage = (title, message, callback, isOutsideDismiss, disableSwal) => {
    if (title === 'Disconnected from server' || title === 'Successfully  Reconnected') {
      return
    }

    originalDisplayMessage(
      title,
      message,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      callback ?? (() => {}),
      isOutsideDismiss ?? true,
      disableSwal ?? false
    )
  }

  AMQ_addScriptData({
    name: 'Hide Annoying Dialog',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Hide annoying message dialogs when disconnecting and reconnecting.',
  })
})
