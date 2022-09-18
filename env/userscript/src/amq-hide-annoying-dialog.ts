import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    originalDisplayMessage: Window['displayMessage']
    displayMessage(
      title: string,
      message: string,
      callback?: () => void,
      isOutsideDismiss?: boolean,
      disableSwal?: boolean
    ): void
  }
}

if ('displayMessage' in unsafeWindow) {
  unsafeWindow.originalDisplayMessage = unsafeWindow.displayMessage

  unsafeWindow.displayMessage = (title, message, callback, isOutsideDismiss, disableSwal) => {
    if (title === 'Disconnected from server' || title === 'Successfully  Reconnected') {
      return
    }

    unsafeWindow.originalDisplayMessage(
      title,
      message,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      callback ?? (() => {}),
      isOutsideDismiss ?? true,
      disableSwal ?? false
    )
  }
}

addScriptData({
  name: 'Hide Annoying Dialog',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Hide annoying message dialogs when disconnecting and reconnecting.',
})
