const anchor = document.querySelector<HTMLAnchorElement>('body > div > a')
if (anchor) {
  location.href = anchor.href
}
