import { onReady } from '../lib/amq/onReady'
import { awaitFor } from '../lib/awaitFor'

awaitFor(() => document.getElementById('loginFormContainer') !== null)
  .then(() => {
    const element = document.querySelector<HTMLAnchorElement>('#loginFormContainer > div > a')
    if (element !== null) {
      element.click()
    }
  })
  .catch(console.error)

onReady(() => {
  AMQ_addScriptData({
    name: 'Auto Continue Login',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Press the Continue Login button automatically in Login Page.',
  })
})
