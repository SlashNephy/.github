import dotenv from 'dotenv'
import { z } from 'zod'

const stringToBoolean = (value: string) => {
  switch (value.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    default:
      return false
  }
}

const envSchema = z.object({
  DRY_RUN: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return stringToBoolean(arg)
    }
  }, z.boolean().default(true)),
  GITHUB_TOKEN: z.string(),
  TARGET_USERS: z
    .string()
    .default('')
    .transform((value) => value.split(',')),
  TARGET_ORGS: z
    .string()
    .default('')
    .transform((value) => value.split(',')),
  USER_WEBHOOK_URLS: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg.split(',')
    }
  }, z.array(z.string().url()).default([])),
  ORG_WEBHOOK_URLS: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg.split(',')
    }
  }, z.array(z.string().url()).default([])),
  STAR_WEBHOOK_URL: z.string().url().optional(),
  ISSUE_WEBHOOK_URL: z.string().url().optional(),
  DELETE_OLD_WEBHOOK: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return stringToBoolean(arg)
    }
  }, z.boolean().default(false)),
  ALLOWED_OBSOLETE_WEBHOOK_URLS: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg.split(',')
    }
  }, z.array(z.string().url()).default([])),
})

dotenv.config()
export const env = envSchema.parse(process.env)
