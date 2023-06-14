// ==UserScript==
// @name            AMQ Display Answer Time 2
// @namespace       https://github.com/SlashNephy
// @version         0.3.0
// @author          SlashNephy
// @description     Display player answer time in seconds.
// @description:ja  プレイヤーの解答時間を秒単位で表示します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%A7%A3%E7%AD%94%E6%99%82%E9%96%93%E3%82%92%E7%A7%92%E5%8D%98%E4%BD%8D%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%A7%A3%E7%AD%94%E6%99%82%E9%96%93%E3%82%92%E7%A7%92%E5%8D%98%E4%BD%8D%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-display-answer-time-2.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-display-answer-time-2.user.js
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

    const isReady = () => unsafeWindow.setupDocumentDone === true;

    class PlayerAnswerTimeManager {
        #songStartTime = 0;
        #playerTimes = [];
        #firstPlayers = [];
        constructor() {
            if (!isReady()) {
                throw new Error('AMQ is not ready.');
            }
            new Listener('play next song', () => {
                this.#songStartTime = Date.now();
                this.#playerTimes = [];
                this.#firstPlayers = [];
            }).bindListener();
            new Listener('player answered', (playerIds) => {
                const time = Date.now() - this.#songStartTime;
                if (this.#firstPlayers.length === 0) {
                    this.#firstPlayers.push(...playerIds);
                }
                for (const id of playerIds) {
                    this.#playerTimes[id] = time;
                }
            }).bindListener();
            new Listener('Join Game', ({ quizState }) => {
                if (quizState.songTimer > 0) {
                    this.#songStartTime = Date.now() - quizState.songTimer * 1000;
                }
            }).bindListener();
        }
        query(playerId) {
            return this.#playerTimes[playerId] ?? null;
        }
        isFirst(playerId) {
            return this.#firstPlayers.includes(playerId);
        }
    }

    onReady(() => {
        const ignoredPlayerIds = [];
        const playerAnswers = new PlayerAnswerTimeManager();
        const formatAnswerTime = (playerId) => {
            const time = playerAnswers.query(playerId);
            if (time === null) {
                return null;
            }
            const isLightning = playerAnswers.isFirst(playerId);
            return `${isLightning ? '⚡ ' : ''}${(time / 1000).toFixed(2)} s`;
        };
        new Listener('Game Starting', ({ players }) => {
            ignoredPlayerIds.splice(0);
            const player = players.find((p) => p.name === unsafeWindow.selfName);
            if (player === undefined) {
                return;
            }
            const { teamNumber } = player;
            if (teamNumber === null) {
                return;
            }
            const teamMates = players.filter((p) => p.teamNumber === teamNumber);
            if (teamMates.length > 1) {
                ignoredPlayerIds.push(...teamMates.map((p) => p.gamePlayerId));
            }
        }).bindListener();
        new Listener('player answered', (event) => {
            for (const playerId of event.filter((id) => !ignoredPlayerIds.includes(id))) {
                const time = formatAnswerTime(playerId);
                if (time !== null) {
                    const player = unsafeWindow.quiz.players[playerId];
                    if (player !== undefined) {
                        player.answer = time;
                    }
                }
            }
        }).bindListener();
        unsafeWindow.quiz._playerAnswerListner = new Listener('player answers', (event) => {
            for (const answer of event.answers) {
                const time = formatAnswerTime(answer.gamePlayerId);
                const text = time !== null ? `${answer.answer} (${time})` : answer.answer;
                const player = unsafeWindow.quiz.players[answer.gamePlayerId];
                if (player !== undefined) {
                    player.answer = text;
                    player.unknownAnswerNumber = answer.answerNumber;
                    player.toggleTeamAnswerSharing(false);
                }
            }
            if (!unsafeWindow.quiz.isSpectator) {
                unsafeWindow.quiz.answerInput?.showSubmitedAnswer();
                unsafeWindow.quiz.answerInput?.resetAnswerState();
            }
            unsafeWindow.quiz.videoTimerBar.updateState(event.progressBarState);
        });
        AMQ_addScriptData({
            name: 'Display Answer Time 2',
            author: 'SlashNephy &lt;spica@starry.blue&gt;',
            description: 'Display player answer time in seconds.',
        });
    });

})();
