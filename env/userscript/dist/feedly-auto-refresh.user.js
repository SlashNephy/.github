// ==UserScript==
// @name         Feedly Auto Refresh
// @namespace    https://feedly.com/
// @version      0.2.0
// @description  Feedly で未読記事がないとき、フィードを自動リフレッシュします。
// @author       SlashNephy <spica@starry.blue>
// @match        https://feedly.com/i/collection/*
// @grant        none
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
