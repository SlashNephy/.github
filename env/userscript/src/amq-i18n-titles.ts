import { onReady } from '../lib/amq/onReady'
import { executeXhr } from '../lib/api'

declare class QuizMultipleChoiceAnswerOption {
  public $text: { text(content: string): void }

  public setName(name: { english: string; romaji: string }): void
}

const fetchTitles = async (): Promise<Record<string, string[]>> => {
  const { responseText } = await executeXhr({
    url: 'https://raw.githubusercontent.com/SlashNephy/.github/master/env/userscript/bin/collect-anime-data/dist/titles.json',
  })

  return JSON.parse(responseText)
}

const localizeTitle = (titles: Record<string, string[]>, target: string): string | undefined =>
  Object.entries(titles)
    .find(([k]) => k.toLowerCase() === target.toLowerCase())
    ?.at(1)
    ?.at(0)

onReady(async () => {
  const titles = await fetchTitles()

  const { setName } = QuizMultipleChoiceAnswerOption.prototype
  // eslint-disable-next-line func-names
  QuizMultipleChoiceAnswerOption.prototype.setName = function (name) {
    setName.call(this, name)

    const localized = localizeTitle(titles, name.english) ?? localizeTitle(titles, name.romaji)
    if (localized) {
      this.$text.text(localized)
    }
  }

  AMQ_addScriptData({
    name: 'i18n Titles',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display localized anime titles. (Currently support only Japanese.)',
  })
})
