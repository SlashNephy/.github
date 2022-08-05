import { exec } from 'child_process'
import { promisify } from 'util'

import { Octokit } from '@octokit/rest'

import { env } from './env'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type ListUserReposResponseData =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]
type ListOrgReposResponseData =
  RestEndpointMethodTypes['repos']['listForOrg']['response']['data'][0]
export type RepositoryData =
  | ListUserReposResponseData
  | ListOrgReposResponseData
type ListWebhooksResponseData =
  RestEndpointMethodTypes['repos']['listWebhooks']['response']['data'][0]

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
})

export const listUserRepos = async (
  username: string
): Promise<ListUserReposResponseData[]> => {
  return await octokit.paginate(octokit.repos.listForUser, {
    username,
    per_page: 100,
  })
}

export const listOrgRepos = async (
  org: string
): Promise<ListOrgReposResponseData[]> => {
  return await octokit.paginate(octokit.repos.listForOrg, {
    org,
    per_page: 100,
  })
}

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
) => {
  const execAsync = promisify(exec)
  await execAsync(
    `curl -s -X DELETE -H "Accept: application/vnd.github+json" -H "Authorization: token ${env.GITHUB_TOKEN}" https://api.github.com/repos/${owner}/${repo}/hooks/${id}`
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
  events: string[]
) => {
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
