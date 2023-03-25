declare class SocialRewardModal {
  $modal: JQuery<HTMLElement>
  $twitterButton: JQuery<HTMLElement>
  $discordButton: JQuery<HTMLElement>
  $menuBanner: JQuery<HTMLElement>
  twitterClaimed: boolean
  discordClaimed: boolean
  setup(twitterClaimed: any, discordClaimed: any): void
  hideMenuBannerCheck(): void
  setTwitterClaimed(): void
  setDiscordClaimed(): void
  setButtonClaimed($button: any): void
  triggerTwitterClaim(): void
  triggerDiscordClaim(): void
  triggerClaimWindow(url: any): void
}
declare var socialRewardModal: SocialRewardModal
