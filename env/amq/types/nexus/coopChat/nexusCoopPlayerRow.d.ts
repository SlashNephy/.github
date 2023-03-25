declare class NexusCoopPlayerRow {
  constructor({ name, host, icon, connected }: { name: any; host: any; icon: any; connected: any })
  $body: JQuery<any>
  $host: JQuery<HTMLElement>
  $image: JQuery<HTMLElement>
  $disconnected: JQuery<HTMLElement>
  $nameContainer: JQuery<HTMLElement>
  $nameTextContainer: JQuery<HTMLElement>
  $profileOption: JQuery<HTMLElement>
  $prmoteOption: JQuery<HTMLElement>
  $kickOption: JQuery<HTMLElement>
  name: any
  updateNameSize(): void
  setHost(): void
  unsetHost(): void
  setDisconnected(): void
  unsetDisconnected(): void
  enableHostOptions(): void
  disableHostOptions(): void
  displayIcon({
    emoteId,
    avatarInfo: {
      avatar: { avatarName, outfitName, colorName, optionName, optionActive },
    },
  }: {
    emoteId: any
    avatarInfo: {
      avatar: {
        avatarName: any
        outfitName: any
        colorName: any
        optionName: any
        optionActive: any
      }
    }
  }): void
  imagePreload: PreloadImage
  remove(): void
  TEMPLATE: string
}
