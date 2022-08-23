import type {
  TextlintFilterRuleOptions,
  TextlintPluginOptions,
  TextlintRuleOptions,
} from '@textlint/types'

export type TextlintConfig = {
  rules?: Record<string, boolean | TextlintRuleOptions>
  filters?: Record<string, TextlintFilterRuleOptions>
  plugins?: Record<string, TextlintPluginOptions>
}
