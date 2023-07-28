const main = () => {
  if (!window.location.href.startsWith('https://annict.com/track')) {
    return
  }

  for (const card of document.querySelectorAll<HTMLDivElement>('div.card.u-card-flat')) {
    const iconElement = card.querySelector('.fa-check-circle')
    if (iconElement) {
      card.style.display = 'none'
      continue
    }

    const content = card.querySelector<HTMLSpanElement>('div.col div[class="small"] span.text-muted')?.textContent

    // 放送日時が存在しない場合は無視
    if (!content) {
      continue
    }

    const datetime = Date.parse(content)
    const today = Date.now()

    // 24時間以上後の場合は非表示にする
    if (datetime > today + 24 * 60 * 60 * 1000) {
      card.style.display = 'none'
    }
  }
}

document.addEventListener('turbo:load', () => {
  main()
})
