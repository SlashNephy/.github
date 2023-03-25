declare class NexusCityWorkshopWindow extends NexusCityWindow {
  runeSelector: NexusCityWorkshopRuneSelector
  avatarSelector: NexusCityWorkshopAvatarSelector
  runeSetupTab: NexusCityWorkshopRuneSetupTab
  runeReformaterTab: NexusCityWorkshopRuneReformaterTab
  runes: {}
  _nexusWorkshopBaseInfoListener: Listener
  _runePageUpdateListener: Listener
  _clearRunePageListener: Listener
  _reformatRunesListener: Listener
  _unlockAvatarListener: Listener
  displayRuneSetup(avatarInfo: any): void
}
