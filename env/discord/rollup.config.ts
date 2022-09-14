import { buildOptions } from './lib/bd'

import type { RollupOptions } from 'rollup'

const config: RollupOptions[] = [
  buildOptions({
    id: 'DiscordExperimentalSettings',
    name: 'Discord Experimental Settings',
    version: '0.1.1',
    description: 'Enable hidden Discord Experimental Settings.',
    author: {
      name: 'SlashNephy',
      id: 187577389419724800,
    },
  }),
]

export default config
