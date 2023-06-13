// ==UserScript==
// @name            AMQ Dynamic Background
// @namespace       https://github.com/SlashNephy
// @version         0.3.0
// @author          SlashNephy
// @description     Set the currently playing video surface as the background image.
// @description:ja  現在再生中の動画を背景画像に設定します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%AB%E5%8B%95%E7%94%BB%E3%82%92%E6%B5%81%E3%81%99_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%AB%E5%8B%95%E7%94%BB%E3%82%92%E6%B5%81%E3%81%99_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-dynamic-background.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-dynamic-background.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
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

    onReady(() => {
        const video = document.createElement('video');
        video.id = 'dynamic-background-video';
        video.muted = true;
        video.loop = true;
        const container = document.getElementById('quizPage') ?? document.body;
        container.insertAdjacentElement('afterbegin', video);
        new Listener('answer results', () => {
            const quizPlayer = unsafeWindow.quizVideoController.getCurrentPlayer();
            if (quizPlayer === undefined) {
                return;
            }
            if (quizPlayer.player.isAudio()) {
                return;
            }
            const quizVideo = quizPlayer.$player[0];
            if (video.src !== quizVideo.src) {
                video.src = quizVideo.src;
                video.currentTime = quizVideo.currentTime;
                video.play().catch(console.error);
            }
        }).bindListener();
        AMQ_addStyle(`
    #dynamic-background-video {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  `);
        AMQ_addScriptData({
            name: 'Dynamic Background',
            author: 'SlashNephy &lt;spica@starry.blue&gt;',
            description: 'Set the currently playing video surface as the background image.',
        });
    });

})();
