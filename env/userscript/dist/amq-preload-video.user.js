// ==UserScript==
// @name         AMQ Preload Video
// @namespace    https://tampermonkey.net/
// @version      0.1.0
// @description  Just enable media preloading. Speed up buffering.
// @author       SlashNephy <spica@starry.blue>
// @match        https://animemusicquiz.com/
// @license      MIT license
// @grant        none
// @icon         https://animemusicquiz.com/favicon-32x32.png
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-preload-video.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-preload-video.user.js
// ==/UserScript==
document.addEventListener('DOMNodeInserted', () => {
    for (const element of document.querySelectorAll('video')) {
        element.preload = 'auto';
    }
});
AMQ_addScriptData({
    name: 'Preload Video',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: '<p>Just enable media preloading. Speed up buffering.</p><p>Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!</p>',
});
