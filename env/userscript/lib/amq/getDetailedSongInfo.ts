import { awaitFor } from '../awaitFor'
import { LocalizableString } from '../LocalizableString'

const message = new LocalizableString({
  en: 'Detailed Song Info could not be detected, either Detailed Song Info is not installed or this UserScript is loaded before Detailed Song Info.',
  ja: 'Detailed Song Info を検出できませんでした。Detailed Song Info がインストールされていないか、この UserScript が Detailed Song Info よりも先に読み込まれています。',
})

export type DetailedSongInfo = NonNullable<typeof unsafeWindow.detailedSongInfo>

export const getDetailedSongInfo = async (): Promise<DetailedSongInfo> =>
  awaitFor(() => unsafeWindow.detailedSongInfo !== undefined, 10000)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .then(() => unsafeWindow.detailedSongInfo!)
    .catch(() => {
      throw message.toError()
    })
