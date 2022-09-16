import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  roots: ['./'],
  testMatch: ['**/*.test.ts', '**/test/**/*.ts'],
  reporters: ['default'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.ts', '!./**/*.test.ts', '!./**/test/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '\\.ts$': 'ts-jest',
  },
}

module.exports = config
