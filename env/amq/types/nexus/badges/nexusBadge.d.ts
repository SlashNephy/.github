declare class NexusBadge {
  constructor(
    level: any,
    {
      avatarId,
      characterId,
      colorId,
    }: {
      avatarId: any
      characterId: any
      colorId: any
    },
    size: any,
    extraClasses?: any[]
  )
  $body: JQuery<HTMLElement>
  $badgeImage: JQuery<HTMLElement>
  $avatarImage: JQuery<HTMLElement>
  characterId: any
  avatarId: any
  level: any
  badgeSrc: string
  completeName: any
  TEMPLATE: string
}
declare class NexusBadgeEmpty extends NexusBadge {
  constructor(size: any, extraClasses: any[], popoverMessage: any, popoverContainerId: any)
  detatch(): void
}
