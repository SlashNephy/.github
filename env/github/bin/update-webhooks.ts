import { execSync } from 'child_process'

import { env } from '../lib/env'
import {
  listOrgRepos,
  listRepoWebhooks,
  listUserRepos,
  octokit,
} from '../lib/api'

const main = async () => {
  const repos = await Promise.all([
    listUserRepos('SlashNephy'),
    listOrgRepos('StarryBlueSky'),
  ]).then((result) => result.flat())

  for (const repo of repos) {
    const webhooks = await listRepoWebhooks(repo.owner.login, repo.name)

    let webhookUrl: string
    if (repo.owner.login === 'SlashNephy') {
      webhookUrl = env.USER_WEBHOOK_URL
    } else {
      webhookUrl = env.ORG_WEBHOOK_URL
    }

    let found = false
    for (const webhook of webhooks) {
      if (webhook.config.url === webhookUrl) {
        found = true
        continue
      }

      execSync(
        `curl -s -X DELETE -H "Accept: application/vnd.github+json" -H "Authorization: token ${env.GITHUB_TOKEN}" https://api.github.com/repos/${repo.owner.login}/${repo.name}/hooks/${webhook.id}`
      )
      // FIXME: なぜか octokit が使えないので curl で代用している
      // await octokit.repos.deleteWebhook({
      //   owner: repo.owner.login,
      //   repo: repo.name,
      //   hook_id: webhook.id,
      // })

      console.info(
        `[${repo.owner.login}/${repo.name}] Deleted webhook: ${webhook.id}`
      )
    }

    if (!found && !repo.archived) {
      await octokit.repos.createWebhook({
        owner: repo.owner.login,
        repo: repo.name,
        name: 'web',
        active: true,
        events: ['*'],
        config: {
          url: webhookUrl,
          content_type: 'json',
          insecure_ssl: '0',
        },
      })

      console.info(`[${repo.owner.login}/${repo.name}] Created webhook`)
    }
  }
}

main().catch(console.error)
