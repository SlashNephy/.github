import {
  archiveRepository,
  createWebhook,
  deleteWebhook,
  getAuthenticatedUser,
  listOrgRepos,
  listOwnerRepos,
  listRepoWebhooks,
  listUserRepos,
  unarchiveRepository,
} from '../lib/api'
import { env } from '../lib/env'

import type { RepositoryData } from '../lib/api'

const main = async () => {
  const authenticatedUser = await getAuthenticatedUser()
  const repos: RepositoryData[] = await Promise.all([
    ...env.TARGET_USERS.map(async (user) =>
      user === authenticatedUser.data.login
        ? listOwnerRepos()
        : listUserRepos(user)
    ),
    ...env.TARGET_ORGS.map(async (org) => listOrgRepos(org)),
  ]).then((result) => result.flat())

  const promises = repos.map(async (repo) => {
    const eventsWebhookUrl = env.TARGET_USERS.includes(repo.owner.login)
      ? env.USER_WEBHOOK_URLS[env.TARGET_USERS.indexOf(repo.owner.login)]
      : env.ORG_WEBHOOK_URLS[env.TARGET_ORGS.indexOf(repo.owner.login)]

    let hasEvents = false
    let hasStar = false
    let hasIssue = false
    const oldIds = [] as number[]
    for (const webhook of await listRepoWebhooks(repo.owner.login, repo.name)) {
      if (webhook.config.url === undefined) {
        continue
      }

      if (
        webhook.last_response.code !== null &&
        (webhook.last_response.code < 200 ||
          webhook.last_response.code >= 300) &&
        // Too Many Requests は許可
        webhook.last_response.code !== 429
      ) {
        console.error(
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
          if (env.ALLOWED_OBSOLETE_WEBHOOK_URLS.includes(webhook.config.url)) {
            continue
          }

          console.warn(
            `[${repo.owner.login}/${repo.name}] Found obsolete webhook: ${webhook.config.url}`
          )

          oldIds.push(webhook.id)
      }
    }

    if (repo.permissions?.admin !== true) {
      console.debug(
        `[${repo.owner.login}/${repo.name}] Cannot edit Webhook because you do not have admin privileges. Skipping...`
      )

      return
    }

    const updates: (() => Promise<void>)[] = []
    if (env.DELETE_OLD_WEBHOOK) {
      for (const oldId of oldIds) {
        updates.push(async () => {
          await deleteWebhook(repo.owner.login, repo.name, oldId)
        })

        console.info(
          `[${repo.owner.login}/${repo.name}] Delete webhook: ${oldId}`
        )
      }
    }

    if (!hasEvents) {
      updates.push(async () => {
        await createWebhook(repo.owner.login, repo.name, eventsWebhookUrl, [
          '*',
        ])
      })

      console.info(`[${repo.owner.login}/${repo.name}] Create events webhook`)
    }

    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
    if (!hasStar && env.STAR_WEBHOOK_URL !== undefined) {
      updates.push(async () => {
        await createWebhook(
          repo.owner.login,
          repo.name,
          env.STAR_WEBHOOK_URL ?? '',
          ['watch']
        )
      })

      console.info(`[${repo.owner.login}/${repo.name}] Create star webhook`)
    }

    if (!hasIssue && env.ISSUE_WEBHOOK_URL !== undefined) {
      updates.push(async () => {
        await createWebhook(
          repo.owner.login,
          repo.name,
          env.ISSUE_WEBHOOK_URL ?? '',
          ['issues', 'issue_comment']
        )
      })

      console.info(`[${repo.owner.login}/${repo.name}] Create issue webhook`)
    }

    if (!env.DRY_RUN) {
      if (repo.archived === true) {
        console.debug(
          `[${repo.owner.login}/${repo.name}] This repository is archived. Unarchiving...`
        )

        await unarchiveRepository(repo.owner.login, repo.name)
      }

      for (const updater of updates) {
        // eslint-disable-next-line no-await-in-loop
        await updater()
      }

      if (repo.archived === true) {
        console.debug(
          `[${repo.owner.login}/${repo.name}] This repository is originally archived. Archiving...`
        )

        await archiveRepository(repo.owner.login, repo.name)
      }
    }
  })

  await Promise.all(promises)
}

main().catch(console.error)
