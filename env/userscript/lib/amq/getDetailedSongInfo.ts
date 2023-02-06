import { LocalizableString } from '../LocalizableString'

const message = new LocalizableString({
  en: 'Detailed Song Info could not be detected, either Detailed Song Info is not installed or this UserScript is loaded before Detailed Song Info.',
  ja: 'Detailed Song Info を検出できませんでした。Detailed Song Info がインストールされていないか、この UserScript が Detailed Song Info よりも先に読み込まれています。',
})

export type DetailedSongInfo = NonNullable<typeof unsafeWindow.detailedSongInfo>

export const getDetailedSongInfo = (): DetailedSongInfo => {
  if (unsafeWindow.detailedSongInfo === undefined) {
    throw message.toError()
  }

  return unsafeWindow.detailedSongInfo
}
