// ==UserScript==
// @name         FF14Angler Bypass AdBlock Check
// @namespace    https://tampermonkey.net/
// @version      0.2.0
// @description  FF14Angler の AdBlock チェックを無効にします。
// @author       SlashNephy <spica@starry.blue>
// @match        https://*.ff14angler.com/*
// @license      MIT license
// @grant        none
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/ff14angler-bypass-adblock-check.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/ff14angler-bypass-adblock-check.user.js
// @run-at       document-body
// ==/UserScript==
document.head.className = 'adsbygoogle';
unsafeWindow.$.prototype.remove = () => void 0;
