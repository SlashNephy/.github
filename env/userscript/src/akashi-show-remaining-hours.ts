document.addEventListener('DOMNodeInserted', () => {
  const b = document.querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(2) > span')
  if (b === null || b.textContent?.includes('(') !== false) {
    return
  }

  const [a1, a2] =
    document
      .querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(1) > span')
      ?.textContent?.trim()
      .split(':') ?? []
  const [b1, b2] = b.textContent.trim().split(':')
  const [c1, c2] =
    document
      .querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(3) > span')
      ?.textContent?.trim()
      .split(':') ?? []

  let h = parseInt(a1) - parseInt(b1) - parseInt(c1)
  let m = parseInt(a2) - parseInt(b2) - parseInt(c2)
  if (m < 0) {
    h -= Math.ceil(-m / 60)
    m = 60 + (m % 60)
  }

  const d = (h + m / 60) / 8
  b.textContent += ` (-${h}:${m} = -${d.toFixed(2)} d)`
})
