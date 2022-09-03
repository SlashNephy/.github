const anchor = document.querySelector<HTMLAnchorElement>('body > div > a')
if (anchor) {
  // eslint-disable-next-line xss/no-location-href-assign
  location.href = anchor.href
}
