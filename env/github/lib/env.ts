import dotenv from 'dotenv'

type Env = {
  GITHUB_TOKEN: string
  USER_WEBHOOK_URL: string
  ORG_WEBHOOK_URL: string
  STAR_WEBHOOK_URL: string
  ISSUE_WEBHOOK_URL: string
  DELETE_OLD_WEBHOOK: string
}

const loadConfig = (): Env => {
  dotenv.config()

  const {
    GITHUB_TOKEN,
    USER_WEBHOOK_URL,
    ORG_WEBHOOK_URL,
    STAR_WEBHOOK_URL,
    ISSUE_WEBHOOK_URL,
  } = process.env
  if (
    GITHUB_TOKEN === undefined ||
    USER_WEBHOOK_URL === undefined ||
    ORG_WEBHOOK_URL === undefined ||
    STAR_WEBHOOK_URL === undefined ||
    ISSUE_WEBHOOK_URL === undefined
  ) {
    throw new Error('Some environment values are not set')
  }

  return process.env as Env
}

export const env = loadConfig()
