import dotenv from 'dotenv'

type Env = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GITHUB_TOKEN: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  USER_WEBHOOK_URL: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ORG_WEBHOOK_URL: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  STAR_WEBHOOK_URL: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ISSUE_WEBHOOK_URL: string
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
