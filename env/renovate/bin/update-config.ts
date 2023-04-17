import { readFile } from 'fs/promises'

import { RequestError } from '@octokit/request-error'
import { Octokit } from '@octokit/rest'
import dotenv from 'dotenv'
import deepEqual from 'fast-deep-equal'

dotenv.config()

const { GITHUB_TOKEN } = process.env
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
    .filter((repo) => repo.archived === false && !repo.fork)
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
  const content = await readFile('../../renovate.json', 'utf8')
  const renovateConfig = JSON.parse(content) as unknown
  const encodedContent = Buffer.from(content).toString('base64').trim()

  const repos = await Promise.all([
    listOrgRepos('StarryBlueSky'),
    listOwnerRepos(),
  ]).then((result) => result.flat())

  const promises = repos.map(async ([owner, repo]) => {
    let sha: string | undefined = undefined
    try {
      const previousContent = await octokit.repos.getContent({
        owner,
        repo,
        path: 'renovate.json',
      })

      if ('sha' in previousContent.data) {
        sha = previousContent.data.sha
      }

      if ('content' in previousContent.data) {
        const previousContentData = previousContent.data.content
          .replace(/\r?\n/g, '')
          .trim()
        const decodedContent = Buffer.from(
          previousContentData,
          'base64'
        ).toString()

        if (
          previousContentData === encodedContent ||
          deepEqual(renovateConfig, JSON.parse(decodedContent))
        ) {
          console.info(
            `[${owner}/${repo}] There is already the latest renovate.json. Skipping...`
          )
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
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'renovate.json',
        message: '🔧 chore(renovate): update config',
        content: encodedContent,
        sha,
      })
      console.info(`${owner}/${repo} update done.`)
    } catch (error: unknown) {
      console.error(`[${owner}/${repo}] Failed to update`, error)
    }
  })

  await Promise.all(promises)
}

main().catch(console.error)
