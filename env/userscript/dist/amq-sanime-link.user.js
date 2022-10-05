// ==UserScript==
// @name            AMQ sanime Link
// @namespace       https://github.com/SlashNephy
// @version         0.1.3
// @author          SlashNephy
// @description     Display links to sanime and "i(lyl)2m" in the player list.
// @description:ja  プレイヤーリストに sanime や "i(lyl)2m" へのリンクを表示します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7_sanime_%E3%82%84_i(lyl)2m_%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7_sanime_%E3%82%84_i(lyl)2m_%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-sanime-link.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-sanime-link.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

const isAmqReady = () => {
  return unsafeWindow.setupDocumentDone === true
}

const createInstalledWindow = () => {
  if (!isAmqReady()) return
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
  if (!isAmqReady()) return
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
  if (!isAmqReady()) return
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const links = [
  {
    id: 'sanime-link',
    title: 'sanime',
    target: '_blank',
    href(lists) {
      const users = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }
        switch (list.type) {
          case 1:
            users.push(`anilist:${list.username.toLowerCase()}`)
            break
        }
      }
      if (users.length === 0) {
        return null
      }
      return `https://sanime.rinsuki.net/show?users=${users.join(',')}`
    },
  },
  {
    id: 'sanime2-link',
    title: 'sanime2',
    target: '_blank',
    href(lists) {
      const users = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }
        switch (list.type) {
          case 1:
            users.push(`anilist%3A${list.username.toLowerCase()}`)
            break
        }
      }
      if (users.length === 0) {
        return null
      }
      return `https://sanime.sno2wman.net/?users=${users.join('%2C')}`
    },
  },
  {
    id: 'illyyllm-link',
    title: 'illyyllm',
    target: '_blank',
    href(lists) {
      const users = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }
        switch (list.type) {
          case 1:
            users.push(list.username)
            break
        }
      }
      if (users.length === 0) {
        return null
      }
      return `https://i-love-love-you-you-love-love-me.vercel.app/?anilist=${users.join(',')}`
    },
  },
]
const handle = (playerNames) => {
  if (playerNames.length > 20) {
    return
  }
  const container = getOrCreateLinkContainer('anime-list-links')
  fetchPlayerAnimeLists(playerNames)
    .then((animeLists) => {
      renderLinks(
        container,
        links
          .map((link) => ({
            ...link,
            href: link.href(animeLists),
          }))
          .filter((x) => x.href !== null)
      )
    })
    .catch(console.error)
}
const handleGameStarting = (event) => {
  const playerNames = event.players.map((p) => p.name)
  handle(playerNames)
}
const handleAnswerResults = () => {
  const playerNames = Object.values(unsafeWindow.quiz.players).map((p) => p._name)
  handle(playerNames)
}
const cache = {
  playerNames: [],
  lists: [],
}
const fetchPlayerAnimeLists = async (playerNames) => {
  return new Promise((resolve) => {
    if (contentEquals(cache.playerNames, playerNames)) {
      resolve(cache.lists)
      return
    }
    const lists = []
    const listener = new Listener('player profile', (event) => {
      lists.push({
        type: event.list.listId,
        username: event.list.listUser,
      })
      if (lists.length === playerNames.length) {
        listener.unbindListener()
        cache.playerNames = playerNames
        cache.lists = lists
        resolve(lists)
        return
      }
    })
    listener.bindListener()
    for (const playerName of playerNames) {
      unsafeWindow.socket.sendCommand({
        type: 'social',
        command: 'player profile',
        data: {
          name: playerName,
        },
      })
    }
  })
}
const contentEquals = (a, b) => {
  const setA = new Set(a)
  const setB = new Set(b)
  return setA.size === setB.size && a.every((x) => setB.has(x))
}
const getOrCreateLinkContainer = (id) => {
  const existing = document.getElementById(id)
  if (existing !== null) {
    while (existing.lastElementChild !== null) {
      existing.removeChild(existing.lastElementChild)
    }
    return existing
  }
  const element = document.createElement('div')
  element.id = id
  const container = document.getElementById('qpStandingItemContainer')
  if (container === null) {
    throw new Error('#qpStandingItemContainer is not found.')
  }
  const target = container.querySelector('div#qpScoreBoardEntryContainer')
  if (target === null) {
    throw new Error('div#qpScoreBoardEntryContainer is not found.')
  }
  container.insertBefore(element, target.nextElementSibling)
  return element
}
const renderLinks = (element, links) => {
  const b = document.createElement('b')
  element.append(b)
  const lastIndex = links.length - 1
  for (const [index, link] of links.entries()) {
    const a = document.createElement('a')
    b.append(a)
    a.href = link.href
    a.textContent = link.title
    if (link.target !== undefined) {
      a.target = link.target
    }
    if (index !== lastIndex) {
      b.append(' - ')
    }
  }
}
if (isAmqReady()) {
  new Listener('Game Starting', handleGameStarting).bindListener()
  new Listener('answer results', handleAnswerResults).bindListener()
  addScriptData({
    name: 'sanime Link',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display links to sanime and "i(lyl)2m" in the player list.',
  })
}
