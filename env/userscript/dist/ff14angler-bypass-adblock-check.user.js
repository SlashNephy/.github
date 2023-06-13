// ==UserScript==
// @name            FF14Angler Bypass AdBlocker Check
// @namespace       https://github.com/SlashNephy
// @version         0.2.3
// @author          SlashNephy
// @description     Disable AdBlocker check in FF14Angler.
// @description:ja  FF14Angler の AdBlocker チェックを無効にします。
// @homepage        https://scrapbox.io/slashnephy/%E7%8C%AB%E3%81%AF%E3%81%8A%E8%85%B9%E3%81%8C%E3%81%99%E3%81%84%E3%81%9F%E3%81%AE%E5%BA%83%E5%91%8A%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E6%A4%9C%E7%9F%A5%E3%82%92%E5%9B%9E%E9%81%BF%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/%E7%8C%AB%E3%81%AF%E3%81%8A%E8%85%B9%E3%81%8C%E3%81%99%E3%81%84%E3%81%9F%E3%81%AE%E5%BA%83%E5%91%8A%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E6%A4%9C%E7%9F%A5%E3%82%92%E5%9B%9E%E9%81%BF%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=jp.ff14angler.com
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/ff14angler-bypass-adblock-check.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/ff14angler-bypass-adblock-check.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://*.ff14angler.com/*
// @run-at          document-body
// @grant           none
// @license         MIT license
// ==/UserScript==

(function () {
	'use strict';

	document.head.className = 'adsbygoogle';
	unsafeWindow.$.prototype.remove = () => void 0;

})();
