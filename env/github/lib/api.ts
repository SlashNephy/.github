import { exec } from 'child_process'
import { promisify } from 'util'

import { Octokit } from '@octokit/rest'

import { env } from './env'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type AuthenticatedUser =
  RestEndpointMethodTypes['users']['getAuthenticated']['response']
type ListUserReposResponseData =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]
type ListOwnerReposResponseData =
  RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][0]
type ListOrgReposResponseData =
  RestEndpointMethodTypes['repos']['listForOrg']['response']['data'][0]
export type RepositoryData =
  | ListUserReposResponseData
  | ListOwnerReposResponseData
type ListWebhooksResponseData =
  RestEndpointMethodTypes['repos']['listWebhooks']['response']['data'][0]

export type WebhookEventName =
  | '*'
  | 'branch_protection_rule'
  | 'check_run'
  | 'check_suite'
  | 'code_scanning_alert'
  | 'commit_comment'
  | 'create'
  | 'delete'
  | 'dependabot_alert'
  | 'deploy_key'
  | 'deployment'
  | 'deployment_status'
  | 'discussion'
  | 'discussion_comment'
  | 'fork'
  | 'github_app_authorization'
  | 'gollum'
  | 'installation'
  | 'installation_repositories'
  | 'issue_comment'
  | 'issues'
  | 'label'
  | 'marketplace_purchase'
  | 'member'
  | 'membership'
  | 'merge_group'
  | 'meta'
  | 'milestone'
  | 'organization'
  | 'org_block'
  | 'package'
  | 'page_build'
  | 'ping'
  | 'project'
  | 'project_card'
  | 'project_column'
  | 'projects_v2_item'
  | 'public'
  | 'pull_request'
  | 'pull_request_review'
  | 'pull_request_review_comment'
  | 'pull_request_review_thread'
  | 'push'
  | 'release'
  | 'repository_dispatch'
  | 'repository'
  | 'repository_import'
  | 'repository_vulnerability_alert'
  | 'security_advisory'
  | 'sponsorship'
  | 'star'
  | 'status'
  | 'team'
  | 'team_add'
  | 'watch'
  | 'workflow_dispatch'
  | 'workflow_job'
  | 'workflow_run'

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
})

export const getAuthenticatedUser = async (): Promise<AuthenticatedUser> =>
  octokit.users.getAuthenticated()

export const listUserRepos = async (
  username: string
): Promise<ListUserReposResponseData[]> =>
  octokit.paginate(octokit.repos.listForUser, {
    username,
    per_page: 100,
  })

export const listOwnerRepos = async (): Promise<ListOwnerReposResponseData[]> =>
  octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    affiliation: 'owner',
    per_page: 100,
  })

export const listOrgRepos = async (
  org: string
): Promise<ListOrgReposResponseData[]> =>
  octokit.paginate(octokit.repos.listForOrg, {
    org,
    per_page: 100,
  })

export const listRepoWebhooks = async (
  owner: string,
  repo: string
): Promise<ListWebhooksResponseData[]> => {
  const { data } = await octokit.repos.listWebhooks({
    owner,
    repo,
  })
  return data
}

export const deleteWebhook = async (
  owner: string,
  repo: string,
  id: number
): Promise<void> => {
  const execAsync = promisify(exec)
  await execAsync(
    `curl -s \
            -X DELETE \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: token ${env.GITHUB_TOKEN}" \
            https://api.github.com/repos/${owner}/${repo}/hooks/${id}`
  )

  // FIXME: なぜか octokit が使えないので curl で代用している
  // await octokit.repos.deleteWebhook({
  //   owner: repo.owner.login,
  //   repo: repo.name,
  //   hook_id: webhook.id,
  // })
}

export const createWebhook = async (
  owner: string,
  repo: string,
  url: string,
  events: WebhookEventName[]
): Promise<void> => {
  await octokit.repos.createWebhook({
    owner,
    repo,
    name: 'web',
    active: true,
    events,
    config: {
      url,
      content_type: 'json',
      insecure_ssl: 0,
    },
  })
}

export const archiveRepository = async (
  owner: string,
  repo: string
): Promise<void> => {
  await octokit.repos.update({
    owner,
    repo,
    archived: true,
  })
}

export const unarchiveRepository = async (
  owner: string,
  repo: string
): Promise<void> => {
  await octokit.repos.update({
    owner,
    repo,
    archived: false,
  })
}
