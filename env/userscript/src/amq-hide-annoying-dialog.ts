import { isAmqReady } from '../lib/amq'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    displayMessage: typeof displayMessage
  }
}

if (isAmqReady()) {
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

  addScriptData({
    name: 'Hide Annoying Dialog',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Hide annoying message dialogs when disconnecting and reconnecting.',
  })
}
