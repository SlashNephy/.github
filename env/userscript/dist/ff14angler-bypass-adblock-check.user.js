// ==UserScript==
// @name         FF14Angler Bypass AdBlock Check
// @namespace    https://ff14angler.com/
// @version      0.1
// @description  FF14Angler の AdBlock チェックを無効にします。
// @author       SlashNephy <spica@starry.blue>
// @match        https://*.ff14angler.com/*
// @grant        none
// @run-at       document-body
// ==/UserScript==
document.head.className = 'adsbygoogle';
unsafeWindow.$.prototype.remove = () => void 0;
