declare function AvatarDrive(): void
declare class AvatarDrive {
  top5Nominations: any[]
  top5AllTime: any[]
  top5Monthly: any[]
  top5Weekly: any[]
  recentDonations: any[]
  totalDonations: number
  DRIVE_GOAL: number
  TOP_TAB_STATES: {
    WEEKLY: number
    MONTLY: number
    ALL_TIME: number
  }
  topTabCurrentState: number
  STANDING_ENTRIES: JQuery<HTMLElement>[]
  TOP_ENTIRES: JQuery<HTMLElement>[]
  RECENT_ENTIRES: JQuery<HTMLElement>[]
  $TOP_TABS: JQuery<HTMLElement>
  $ALL_TIME_TAB: JQuery<HTMLElement>
  $MONTHLY_TAB: JQuery<HTMLElement>
  $WEEKLY_TAB: JQuery<HTMLElement>
  $PROGRESS_BAR: JQuery<HTMLElement>
  $TOTAL_TEXT: JQuery<HTMLElement>
  $GOAL_TEXT: JQuery<HTMLElement>
  _$FREE_DONATION_HIGHLIGHT: JQuery<HTMLElement>
  newDonationListener: void
  newAvatarListener: void
  setup(
    top5Nominations: any,
    top5AllTime: any,
    top5Monthly: any,
    top5Weekly: any,
    recentDonations: any,
    total: any,
    gotFreeDonation: any
  ): void
  updateTop5Nominations(): void
  updateTop5AllTime(): void
  updateTop5Monthly(): void
  updateTop5Weekly(): void
  updateTop5Donators(list: any): void
  updateRecent(): void
  updateBar(): void
  updateAll(): void
  clearTopTab(): void
  formatValue(value: any): string
  showModal(showDonationTab: any): void
}
declare var avatarDrive: AvatarDrive
