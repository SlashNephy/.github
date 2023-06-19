export type DanimePartInfo = {
  workTitle: string
  partDispNumber: string
  partTitle: string
  mainScenePath: string
  partNews: string
  partExp: string
  partStaff: string
  partCast: string
  partMeasure: string
  partCopyright: string
  publicStartDate: string
  publicEndDate: string
  kikanDispFlg: string
  partId: string
  workId: string
  prevPartId: string
  nextPartId: string
  goodsId: string
  viewButtonDispFlg: string
  newFlg: string
  resultCd: string
  workTypeList: string[]
  ageLimitType: string
  movieList: {
    movieTypeCd: string
    movieBitrateCd: string
    movieId: string
  }[]
  reviewTime: string
  viewTerm: string
  dayReviewTime: string
  dayViewTerm: string
  goodsPrice: string
  sabSceneUmuFlg: string
  saleConditionCd: string
}

export async function fetchDanimePartInfo(partId: string): Promise<DanimePartInfo> {
  const response = await fetch(`https://animestore.docomo.ne.jp/animestore/rest/WS030101?partId=${partId}`)
  return response.json()
}
