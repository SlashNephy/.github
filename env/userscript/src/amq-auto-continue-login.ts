import { onReady } from '../lib/amq/onReady'
import { awaitFor } from '../lib/awaitFor'

const selector = '#loginFormContainer > div > a'

awaitFor(() => document.querySelector(selector) !== null)
  .then(() => {
    const element = document.querySelector<HTMLAnchorElement>(selector)
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
