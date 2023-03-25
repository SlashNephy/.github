declare function AvatarDriveModal(): void
declare class AvatarDriveModal {
  $MODAL: JQuery<HTMLElement>
  $STANDING_LIST: JQuery<HTMLElement>
  $STANDING_CONTAINER: JQuery<HTMLElement>
  $FAQ_CONTAINER: JQuery<HTMLElement>
  $DONATION_CONTAINER: JQuery<HTMLElement>
  $DONATION_BUTTON: JQuery<HTMLElement>
  $DONATION_DESCRIPTION: JQuery<HTMLElement>
  $DONATION_CHOICE_TEXT: JQuery<HTMLElement>
  _$FREE_DONATION_TOGGLE: JQuery<HTMLElement>
  _$FREE_AMOUNT_CONTAINER: JQuery<HTMLElement>
  _$PAYPAL_AMOUNT_CONTAINER: JQuery<HTMLElement>
  _$FREE_DONATION_CHECKBOX: JQuery<HTMLElement>
  STANDING_ENTRY_TEMPLATE: string
  standingListener: Listener
  _patreonChangeListner: void
  setup(backerLevel: any, gotFreeDonation: any): void
  show(showDonation: any): void
  showDonation(): void
  hideDonation(): void
  requestStandings(): void
  showNominatedDonations(): void
  showNewDonations(): void
  showNoneDonations(): void
  toggleFreeDonation(on: any): void
  updateFreeDonationState(backerLevel: any, gotFreeDonation: any): void
  sendFreeDonation(): void
  getDonationInfo(): {
    type: number
    description: string | number | string[]
    avatarSelected: string
    anon: boolean
    value: string | number | string[]
  }
}
declare let avatarDriveModal: AvatarDriveModal
