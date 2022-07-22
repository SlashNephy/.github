setInterval(() => {
  const element = document.querySelector<HTMLButtonElement>('button.icon-toolbar-refresh-secondary')
  if (!element) {
    return
  }

  if (element.classList.contains('update-available') && document.querySelector('.empty-state') !== null) {
    element.click()
  }
}, 30000)
