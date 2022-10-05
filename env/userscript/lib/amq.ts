export const isAmqReady = (): boolean => {
  return unsafeWindow.setupDocumentDone === true
}
