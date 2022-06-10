import { readFile } from 'fs/promises'

import { Octokit } from '@octokit/rest'

const token = process.env.GITHUB_TOKEN

if (!token) {
  throw new Error('GITHUB_TOKEN is not set')
}

const octokit = new Octokit({
  auth: token,
})

const listOrgRepos = async (org: string): Promise<[string, string][]> => {
  const repos = await octokit.repos.listForOrg({
    org,
    per_page: 100,
  })

  return repos.data
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => repo.full_name.split('/') as [string, string])
}

const listUserRepos = async (username: string): Promise<[string, string][]> => {
  const repos = await octokit.repos.listForUser({
    username,
    per_page: 100,
  })

  return repos.data
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => repo.full_name.split('/') as [string, string])
}

const main = async () => {
  const content = await readFile('../../renovate.json', 'utf8')
  const encodedContent = Buffer.from(content).toString('base64').trim()

  const repos = await Promise.all([
    listOrgRepos('StarryBlueSky'),
    listUserRepos('SlashNephy'),
  ]).then((result) => result.flat())

  const promises = repos.map(async ([owner, repo]) => {
    console.info(`[${owner}/${repo}] Updating...`)

    let sha: string | undefined = undefined
    try {
      const previousContent = await octokit.repos.getContent({
        owner,
        repo,
        path: 'renovate.json',
      })

      if ('sha' in previousContent.data) {
        sha = previousContent.data?.sha
      }

      if ('content' in previousContent.data) {
        const previousContentData = previousContent.data?.content
          .replace(/\r?\n/g, '')
          .trim()
        if (previousContentData === encodedContent) {
          console.info(
            `[${owner}/${repo}] There is already the latest renovate.config. Skipping...`
          )
          return
        }
      }
    } catch (error) {
      console.error(`[${owner}/${repo}] Error while getting content`, error)
      return
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
    } catch (error) {
      console.error(`[${owner}/${repo}] Failed to update`, error)
    }
  })

  await Promise.all(promises)
}

main().catch(console.error)
