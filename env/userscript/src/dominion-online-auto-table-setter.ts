const updateSettings = () => {
  // 「詳細設定」画面に遷移
  document.querySelector<HTMLButtonElement>('button[ng-click="$ctrl.switchView()"]')?.click()

  // TODO: fix
  // 最大人数を6に
  // document.querySelector("select[ng-model=\"$ctrl.tableRules.maxPlayers\"] option[label=\"6\"]").selected = true;
  // 観戦許可をフレンドのみに
  // document.querySelector("select[ng-model=\"$ctrl.tableRules.allowSpectators\"] option[label=\"フレンドのみ\"]").selected = true;

  // 勝利点を非表示
  document.querySelector<HTMLButtonElement>('input[ng-model="$ctrl.tableRules.useVPCounter"]')?.click()
  // 知っているカードを尊重
  // document.querySelector("input[ng-model=\"$ctrl.tableRules.respectedCardLists[$ctrl.FAMILIAR_CARDS_CARDLIST_ID]\"]").click();
  // 好きカードを尊重
  // document.querySelector("input[ng-model=\"$ctrl.tableRules.respectedCardLists[listId.listId]\"]").click();

  // 「王国カードを選ぶ」画面に遷移
  document.querySelector<HTMLButtonElement>('button[ng-click="$ctrl.showKingdomSelection()"]')?.click()

  // 拡張パックをすべて有効に
  for (const element of document.querySelectorAll<HTMLButtonElement>('input.expansion-checkbox')) {
    element.click()
  }

  // 「植民地」「避難所」を有効化
  for (let i = 0; i < 2; i++) {
    // noinspection CssInvalidHtmlTagReference
    document.querySelector<HTMLButtonElement>('three-valued-button[ng-model="kc.kingdom.colonies"] button')?.click()

    // noinspection CssInvalidHtmlTagReference
    document.querySelector<HTMLButtonElement>('three-valued-button[ng-model="kc.kingdom.shelters"] button')?.click()
  }

  // 「イベント」「ランドマーク」「プロジェクト」「生き方」枠を確保
  for (let i = 0; i < 2; i++) {
    document.querySelector<HTMLButtonElement>('div[ng-click="$ctrl.addNewSlot()"]')?.click()
  }

  // 「不使用」を除外
  for (let i = 0; i < 2; i++) {
    document.querySelector<HTMLButtonElement>('div[ng-if="$ctrl.canBeNothing()"]')?.click()
  }

  // 「生き方」を含める
  for (const element of document.querySelectorAll<HTMLButtonElement>('div.landscape-type-text.type-W')) {
    element.click()
  }

  // 終了
  document.querySelector<HTMLButtonElement>('input[ng-click="kc.close()"]')?.click()

  alert('Table settings applied!')
}

const observe = () => {
  const target = document.querySelector('div.window-container > div')
  if (target === null) {
    setTimeout(observe, 1000)
    return
  }

  let hasUpdated = false
  const observer = new MutationObserver((records) => {
    const r = records[0]

    console.log(r)

    if (r.target instanceof Element && r.target.classList.contains('my-table') && !hasUpdated) {
      updateSettings()
      hasUpdated = true
    } else if (r.target instanceof Element && r.target.classList.contains('new-table') && hasUpdated) {
      hasUpdated = false
    }
  })

  observer.observe(target, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

window.addEventListener('load', observe)
