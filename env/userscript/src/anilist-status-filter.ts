const style = document.createElement('style')
document.head.appendChild(style)

const hiddenStatuses: Record<'Watching' | 'Completed' | 'Planning' | 'Paused' | 'Dropped', boolean> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Watching: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Completed: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Planning: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Paused: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Dropped: false,
}

const renderCheckbox = (title: string, onClick: (e: MouseEvent) => void): HTMLElement => {
  const box = document.createElement('div')
  box.classList.add('filter', 'checkbox-wrap')
  box.toggleAttribute('data-v-acf5fe42')
  {
    const wrapper = document.createElement('div')
    wrapper.classList.add('checkbox-wrap')
    wrapper.toggleAttribute('data-v-acf5fe42')
    wrapper.toggleAttribute('data-v-32107ecb')
    wrapper.addEventListener('click', onClick)
    box.appendChild(wrapper)
    {
      const checkbox = document.createElement('div')
      checkbox.classList.add('checkbox')
      checkbox.toggleAttribute('data-v-32107ecb')
      wrapper.appendChild(checkbox)
      {
        const check = document.createElement('div')
        check.classList.add('check')
        check.toggleAttribute('data-v-32107ecb')
        checkbox.appendChild(check)
        // {
        //   const svg = document.createElement('svg')
        //   svg.toggleAttribute('data-v-32107ecb')
        //   svg.ariaHidden = 'true'
        //   svg.setAttribute('focusable', 'false')
        //   svg.setAttribute('data-prefix', 'fas')
        //   svg.setAttribute('data-icon', 'check')
        //   svg.setAttribute('role', 'img')
        //   svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        //   svg.setAttribute('viewBox', '0 0 512 512')
        //   svg.classList.add('svg-inline--fa', 'fa-check', 'fa-w-16')
        //   check.appendChild(svg)
        //   {
        //     const path = document.createElement('path')
        //     path.toggleAttribute('data-v-32107ecb')
        //     path.setAttribute('fill', 'currentColor')
        //     path.setAttribute(
        //       'd',
        //       'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'
        //     )
        //     svg.appendChild(path)
        //   }
        // }
      }
    }
    {
      const label = document.createElement('div')
      label.classList.add('label')
      label.toggleAttribute('data-v-32107ecb')
      label.textContent = title
      wrapper.appendChild(label)
    }
  }

  return box
}

const renderCss = (): string => {
  const statuses = Object.entries(hiddenStatuses)
    .filter(([_, hide]) => hide)
    .map(([key, _]) => key)
  if (statuses.length === 0) {
    return ''
  }

  const selectors = statuses.map((s) => `.media-card:has(> a div[status="${s}"])`).join(',')
  return `${selectors} { display: none; }`
}

const renderFilters = (children: HTMLElement[]): HTMLElement => {
  const filters = document.createElement('div')
  {
    const name = document.createElement('div')
    name.classList.add('name')
    name.toggleAttribute('data-v-84c4e64c')
    name.textContent = 'my status'
    filters.appendChild(name)
  }
  {
    const wrapper = document.createElement('div')
    wrapper.classList.add('filters-wrap', 'checkbox')
    wrapper.toggleAttribute('data-v-acf5fe42')
    wrapper.append(...children)
    filters.appendChild(wrapper)
  }

  return filters
}

const toggleCheckbox = (e: MouseEvent, key: keyof typeof hiddenStatuses): void => {
  hiddenStatuses[key] = !hiddenStatuses[key]
  style.textContent = renderCss()

  const element = e.currentTarget as Element | null
  const check = element?.querySelector<HTMLDivElement>('.check')
  if (check === null || check === undefined) {
    return
  }

  check.style.display = hiddenStatuses[key] ? 'none' : 'initial'
}

const extraFiltersWrap = document.querySelector('.extra-filters-wrap')
if (extraFiltersWrap !== null) {
  extraFiltersWrap.insertAdjacentElement(
    'afterend',
    renderFilters([
      renderCheckbox('Watching', (e) => {
        toggleCheckbox(e, 'Watching')
      }),
      renderCheckbox('Completed', (e) => {
        toggleCheckbox(e, 'Completed')
      }),
      renderCheckbox('Planning', (e) => {
        toggleCheckbox(e, 'Planning')
      }),
      renderCheckbox('Paused', (e) => {
        toggleCheckbox(e, 'Paused')
      }),
      renderCheckbox('Dropped', (e) => {
        toggleCheckbox(e, 'Dropped')
      }),
    ])
  )
}
