import { execSync } from 'child_process'

import { Octokit } from '@octokit/rest'
import dotenv from 'dotenv'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type ListReposResponseData =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]
type ListWebhooksResponseData =
  RestEndpointMethodTypes['repos']['listWebhooks']['response']['data'][0]

dotenv.config()

const { GITHUB_TOKEN, WEBHOOK_URL } = process.env
if (!GITHUB_TOKEN || !WEBHOOK_URL) {
  throw new Error('Environment values are not set')
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

const listRepos = async (
  username: string
): Promise<ListReposResponseData[]> => {
  return await octokit.paginate(octokit.repos.listForUser, {
    username,
    per_page: 100,
  })
}

const listRepoWebhooks = async (
  owner: string,
  repo: string
): Promise<ListWebhooksResponseData[]> => {
  const { data } = await octokit.repos.listWebhooks({
    owner,
    repo,
  })
  return data
}

const main = async () => {
  const repos = await listRepos('SlashNephy')
  for (const repo of repos) {
    const webhooks = await listRepoWebhooks(repo.owner.login, repo.name)

    let found = false
    for (const webhook of webhooks) {
      if (webhook.config.url === WEBHOOK_URL) {
        found = true
        continue
      }

      execSync(
        `curl -s -X DELETE -H "Accept: application/vnd.github+json" -H "Authorization: token ${GITHUB_TOKEN}" https://api.github.com/repos/${repo.owner.login}/${repo.name}/hooks/${webhook.id}`
      )
      // FIXME: なぜか octokit が使えないので curl で代用している
      // await octokit.repos.deleteWebhook({
      //   owner: repo.owner.login,
      //   repo: repo.name,
      //   hook_id: webhook.id,
      // })
      console.info(
        `[${repo.owner.login}/${repo.name}] Deleted webhook: ${webhook.config.url}`
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
          url: WEBHOOK_URL,
          content_type: 'json',
          insecure_ssl: '0',
        },
      })
      console.info(`[${repo.owner.login}/${repo.name}] Created webhook`)
    }
  }
}

main().catch(console.error)
