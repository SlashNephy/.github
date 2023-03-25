declare class QuizCharacter {
  constructor(spriteSheets: any)
  buffs: {}
  disabledAction: {}
  get slotElement(): void
  addBuff({
    name,
    description,
    fileName,
    duration,
    disables,
    debuff,
    currentCharge,
  }: {
    name: any
    description: any
    fileName: any
    duration: any
    disables: any
    debuff: any
    currentCharge: any
  }): void
  updateBuff({ name, duration, charge }: { name: any; duration: any; charge: any }): void
  removeBuff({ name }: { name: any }): void
  removeAllBuffs(): void
  displayDisabledAction(actionName: any, callback: any): void
  displayFlashIcon(src: any, srcset: any, callback: any, $targetImage: any): void
  updateShield(newShieldValue: any): void
  setCloneEffect(cloneTarget: any): void
  removeCloneEffect(): void
  DISABLE_ICON_SIZE: string
}
