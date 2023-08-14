import { onReady } from '../lib/amq/onReady'
import { fetchAnimeTitles } from '../lib/external/collect-anime-data'

declare class QuizMultipleChoiceAnswerOption {
  public $text: { text(content: string): void }

  public setName(name: { english: string; romaji: string }): void
}

const localizeTitle = (titles: Record<string, string[]>, target: string): string | undefined =>
  Object.entries(titles)
    .find(([k]) => k.toLowerCase() === target.toLowerCase())
    ?.at(1)
    ?.at(0)

onReady(async () => {
  const titles = await fetchAnimeTitles()

  const { setName } = QuizMultipleChoiceAnswerOption.prototype

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
