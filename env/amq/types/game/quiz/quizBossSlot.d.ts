declare class QuizBossSlot extends QuizEnemySlot {
  currentForm: any
  currentAttack: string
  DEFAULT_POSES: string[]
  ATTACK_POSES: string[]
}
declare class QuizBossPoseImage extends QuizEnemyPoseImage {
  constructor(avatarInfo: any, pose: any, imageVh: any, attackName: any, form: any)
  attackName: any
  form: any
}
