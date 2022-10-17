import { isReady } from '../lib/amq/isReady'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

const element = document.querySelector<HTMLAnchorElement>('#loginFormContainer > div > a')
if (element !== null) {
  element.click()
}

if (isReady()) {
  addScriptData({
    name: 'Auto Continue Login',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Press the Continue Login button automatically in Login Page.',
  })
}
