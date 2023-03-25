declare class QuizAvatarAssetHandler {
  assetMap: {}
  loadAssets(assetNameList: any): void
  getAssetSrcInfo(assetName: any): {
    srcset: any
    src: any
  }
  TARGET_SIZE: string
}
