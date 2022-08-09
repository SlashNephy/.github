// ==UserScript==
// @name         Feedly Auto Refresh
// @namespace    https://tampermonkey.net/
// @version      0.2.1
// @description  Feedly で未読記事がないとき、フィードを自動リフレッシュします。
// @author       SlashNephy <spica@starry.blue>
// @match        https://feedly.com/i/collection/*
// @license      MIT license
// @grant        none
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/feedly-auto-refresh.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/feedly-auto-refresh.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=feedly.com
// ==/UserScript==
setInterval(() => {
    const element = document.querySelector('button.icon-toolbar-refresh-secondary');
    if (!element) {
        return;
    }
    if (element.classList.contains('update-available') && document.querySelector('.empty-state') !== null) {
        element.click();
    }
}, 30000);
