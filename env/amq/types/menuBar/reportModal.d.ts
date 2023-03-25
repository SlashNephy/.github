declare function ReportModal(): void
declare class ReportModal {
  _$modal: JQuery<HTMLElement>
  _$nameContainer: JQuery<HTMLElement>
  _$reportTypeSelector: JQuery<HTMLElement>
  _$reportDescription: JQuery<HTMLElement>
  _$submitButton: JQuery<HTMLElement>
  $playerContent: JQuery<HTMLElement>
  $modContent: JQuery<HTMLElement>
  $modButton: JQuery<HTMLElement>
  $modRadioButtons: JQuery<HTMLElement>
  $modReasonMessage: JQuery<HTMLElement>
  targetPlayer: string
  setup(): void
  show(playerName: any): void
  submitReport(): void
  toggleMod(): void
}
declare var reportModal: ReportModal
