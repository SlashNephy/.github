// ==UserScript==
// @name         Google Remove Redirection Warning
// @namespace    https://tampermonkey.net/
// @version      0.1.1
// @description  Remove redirection warning from https://google.com/url
// @author       SlashNephy <spica@starry.blue>
// @match        https://google.com/url?q=*
// @match        https://www.google.com/url?q=*
// @license      MIT license
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/google-remove-redirection-warning.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/google-remove-redirection-warning.user.js
// ==/UserScript==
const anchor = document.querySelector('body > div > a');
if (anchor) {
    location.href = anchor.href;
}
