import dotenv from 'dotenv'

type Env = {
  GITHUB_TOKEN: string
  USER_WEBHOOK_URL: string
  ORG_WEBHOOK_URL: string
}

dotenv.config()

export const env = process.env as Env

if (!env.GITHUB_TOKEN || !env.USER_WEBHOOK_URL || !env.ORG_WEBHOOK_URL) {
  throw new Error('Some environment values are not set')
}
