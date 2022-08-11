// ==UserScript==
// @name         AMQ Result Exporter
// @namespace    https://tampermonkey.net/
// @version      0.1.1
// @description  Export song results to Google Spreadsheet!
// @author       SlashNephy <spica@starry.blue>
// @match        https://animemusicquiz.com/
// @license      MIT license
// @grant        GM_xmlhttpRequest
// @icon         https://animemusicquiz.com/favicon-32x32.png
// @connect      script.google.com
// @connect      raw.githubusercontent.com
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @require      https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// ==/UserScript==
const executeXhr = async (request) => {
    return new Promise((resolve, reject) => {
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
};

const fetchArmEntries = async () => {
    const response = await executeXhr({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/kawaiioverflow/arm/master/arm.json',
    });
    return JSON.parse(response.responseText);
};

const GAS_URL = 'https://script.google.com/macros/s/xxx/exec';
const armEntries = [];
fetchArmEntries()
    .then((entries) => armEntries.push(...entries))
    .catch(console.error);
const executeGas = async (row) => {
    await executeXhr({
        url: GAS_URL,
        method: 'POST',
        data: JSON.stringify(row),
    });
};
const handle = (payload) => {
    const self = Object.values(quiz.players).find((p) => p.isSelf && p._inGame);
    if (!self) {
        return;
    }
    const result = {
        time: Date.now(),
        number: parseInt($('#qpCurrentSongCount').text()),
        game_mode: quiz.gameMode,
        song: {
            name: payload.songInfo.songName,
            anime: {
                answer: {
                    english: payload.songInfo.animeNames.english,
                    romaji: payload.songInfo.animeNames.romaji,
                    alt_answers: [...new Set(payload.songInfo.altAnimeNames.concat(payload.songInfo.altAnimeNamesAnswers))],
                },
                vintage: payload.songInfo.vintage,
                tags: payload.songInfo.animeTags,
                genre: payload.songInfo.animeGenre,
                mal_id: payload.songInfo.siteIds.malId,
                annict_id: armEntries.find((e) => e.mal_id === payload.songInfo.siteIds.malId)?.annict_id,
                type: payload.songInfo.animeType,
                score: payload.songInfo.animeScore,
            },
            artist: payload.songInfo.artist,
            difficulty: payload.songInfo.animeDifficulty.toFixed(1),
            type: payload.songInfo.type === 3
                ? 'Insert Song'
                : payload.songInfo.type === 2
                    ? `Ending ${payload.songInfo.typeNumber}`
                    : `Opening ${payload.songInfo.typeNumber}`,
            file: {
                sample_point: quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].startPoint,
                video_length: parseFloat(quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].$player
                    .find('video')[0]
                    .duration.toFixed(2)),
                video_url: payload.songInfo.urlMap.catbox
                    ? payload.songInfo.urlMap.catbox['720'] || payload.songInfo.urlMap.catbox['480']
                    : payload.songInfo.urlMap.openingsmoe
                        ? payload.songInfo.urlMap.openingsmoe['720'] || payload.songInfo.urlMap.openingsmoe['480']
                        : null,
                audio_url: payload.songInfo.urlMap.catbox
                    ? payload.songInfo.urlMap.catbox['0']
                    : payload.songInfo.urlMap.openingsmoe
                        ? payload.songInfo.urlMap.openingsmoe['0']
                        : null,
            },
        },
        players: {
            count: Object.values(quiz.players).length,
            active_count: Object.values(quiz.players).filter((player) => !player.avatarSlot._disabled).length,
            correct_count: payload.players.filter((player) => player.correct).length,
            items: Object.values(payload.players)
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
                guessTime: amqAnswerTimesUtility.playerTimes[p.gamePlayerId],
                active: !quiz.players[p.gamePlayerId].avatarSlot._disabled,
                position: p.position,
                positionSlot: p.positionSlot,
            })),
        },
    };
    const selfResult = result.players.items.find((p) => p.id === self.gamePlayerId);
    const selfAnswer = selfResult?.answer.replace('...', '').replace(/ \(\d+ms\)$/, '') || '';
    const row = [
        result.time,
        result.number,
        result.game_mode,
        selfResult?.correct ?? false,
        selfAnswer,
        selfResult?.guessTime ?? 0,
        result.song.anime.answer.romaji,
        result.song.anime.answer.english,
        result.song.anime.answer.alt_answers.join('\n'),
        result.song.difficulty,
        result.song.type,
        result.song.anime.vintage,
        result.song.anime.type,
        result.song.anime.score,
        result.song.anime.mal_id,
        result.song.anime.annict_id ?? '',
        result.song.name,
        result.song.artist,
        result.song.anime.genre.join('\n'),
        result.song.anime.tags.join('\n'),
        result.song.file.video_url ?? '',
        result.song.file.audio_url ?? '',
        result.song.file.video_length,
        result.song.file.sample_point,
        result.players.correct_count,
        result.players.active_count,
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
    ];
    executeGas(row).catch(console.error);
};
const listener = new Listener('answer results', handle);
listener.bindListener();
AMQ_addScriptData({
    name: 'Result Exporter',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: '<p>Export song results to Google Spreadsheet!</p>',
});
