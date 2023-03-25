declare class GuestRegistrationController {
  $noticeContainer: JQuery<HTMLElement>
  $modal: JQuery<HTMLElement>
  $formContainer: JQuery<HTMLElement>
  $verificationContainer: JQuery<HTMLElement>
  $username: JQuery<HTMLElement>
  $password: JQuery<HTMLElement>
  $passwordRepeat: JQuery<HTMLElement>
  $email: JQuery<HTMLElement>
  $country: JQuery<HTMLElement>
  $tos: JQuery<HTMLElement>
  $errorContainer: JQuery<HTMLElement>
  $registerButton: JQuery<HTMLElement>
  $resendEmailButton: JQuery<HTMLElement>
  $validationEmailText: JQuery<HTMLElement>
  $validationEmailInput: JQuery<HTMLElement>
  _guestRegistrationListener: Listener
  _accountVerifiedListener: Listener
  isGuest: boolean
  updateValidationEmail(email: any): void
  setup(isGuest: any): void
  showError(msg: any): void
  sendRegistrationPackage(): void
}
declare var guestRegistrationController: GuestRegistrationController
