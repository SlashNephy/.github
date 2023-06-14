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
  if (a1 === undefined || a2 === undefined) {
    return
  }

  const [b1, b2] = b.textContent.trim().split(':')
  if (b1 === undefined || b2 === undefined) {
    return
  }

  const [c1, c2] =
    document
      .querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(3) > span')
      ?.textContent?.trim()
      .split(':') ?? []
  if (c1 === undefined || c2 === undefined) {
    return
  }

  let h = parseInt(a1, 10) - parseInt(b1, 10) - parseInt(c1, 10)
  let m = parseInt(a2, 10) - parseInt(b2, 10) - parseInt(c2, 10)
  if (m < 0) {
    h -= Math.ceil(-m / 60)
    m = 60 + (m % 60)
  }

  const d = (h + m / 60) / 8
  b.textContent += ` (-${h}:${m} = -${d.toFixed(2)} d)`
})
