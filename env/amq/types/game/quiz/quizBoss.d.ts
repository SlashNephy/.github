declare class QuizBoss extends QuizEnemy {
  createSlot(enemyInfo: any): QuizBossSlot
  createTargetIcon(enemyInfo: any): QuizBossTargetIcon
  updatePoseState({ poseId, attack, form }: { poseId: any; attack: any; form: any }): void
  updateState({ attackTimer, poseInfo, defeated }: { attackTimer: any; poseInfo: any; defeated: any }): void
}
