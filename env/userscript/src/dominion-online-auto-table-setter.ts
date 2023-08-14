const applySettings = () => {
  // 設定をリセット
  document.querySelector<HTMLButtonElement>('div.clear-button')?.click()

  // イベント枠を増やす
  for (let i = 0; i < 2; i++) {
    document.querySelector<HTMLDivElement>('div.table-kingdom-landscape.add-landscape')?.click()
  }

  // 必ずイベント枠を追加する
  for (const element of document.querySelectorAll<HTMLDivElement>('div.landscape-selector-none')) {
    element.click()
  }

  // 植民地を有効にする
  document.querySelector<HTMLDivElement>('div#colony-selector')?.click()

  // 避難所を有効にする
  document.querySelector<HTMLDivElement>('div#shelter-selector')?.click()

  // 勝利点を非表示にする
  document
    .querySelector<HTMLDivElement>('div.game-options div.table-toggle-container:nth-child(3) > div.switch-button')
    ?.click()

  alert('Table settings applied!')
}

const observe = () => {
  const target = document.querySelector('div.window-container > div')
  if (target === null) {
    setTimeout(observe, 1000)
    return
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      // Element ではない
      if (!(record.target instanceof Element)) {
        continue
      }

      // 既に更新されている
      if (record.oldValue?.split(/\s/).some((x) => x === 'my-table') === true) {
        continue
      }

      if (record.target.classList.contains('my-table')) {
        applySettings()
      }
    }
  })

  observer.observe(target, {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true,
  })
}

observe()
