import { RequestError } from '@octokit/request-error'
import { Octokit } from '@octokit/rest'
import dotenv from 'dotenv'

import renovateConfig from '../../../renovate.json'

dotenv.config()

const { GITHUB_TOKEN, DRY_RUN } = process.env
if (GITHUB_TOKEN === undefined) {
  throw new Error('GITHUB_TOKEN is not set')
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

const listOrgRepos = async (org: string): Promise<[string, string][]> => {
  const repos = await octokit.paginate(octokit.repos.listForOrg, {
    org,
    per_page: 100,
  })

  return repos
    .filter((repo) => repo.archived === false && !repo.fork)
    .map((repo) => repo.full_name.split('/') as [string, string])
}

export const listOwnerRepos = async (): Promise<[string, string][]> => {
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    affiliation: 'owner',
    per_page: 100,
  })

  return repos
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => repo.full_name.split('/') as [string, string])
}

const listUserRepos = async (username: string): Promise<[string, string][]> => {
  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username,
    per_page: 100,
  })

  return repos
    .filter((repo) => repo.archived === false && !repo.fork)
    .map((repo) => repo.full_name.split('/') as [string, string])
}

const main = async () => {
  const repos = await Promise.all([
    listOrgRepos('StarryBlueSky'),
    listOwnerRepos(),
  ]).then((result) => result.flat())

  const promises = repos.map(async ([owner, repo]) => {
    let sha: string | undefined
    try {
      const content = await octokit.repos.getContent({
        owner,
        repo,
        path: 'renovate.json',
      })

      if ('sha' in content.data) {
        sha = content.data.sha
      }

      if ('content' in content.data) {
        const json = Buffer.from(content.data.content, 'base64').toString()
        const repoRenovateConfig = JSON.parse(json)

        if (
          renovateConfig.$schema === repoRenovateConfig.$schema &&
          renovateConfig.extends[0] === repoRenovateConfig.extends[0]
        ) {
          return
        }
      }
    } catch (error: unknown) {
      if (!(error instanceof RequestError) || error.status !== 404) {
        console.error(`[${owner}/${repo}] Error while getting content`, error)

        return
      }
    }

    try {
      if (DRY_RUN !== '1') {
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: 'renovate.json',
          message: '🔧 chore(renovate): update config',
          content: JSON.stringify(renovateConfig),
          sha,
        })
      }

      console.info(`${owner}/${repo} update done.`)
    } catch (error: unknown) {
      console.error(`[${owner}/${repo}] Failed to update`, error)
    }
  })

  await Promise.all(promises)
}

main().catch(console.error)
