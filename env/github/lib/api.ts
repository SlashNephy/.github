import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { env } from './env'

type ListUserReposResponseData =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]
type ListOrgReposResponseData =
  RestEndpointMethodTypes['repos']['listForOrg']['response']['data'][0]
type ListWebhooksResponseData =
  RestEndpointMethodTypes['repos']['listWebhooks']['response']['data'][0]

export const octokit = new Octokit({
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
