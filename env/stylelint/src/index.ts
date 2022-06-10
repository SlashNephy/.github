import type { Config } from 'stylelint'

const config: Config = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-property-sort-order-smacss',
  ],
}

module.exports = config
