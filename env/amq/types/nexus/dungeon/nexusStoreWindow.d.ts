declare class NexusStoreWindow extends NexusDungeonBaseWindow {
  constructor()
  $nexusStoreArtifactRow: any
  $nexusStoreRuneModRow: any
  $closeButton: any
  shopEntries: any[]
  itemBrought: boolean
  rewardPreview: NexusWindowItemPreview
  endShopSession(): void
  setupContent(artifacts: any, runeMods: any, currentFragmentCount: any, avatarDescriptions: any, maxThree: any): void
  itemBought(shopId: any, fragmentCount: any, avatarName: any, maxThree: any, unlockCount: any): void
  displayShopVote(avatarName: any, shopId: any, voteIcon: any, gamePlayerId: any): void
}
declare class NexusStoreArtifact extends NexusArtifactOptionBase {
  constructor(
    {
      name,
      fileName,
      description,
      shopId,
      price,
      brought,
      avatarName,
    }: {
      name: any
      fileName: any
      description: any
      shopId: any
      price: any
      brought: any
      avatarName: any
    },
    avatarDescriptions: any,
    rewardPreview: any,
    maxThree: any
  )
  $priceText: JQuery<HTMLElement>
  $priceContainer: JQuery<HTMLElement>
  shopId: any
  price: any
  updateState(currentFragmentCount: any): void
  displayBought(avatarName: any): void
}
declare class NexusStoreRuneMod extends NexusOptionBase {
  constructor(
    {
      name,
      fileName,
      description,
      shopId,
      price,
      brought,
    }: {
      name: any
      fileName: any
      description: any
      shopId: any
      price: any
      brought: any
    },
    rewardPreview: any
  )
  $priceText: JQuery<HTMLElement>
  shopId: any
  price: any
  createImgSrc(fileName: any): string
  createImgSrcSet(fileName: any): string
  updateState(currentFragmentCount: any): void
  displayBought(): void
  TEMPLATE: string
}
