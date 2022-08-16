// ==UserScript==
// @name         AMQ Private Session
// @namespace    https://tampermonkey.net/
// @version      0.1.0
// @description  Set invisible status automatically.
// @author       SlashNephy <spica@starry.blue>
// @match        https://animemusicquiz.com/
// @license      MIT license
// @grant        none
// @icon         https://animemusicquiz.com/favicon-32x32.png
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-private-session.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-private-session.user.js
// ==/UserScript==
const INVISIBLE_STATUS = 4;
document.addEventListener('DOMNodeInserted', () => {
    switch (socialTab?.socialStatus?.currentStatus) {
        case INVISIBLE_STATUS:
        case undefined:
            return;
        default:
            socialTab?.socialStatus?.changeSocialStatus(INVISIBLE_STATUS);
    }
});
AMQ_addScriptData({
    name: 'Private Session',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: '<p>Set invisible status automatically.</p>',
});
