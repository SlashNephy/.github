// ==UserScript==
// @name            AMQ Auto Continue Login
// @namespace       https://github.com/SlashNephy
// @version         0.2.0
// @author          SlashNephy
// @description     Press the Continue Login button automatically in Login Page.
// @description:ja  ログインページの「Continue Login」ボタンを自動で押下します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%87%AA%E5%8B%95%E3%81%A7_Continue_Login_%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%87%AA%E5%8B%95%E3%81%A7_Continue_Login_%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-auto-continue-login.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-auto-continue-login.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com
// @match           https://animemusicquiz.com/*
// @require         https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

(function () {
    'use strict';

    const awaitFor = async (predicate, timeout) => new Promise((resolve, reject) => {
        let timer;
        const interval = window.setInterval(() => {
            if (predicate()) {
                clearInterval(interval);
                clearTimeout(timer);
                resolve();
            }
        }, 500);
        if (timeout !== undefined) {
            timer = window.setTimeout(() => {
                clearInterval(interval);
                clearTimeout(timer);
                reject(new Error('timeout'));
            }, timeout);
        }
    });

    const onReady = (callback) => {
        if (document.getElementById('startPage')) {
            return;
        }
        awaitFor(() => document.getElementById('loadingScreen')?.classList.contains('hidden') === true)
            .then(callback)
            .catch(console.error);
    };

    const selector = '#loginFormContainer > div > a';
    awaitFor(() => document.querySelector(selector) !== null)
        .then(() => {
        const element = document.querySelector(selector);
        if (element !== null) {
            element.click();
        }
    })
        .catch(console.error);
    onReady(() => {
        AMQ_addScriptData({
            name: 'Auto Continue Login',
            author: 'SlashNephy &lt;spica@starry.blue&gt;',
            description: 'Press the Continue Login button automatically in Login Page.',
        });
    });

})();
