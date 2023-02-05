// ==UserScript==
// @name            AMQ Auto Continue Login
// @namespace       https://github.com/SlashNephy
// @version         0.1.2
// @author          SlashNephy
// @description     Press the Continue Login button automatically in Login Page.
// @description:ja  ログインページの「Continue Login」ボタンを自動で押下します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%87%AA%E5%8B%95%E3%81%A7_Continue_Login_%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%87%AA%E5%8B%95%E3%81%A7_Continue_Login_%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-auto-continue-login.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-auto-continue-login.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

const isReady = () => unsafeWindow.setupDocumentDone === true

const createInstalledWindow = () => {
  if (!isReady()) return
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
  if (!isReady()) return
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
  if (!isReady()) return
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const element = document.querySelector('#loginFormContainer > div > a')
if (element !== null) {
  element.click()
}
if (isReady()) {
  addScriptData({
    name: 'Auto Continue Login',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Press the Continue Login button automatically in Login Page.',
  })
}
