// ==UserScript==
// @name            AMQ Result Exporter
// @namespace       https://github.com/SlashNephy
// @version         0.5.0
// @author          SlashNephy
// @description     Export song results to your Google Spreadsheet!
// @description:ja  Google スプレッドシートに AMQ のリザルト (正誤、タイトル、難易度...) を送信します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AA%E3%82%B6%E3%83%AB%E3%83%88%E3%82%92_Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AA%E3%82%B6%E3%83%AB%E3%83%88%E3%82%92_Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @require         https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js
// @connect         script.google.com
// @connect         raw.githubusercontent.com
// @grant           GM_xmlhttpRequest
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

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
        timer = setTimeout(() => {
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
        return playerId in this.#playerTimes ? this.#playerTimes[playerId] : null;
    }
    isFirst(playerId) {
        return this.#firstPlayers.includes(playerId);
    }
}

async function fetchArmEntries(branch = 'master') {
    const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`);
    return response.json();
}

const executeGmXhr = async (request) => new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
        ...request,
        onload: (response) => {
            resolve(response);
        },
        onerror: (error) => {
            reject(error);
        },
    });
});

class GM_Value {
    key;
    defaultValue;
    constructor(key, defaultValue, initialize = true) {
        this.key = key;
        this.defaultValue = defaultValue;
        const value = GM_getValue(key, null);
        if (initialize && value === null) {
            GM_setValue(key, defaultValue);
        }
    }
    get() {
        return GM_getValue(this.key, this.defaultValue);
    }
    set(value) {
        GM_setValue(this.key, value);
    }
    delete() {
        GM_deleteValue(this.key);
    }
    pop() {
        const value = this.get();
        this.delete();
        return value;
    }
}

const gasUrl = new GM_Value('GAS_URL', '');
const dryRun = new GM_Value('DRY_RUN', false);
const armEntries = [];
const executeGas = async (row) => {
    const url = gasUrl.get();
    if (url === '') {
        throw new Error('Please set GAS_URL from the Storage tab in Tampermonkey dashboard.');
    }
    if (dryRun.get()) {
        return;
    }
    await executeGmXhr({
        url,
        method: 'POST',
        data: JSON.stringify(row),
        headers: {
            'User-Agent': 'amq-result-exporter (+https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js)',
            'Content-Type': 'application/json',
        },
    });
};
onReady(() => {
    fetchArmEntries()
        .then((entries) => armEntries.push(...entries))
        .catch(console.error);
    const playerAnswerTimes = new PlayerAnswerTimeManager();
    new Listener('answer results', (event) => {
        const { quiz, quizVideoController } = unsafeWindow;
        const self = Object.values(quiz.players).find((p) => p.isSelf && p._inGame);
        if (!self) {
            return;
        }
        const result = {
            time: Date.now(),
            number: parseInt($('#qpCurrentSongCount').text(), 10),
            gameMode: quiz.gameMode,
            song: {
                name: event.songInfo.songName,
                anime: {
                    answer: {
                        english: event.songInfo.animeNames.english,
                        romaji: event.songInfo.animeNames.romaji,
                        altAnswers: [...new Set(event.songInfo.altAnimeNames.concat(event.songInfo.altAnimeNamesAnswers))],
                    },
                    vintage: event.songInfo.vintage,
                    tags: event.songInfo.animeTags,
                    genre: event.songInfo.animeGenre,
                    malId: event.songInfo.siteIds.malId,
                    aniListId: event.songInfo.siteIds.aniListId,
                    annictId: armEntries.find((e) => e.mal_id === event.songInfo.siteIds.malId)?.annict_id,
                    type: event.songInfo.animeType,
                    score: event.songInfo.animeScore,
                },
                artist: event.songInfo.artist,
                difficulty: event.songInfo.animeDifficulty.toFixed(1),
                type: event.songInfo.type === 3
                    ? 'Insert Song'
                    : event.songInfo.type === 2
                        ? `Ending ${event.songInfo.typeNumber}`
                        : `Opening ${event.songInfo.typeNumber}`,
                file: {
                    samplePoint: quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].startPoint,
                    videoLength: parseFloat(quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].$player[0].duration.toFixed(2)),
                    videoUrl: event.songInfo.urlMap.catbox
                        ? event.songInfo.urlMap.catbox['720'] ?? event.songInfo.urlMap.catbox['480']
                        : event.songInfo.urlMap.openingsmoe
                            ? event.songInfo.urlMap.openingsmoe['720'] ?? event.songInfo.urlMap.openingsmoe['480']
                            : null,
                    audioUrl: event.songInfo.urlMap.catbox
                        ? event.songInfo.urlMap.catbox['0']
                        : event.songInfo.urlMap.openingsmoe
                            ? event.songInfo.urlMap.openingsmoe['0']
                            : null,
                },
            },
            players: {
                count: Object.values(quiz.players).length,
                activeCount: Object.values(quiz.players).filter((player) => !player.avatarSlot._disabled).length,
                correctCount: event.players.filter((player) => player.correct).length,
                items: Object.values(event.players)
                    .sort((a, b) => {
                    if (a.answerNumber !== undefined && b.answerNumber !== undefined) {
                        return a.answerNumber - b.answerNumber;
                    }
                    const p1name = quiz.players[a.gamePlayerId]._name;
                    const p2name = quiz.players[b.gamePlayerId]._name;
                    return p1name.localeCompare(p2name);
                })
                    .map((p) => ({
                    status: p.listStatus,
                    id: p.gamePlayerId,
                    name: quiz.players[p.gamePlayerId]._name,
                    score: p.score,
                    correctGuesses: quiz.gameMode !== 'Standard' && quiz.gameMode !== 'Ranked' ? p.correctGuesses : p.score,
                    correct: p.correct,
                    answer: quiz.players[p.gamePlayerId].avatarSlot.$answerContainerText.text(),
                    guessTime: playerAnswerTimes.query(p.gamePlayerId),
                    active: !quiz.players[p.gamePlayerId].avatarSlot._disabled,
                    position: p.position,
                    positionSlot: p.positionSlot,
                })),
            },
        };
        const selfResult = result.players.items.find((p) => p.id === self.gamePlayerId);
        const selfAnswer = selfResult?.answer.replace('...', '').replace(/ \(\d+ms\)$/, '') ?? '';
        const row = [
            result.time,
            result.number,
            result.gameMode,
            selfResult?.correct ?? false,
            selfAnswer,
            selfResult?.guessTime ?? 0,
            result.song.anime.answer.romaji,
            result.song.anime.answer.english,
            result.song.anime.answer.altAnswers.join('\n'),
            result.song.difficulty,
            result.song.type,
            result.song.anime.vintage,
            result.song.anime.type,
            result.song.anime.score,
            result.song.anime.malId,
            result.song.anime.annictId ?? '',
            result.song.name,
            result.song.artist,
            result.song.anime.genre.join('\n'),
            result.song.anime.tags.join('\n'),
            result.song.file.videoUrl ?? '',
            result.song.file.audioUrl ?? '',
            result.song.file.videoLength,
            result.song.file.samplePoint,
            result.players.correctCount,
            result.players.activeCount,
            result.players.items
                .filter((p) => p.correct)
                .map((p) => p.name)
                .join('\n'),
            result.players.items.map((p) => p.name).join('\n'),
            selfResult?.status ?? 0,
            result.players.items
                .filter((p) => p.status)
                .map((p) => p.name)
                .join('\n'),
            result.song.anime.aniListId,
        ];
        executeGas(row).catch(console.error);
    }).bindListener();
    AMQ_addScriptData({
        name: 'Result Exporter',
        author: 'SlashNephy &lt;spica@starry.blue&gt;',
        description: 'Export song results to Google Spreadsheet!',
    });
});
