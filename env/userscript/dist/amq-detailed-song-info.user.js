// ==UserScript==
// @name            AMQ Detailed Song Info
// @namespace       https://github.com/SlashNephy
// @version         0.1.1
// @author          SlashNephy
// @description     Display detailed information on the side panel of the song.
// @description:ja  曲のサイドパネルに詳細な情報を表示します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%89%E3%83%91%E3%83%8D%E3%83%AB%E3%81%AB%E8%A9%B3%E7%B4%B0%E6%83%85%E5%A0%B1%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%89%E3%83%91%E3%83%8D%E3%83%AB%E3%81%AB%E8%A9%B3%E7%B4%B0%E6%83%85%E5%A0%B1%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-detailed-song-info.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-detailed-song-info.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @grant           none
// @license         MIT license
// ==/UserScript==

const createInstalledWindow = () => {
  if (!window.setupDocumentDone) return
  if ($('#installedModal').length === 0) {
    $('#gameContainer').append(
      $(`
            <div class="modal fade" id="installedModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h2 class="modal-title">Installed Userscripts</h2>
                        </div>
                        <div class="modal-body" style="overflow-y: auto;max-height: calc(100vh - 150px);">
                            <div id="installedContainer">
                                You have the following scripts installed (click on each of them to learn more)<br>
                                This window can also be opened by going to AMQ settings (the gear icon on bottom right) and clicking "Installed Userscripts"
                                <div id="installedListContainer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    )
    $('#mainMenu')
      .prepend(
        $(`
            <div class="button floatingContainer mainMenuButton" id="mpInstalled" data-toggle="modal" data-target="#installedModal">
                <h1>Installed Userscripts</h1>
            </div>
        `)
      )
      .css('margin-top', '20vh')
    $('#optionsContainer > ul').prepend(
      $(`
            <li class="clickAble" data-toggle="modal" data-target="#installedModal">Installed Userscripts</li>
        `)
    )
    addStyle(`
            .descriptionContainer {
                width: 95%;
                margin: auto;
            }
            .descriptionContainer img {
                width: 80%;
                margin: 10px 10%;
            }
        `)
  }
}
const addScriptData = (metadata) => {
  createInstalledWindow()
  $('#installedListContainer').append(
    $('<div></div>')
      .append(
        $('<h4></h4>')
          .html(
            `<i class="fa fa-caret-right"></i> ${metadata.name !== undefined ? metadata.name : 'Unknown'} by ${
              metadata.author !== undefined ? metadata.author : 'Unknown'
            }`
          )
          .css('font-weight', 'bold')
          .css('cursor', 'pointer')
          .click(function () {
            const selector = $(this).next()
            if (selector.is(':visible')) {
              selector.slideUp()
              $(this).find('.fa-caret-down').addClass('fa-caret-right').removeClass('fa-caret-down')
            } else {
              selector.slideDown()
              $(this).find('.fa-caret-right').addClass('fa-caret-down').removeClass('fa-caret-right')
            }
          })
      )
      .append(
        $('<div></div>')
          .addClass('descriptionContainer')
          .html(metadata.description !== undefined ? metadata.description : 'No description provided')
          .hide()
      )
  )
}
const addStyle = (css) => {
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const rows = [
  {
    id: 'difficulty-row',
    title: 'Difficulty',
    content(payload) {
      return `${payload.songInfo.animeDifficulty.toFixed(1)} / 100`
    },
  },
  {
    id: 'vintage-row',
    title: 'Vintage',
    content(payload) {
      return payload.songInfo.vintage
    },
  },
  {
    id: 'format-row',
    title: 'Format',
    content(payload) {
      return payload.songInfo.animeType
    },
  },
  {
    id: 'rating-row',
    title: 'Rating',
    content(payload) {
      return `${payload.songInfo.animeScore.toFixed(2)} / 10`
    },
  },
]
const handle = (payload) => {
  const container = document.querySelector('#qpAnimeContainer div.qpSideContainer:not([id])')
  if (!container) {
    throw new Error('container is not found.')
  }
  for (const row of rows) {
    const element = document.getElementById(row.id) ?? createDivElementWithId(container, row.id)
    const contentElement = element.querySelector('.row-content')
    if (contentElement !== null) {
      contentElement.textContent = row.content(payload)
    } else {
      renderRow(element, row.title, row.content(payload))
    }
  }
}
const createDivElementWithId = (container, id) => {
  const element = document.createElement('div')
  element.id = id
  const hider = container.querySelector('div#qpInfoHider')
  if (hider === null) {
    throw new Error('div#qpInfoHider is not found.')
  }
  if (!hider.classList.contains('custom-hider')) {
    hider.classList.add('custom-hider')
  }
  container.insertBefore(element, hider.previousElementSibling)
  return element
}
const renderRow = (element, title, content) => {
  const h5 = document.createElement('h5')
  const b = document.createElement('b')
  const p = document.createElement('p')
  h5.appendChild(b)
  element.appendChild(h5)
  element.appendChild(p)
  element.classList.add('row')
  b.textContent = title
  p.classList.add('row-content')
  p.textContent = content
}
if ('Listener' in window) {
  const listener = new Listener('answer results', handle)
  listener.bindListener()
}
addScriptData({
  name: 'AMQ Detailed Song Info',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Display detailed information on the side panel of the song.',
})
addStyle(`
.custom-hider {
  padding: 50% 0;
}
`)
