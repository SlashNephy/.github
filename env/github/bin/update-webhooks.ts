import {
  createWebhook,
  deleteWebhook,
  listOrgRepos,
  listRepoWebhooks,
  listUserRepos,
} from '../lib/api'
import { env } from '../lib/env'

import type { RepositoryData } from '../lib/api'

const main = async () => {
  const repos: RepositoryData[] = await Promise.all([
    listUserRepos('SlashNephy'),
    listOrgRepos('StarryBlueSky'),
  ]).then((result) => result.flat())

  const promises = repos.map(async (repo) => {
    if (repo.archived === true) {
      return
    }

    const eventsWebhookUrl =
      repo.owner.login === 'SlashNephy'
        ? env.USER_WEBHOOK_URL
        : env.ORG_WEBHOOK_URL

    let hasEvents = false,
      hasStar = false,
      hasIssue = false
    for (const webhook of await listRepoWebhooks(repo.owner.login, repo.name)) {
      if (
        webhook.last_response.code !== null &&
        (200 < webhook.last_response.code ||
          webhook.last_response.code >= 300) &&
        // Too Many Requests は許可
        webhook.last_response.code !== 429
      ) {
        console.log(
          `[${repo.owner.login}/${repo.name}] This webhook has an error: ${webhook.config.url}`
        )
      }

      switch (webhook.config.url) {
        case eventsWebhookUrl:
          hasEvents = true
          continue
        case env.STAR_WEBHOOK_URL:
          hasStar = true
          continue
        case env.ISSUE_WEBHOOK_URL:
          hasIssue = true
          continue
        default:
          if (env.DELETE_OLD_WEBHOOK === '1') {
            // eslint-disable-next-line no-await-in-loop
            await deleteWebhook(repo.owner.login, repo.name, webhook.id)
            console.info(
              `[${repo.owner.login}/${repo.name}] Deleted webhook: ${webhook.id}`
            )
          }
      }
    }

    if (!hasEvents) {
      await createWebhook(repo.owner.login, repo.name, eventsWebhookUrl, ['*'])
      console.info(`[${repo.owner.login}/${repo.name}] Created events webhook`)
    }

    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
    if (!hasStar) {
      await createWebhook(repo.owner.login, repo.name, env.STAR_WEBHOOK_URL, [
        'star',
        'watch',
      ])
      console.info(`[${repo.owner.login}/${repo.name}] Created star webhook`)
    }

    if (!hasIssue) {
      await createWebhook(repo.owner.login, repo.name, env.ISSUE_WEBHOOK_URL, [
        'issues',
        'issue_comment',
      ])
      console.info(`[${repo.owner.login}/${repo.name}] Created issue webhook`)
    }
  })

  await Promise.all(promises)
}

main().catch(console.error)
