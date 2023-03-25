declare class QuizEnemy extends QuizCharacter {
  enemyPosition: any
  hp: any
  shield: any
  maxHp: any
  enemySlot: QuizEnemySlot
  targetIcon: QuizEnemyTargetIcon
  get slotElement(): QuizEnemySlot
  get slot(): any
  createSlot(enemyInfo: any): QuizEnemySlot
  createTargetIcon(enemyInfo: any): QuizEnemyTargetIcon
  initPose(enemyInfo: any): void
  updatePose(): void
  addTargetIcon(icon: any): void
  displayDamage(
    newHp: any,
    newShield: any,
    damage: any,
    damageClasses: any,
    attackEffectSet: any,
    finishedCallback: any,
    displayZero: any
  ): void
  updateState({ attackTimer, poseId, defeated }: { attackTimer: any; poseId: any; defeated: any }): void
  displayDefeated(): void
  setAvatarTarget(avatar: any): void
  updateAttackTimer(timeLeft: any): void
  displayOverlay(src: any, srcet: any): void
  clearOverlay(): void
}
