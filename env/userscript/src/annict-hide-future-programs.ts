const main = () => {
  if (!location.href.startsWith('https://annict.com/track')) {
    return
  }

  for (const card of document.querySelectorAll<HTMLDivElement>('div.card.u-card-flat')) {
    const iconElement = card.querySelector('.fa-check-circle')
    if (iconElement) {
      card.style.display = 'none'
      continue
    }

    const dateElement = card.querySelector<HTMLSpanElement>('div.col div[class="small"] span.text-muted')

    // 放送日時が存在しない場合は無視
    if (dateElement === null || dateElement.textContent === null) {
      continue
    }

    const datetime = Date.parse(dateElement.textContent)
    const today = Date.now()

    // 24時間以上後の場合は非表示にする
    if (datetime > today + 24 * 60 * 60 * 1000) {
      card.style.display = 'none'
    }
  }
}

main()

window.addEventListener('turbo:load', () => {
  main()
})
