// ==UserScript==
// @name            Anime Comment Overlay
// @namespace       https://github.com/SlashNephy
// @version         0.2.0
// @author          SlashNephy
// @description     Display overlay of comments on various streaming sites.
// @description:ja  アニメ配信サイト (dアニメストア, ABEMAビデオ) で実況コメをオーバーレイ表示します。
// @homepage        https://scrapbox.io/slashnephy/%E3%82%A2%E3%83%8B%E3%83%A1%E9%85%8D%E4%BF%A1%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E5%AE%9F%E6%B3%81%E3%82%B3%E3%83%A1%E3%82%92%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%A4%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/%E3%82%A2%E3%83%8B%E3%83%A1%E9%85%8D%E4%BF%A1%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E5%AE%9F%E6%B3%81%E3%82%B3%E3%83%A1%E3%82%92%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%A4%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=animestore.docomo.ne.jp
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/anime-comment-overlay.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/anime-comment-overlay.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animestore.docomo.ne.jp/animestore/sc_d_pc?partId=*
// @match           https://abema.tv/video/episode/*
// @require         https://cdn.jsdelivr.net/npm/@xpadev-net/niconicomments@0.2.51/dist/bundle.min.js
// @require         https://cdn.jsdelivr.net/gh/NaturalIntelligence/fast-xml-parser@ecf6016f9b48aec1a921e673158be0773d07283e/lib/fxp.min.js
// @connect         jikkyo.tsukumijima.net
// @connect         api.annict.com
// @connect         raw.githubusercontent.com
// @connect         cal.syoboi.jp
// @connect         animestore.docomo.ne.jp
// @grant           GM_xmlhttpRequest
// @license         MIT license
// ==/UserScript==

(function (NiconiComments, fastXmlParser) {
    'use strict';

    const AnnictSupportedVodChannelIds = {
        bandai: 107,
        niconico: 165,
        dAnime: 241,
        amazonPrimeVideo: 243,
        netflix: 244,
        abemaVideo: 260,
        dAnimeNiconico: 306,
    };
    const ChannelCmAttributes = {
        jk1: null,
        jk2: null,
        jk4: {
            head: 60,
            sponsor: 5,
            normal: 150,
        },
        jk5: {
            head: 60 + 3,
            sponsor: 5,
            normal: 105,
        },
        jk6: {
            head: 0,
            sponsor: 10,
            normal: 135,
        },
        jk7: {
            head: 0,
            sponsor: 10,
            normal: 60,
        },
        jk8: {
            head: 120,
            sponsor: 10,
            normal: 90,
        },
        jk9: {
            head: 0,
            sponsor: 10,
            normal: 60,
        },
        jk101: null,
        jk103: null,
        jk141: {
            head: 15,
            sponsor: 10,
            normal: 60,
        },
        jk151: {
            head: 0,
            sponsor: 10,
            normal: 60,
        },
        jk161: {
            head: 3,
            sponsor: 10,
            normal: 60,
        },
        jk171: {
            head: 0,
            sponsor: 10,
            normal: 60,
        },
        jk181: {
            head: 15,
            sponsor: 5,
            normal: 135,
        },
        jk191: null,
        jk192: null,
        jk193: null,
        jk211: {
            head: 0,
            sponsor: 10,
            normal: 60,
        },
        jk222: {
            head: 10,
            sponsor: 10,
            normal: 150,
        },
        jk236: {
            head: 10,
            sponsor: 10,
            normal: 45,
        },
        jk252: null,
        jk260: {
            head: 2,
            sponsor: 10,
            normal: 120,
        },
        jk263: {
            head: 0,
            sponsor: 10,
            normal: 180,
        },
        jk265: {
            head: 10,
            sponsor: 10,
            normal: 60,
        },
        jk333: null,
    };
    const vposAdjustment = 50;
    const partSymbols = ['A', 'B', 'C'];
    const partSymbolCommentsThreshold = 2;
    const partSymbolAdjustment = 3;
    const opSymbols = ['OP'];
    const opSymbolCommentsThreshold = 2;
    const opLength = 90;
    const opAdjustment = 30;
    const copyrightCmAttributes = [
        {
            pattern: /^&copy;BNP\//,
            adjustment: 3,
        },
    ];
    const maxPrograms = 5;

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
    async function awaitElement(selectors, timeout) {
        return new Promise((resolve, reject) => {
            let timer;
            const interval = window.setInterval(() => {
                const element = document.querySelector(selectors);
                if (element !== null) {
                    clearInterval(interval);
                    clearTimeout(timer);
                    resolve(element);
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
    }

    async function fetchAnnictBroadcastData(branch = 'master') {
        const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/.github/${branch}/env/userscript/bin/collect-vod-data/dist/data.json`);
        return response.json();
    }

    let observer = null;
    const AbemaVideoOverlay = {
        name: 'ABEMAビデオ',
        url: /^https:\/\/abema\.tv\/video\/episode\/([\w-]+)/,
        async initializeContainers() {
            const video = () => {
                const element = document.querySelector('video[preload="metadata"]');
                if (element === null) {
                    throw new Error('video container not found');
                }
                return element;
            };
            const canvas = document.createElement('canvas');
            canvas.width = 1920;
            canvas.height = 1080;
            canvas.style.position = 'relative';
            canvas.style.objectFit = 'contain';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '10';
            const cover = await awaitElement('.com-vod-VODScreen-video-cover');
            cover.appendChild(canvas);
            return { video, canvas };
        },
        async detectMedia(id) {
            const [titleId, episodeId] = id.split('_', 2);
            if (!titleId || !episodeId) {
                throw new Error(`unexpected id format: ${id}`);
            }
            const title = document.querySelector('.com-video-EpisodeTitleBlock__series-info')?.textContent;
            if (!title) {
                throw new Error('title container not found');
            }
            const episode = document.querySelector('.com-video-EpisodeTitleBlock__title')?.textContent;
            if (!episode) {
                throw new Error('episode container not found');
            }
            const [episodeNumber, episodeTitle] = episode.split(' ', 2);
            if (!episodeNumber || !episodeTitle) {
                throw new Error(`unexpected episode format: ${episode}`);
            }
            const broadcasts = await fetchAnnictBroadcastData();
            return {
                platform: 'abema-video',
                work: {
                    title,
                    annictIds: broadcasts
                        .filter((x) => x.channel_id === AnnictSupportedVodChannelIds.abemaVideo && x.vod_code === titleId)
                        .map((x) => x.work_id),
                },
                episode: {
                    title: episodeTitle,
                    number: episodeNumber,
                },
            };
        },
        addEventListener(event, callback) {
            switch (event) {
                case 'mediaChanged': {
                    if (observer !== null) {
                        observer.disconnect();
                        observer = null;
                    }
                    const target = document.querySelector('.com-video-EpisodeTitleBlock__title');
                    if (target === null) {
                        throw new Error('target container not found');
                    }
                    observer = new MutationObserver((mutations) => {
                        for (const mutation of mutations) {
                            if (mutation.type === 'characterData' && mutation.target === target) {
                                callback();
                            }
                        }
                    });
                    observer.observe(target, { characterData: true, subtree: true });
                }
            }
        },
        removeEventListener(event) {
            switch (event) {
                case 'mediaChanged': {
                    observer?.disconnect();
                    observer = null;
                }
            }
        },
    };

    async function fetchDanimePartInfo(partId) {
        const response = await fetch(`https://animestore.docomo.ne.jp/animestore/rest/WS030101?partId=${partId}`);
        return response.json();
    }

    const DanimeOverlay = {
        name: 'dアニメストア',
        url: /^https:\/\/animestore\.docomo\.ne\.jp\/animestore\/sc_d_pc\?partId=(\d+)/,
        async initializeContainers() {
            await awaitFor(() => document.querySelector('video#video') !== null);
            const video = document.querySelector('video#video');
            if (video === null) {
                throw new Error('video container not found');
            }
            const canvas = document.createElement('canvas');
            canvas.width = 1920;
            canvas.height = 1080;
            canvas.style.position = 'relative';
            canvas.style.objectFit = 'contain';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '10';
            video.insertAdjacentElement('afterend', canvas);
            const toggleButton = document.createElement('div');
            toggleButton.classList.add('mainButton');
            const innerButton = document.createElement('button');
            innerButton.classList.add('fullscreenButton');
            toggleButton.appendChild(innerButton);
            document.querySelector('.buttonArea .time')?.insertAdjacentElement('afterend', toggleButton);
            return { video, canvas, toggleButton };
        },
        async detectMedia(partId) {
            const [backInfoTxt1, backInfoTxt2, backInfoTxt3] = [$('.backInfoTxt1'), $('.backInfoTxt2'), $('.backInfoTxt3')];
            await awaitFor(() => backInfoTxt1.length > 0 && backInfoTxt2.length > 0 && backInfoTxt3.length > 0);
            const workId = partId.slice(0, 5);
            const broadcasts = await fetchAnnictBroadcastData();
            const info = await fetchDanimePartInfo(partId);
            return {
                platform: 'danime',
                copyright: info.partCopyright,
                work: {
                    title: backInfoTxt1.text(),
                    annictIds: broadcasts
                        .filter((x) => x.channel_id === AnnictSupportedVodChannelIds.dAnime && x.vod_code === workId)
                        .map((x) => x.work_id),
                },
                episode: {
                    title: backInfoTxt3.text(),
                    number: backInfoTxt2.text(),
                },
            };
        },
        addEventListener(event, callback) {
            switch (event) {
                case 'mediaChanged':
                    $('.backInfoTxt3').on('DOMSubtreeModified propertychange', callback);
            }
        },
        removeEventListener(event, callback) {
            switch (event) {
                case 'mediaChanged':
                    $('.backInfoTxt3').off('DOMSubtreeModified propertychange', callback);
            }
        },
    };

    var dist = {};

    var utils = {};

    var oldJapaneseNumerics$1 = {};

    Object.defineProperty(oldJapaneseNumerics$1, "__esModule", {
      value: true
    });
    const oldJapaneseNumerics = {
      零: '〇',
      壱: '一',
      壹: '一',
      弐: '二',
      弍: '二',
      貳: '二',
      貮: '二',
      参: '三',
      參: '三',
      肆: '四',
      伍: '五',
      陸: '六',
      漆: '七',
      捌: '八',
      玖: '九',
      拾: '十',
      廿: '二十',
      陌: '百',
      佰: '百',
      阡: '千',
      仟: '千',
      萬: '万'
    };
    oldJapaneseNumerics$1.default = oldJapaneseNumerics;

    var japaneseNumerics$1 = {};

    Object.defineProperty(japaneseNumerics$1, "__esModule", {
      value: true
    });
    const japaneseNumerics = {
      〇: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      '０': 0,
      '１': 1,
      '２': 2,
      '３': 3,
      '４': 4,
      '５': 5,
      '６': 6,
      '７': 7,
      '８': 8,
      '９': 9
    };
    japaneseNumerics$1.default = japaneseNumerics;

    (function (exports) {

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.zen2han = exports.n2kan = exports.kan2n = exports.splitLargeNumber = exports.normalize = exports.smallNumbers = exports.largeNumbers = void 0;
      const oldJapaneseNumerics_1 = oldJapaneseNumerics$1;
      const japaneseNumerics_1 = japaneseNumerics$1;
      exports.largeNumbers = {
        '兆': 1000000000000,
        '億': 100000000,
        '万': 10000
      };
      exports.smallNumbers = {
        '千': 1000,
        '百': 100,
        '十': 10
      };
      function normalize(japanese) {
        for (const key in oldJapaneseNumerics_1.default) {
          const reg = new RegExp(key, 'g');
          japanese = japanese.replace(reg, oldJapaneseNumerics_1.default[key]);
        }
        return japanese;
      }
      exports.normalize = normalize;
      /**
       * 漢数字を兆、億、万単位に分割する
       */
      function splitLargeNumber(japanese) {
        let kanji = japanese;
        const numbers = {};
        for (const key in exports.largeNumbers) {
          const reg = new RegExp(`(.+)${key}`);
          const match = kanji.match(reg);
          if (match) {
            numbers[key] = kan2n(match[1]);
            kanji = kanji.replace(match[0], '');
          } else {
            numbers[key] = 0;
          }
        }
        if (kanji) {
          numbers['千'] = kan2n(kanji);
        } else {
          numbers['千'] = 0;
        }
        return numbers;
      }
      exports.splitLargeNumber = splitLargeNumber;
      /**
       * 千単位以下の漢数字を数字に変換する（例: 三千 => 3000）
       *
       * @param japanese
       */
      function kan2n(japanese) {
        if (japanese.match(/^[0-9]+$/)) {
          return Number(japanese);
        }
        let kanji = zen2han(japanese);
        let number = 0;
        for (const key in exports.smallNumbers) {
          const reg = new RegExp(`(.*)${key}`);
          const match = kanji.match(reg);
          if (match) {
            let n = 1;
            if (match[1]) {
              if (match[1].match(/^[0-9]+$/)) {
                n = Number(match[1]);
              } else {
                n = japaneseNumerics_1.default[match[1]];
              }
            }
            number = number + n * exports.smallNumbers[key];
            kanji = kanji.replace(match[0], '');
          }
        }
        if (kanji) {
          if (kanji.match(/^[0-9]+$/)) {
            number = number + Number(kanji);
          } else {
            for (let index = 0; index < kanji.length; index++) {
              const char = kanji[index];
              const digit = kanji.length - index - 1;
              number = number + japaneseNumerics_1.default[char] * 10 ** digit;
            }
          }
        }
        return number;
      }
      exports.kan2n = kan2n;
      /**
       * Converts number less than 10000 to kanji.
       *
       * @param num
       */
      function n2kan(num) {
        const kanjiNumbers = Object.keys(japaneseNumerics_1.default);
        let number = num;
        let kanji = '';
        for (const key in exports.smallNumbers) {
          const n = Math.floor(number / exports.smallNumbers[key]);
          if (n) {
            number = number - n * exports.smallNumbers[key];
            if (1 === n) {
              kanji = `${kanji}${key}`;
            } else {
              kanji = `${kanji}${kanjiNumbers[n]}${key}`;
            }
          }
        }
        if (number) {
          kanji = `${kanji}${kanjiNumbers[number]}`;
        }
        return kanji;
      }
      exports.n2kan = n2kan;
      /**
       * Converts double-width number to number as string.
       *
       * @param num
       */
      function zen2han(str) {
        return str.replace(/[０-９]/g, s => {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
      }
      exports.zen2han = zen2han;
    })(utils);

    Object.defineProperty(dist, "__esModule", {
      value: true
    });
    var findKanjiNumbers_1 = dist.findKanjiNumbers = dist.number2kanji = kanji2number_1 = dist.kanji2number = void 0;
    const utils_1 = utils;
    const japaneseNumerics_1 = japaneseNumerics$1;
    function kanji2number(japanese) {
      japanese = utils_1.normalize(japanese);
      if (japanese.match('〇') || japanese.match(/^[〇一二三四五六七八九]+$/)) {
        for (const key in japaneseNumerics_1.default) {
          const reg = new RegExp(key, 'g');
          japanese = japanese.replace(reg, japaneseNumerics_1.default[key].toString());
        }
        return Number(japanese);
      } else {
        let number = 0;
        const numbers = utils_1.splitLargeNumber(japanese);
        // 万以上の数字を数値に変換
        for (const key in utils_1.largeNumbers) {
          if (numbers[key]) {
            const n = utils_1.largeNumbers[key] * numbers[key];
            number = number + n;
          }
        }
        if (!Number.isInteger(number) || !Number.isInteger(numbers['千'])) {
          throw new TypeError('The attribute of kanji2number() must be a Japanese numeral as integer.');
        }
        // 千以下の数字を足す
        return number + numbers['千'];
      }
    }
    var kanji2number_1 = dist.kanji2number = kanji2number;
    function number2kanji(num) {
      if (!num.toString().match(/^[0-9]+$/)) {
        throw new TypeError('The attribute of number2kanji() must be integer.');
      }
      Object.keys(japaneseNumerics_1.default);
      let number = num;
      let kanji = '';
      // 万以上の数字を漢字に変換
      for (const key in utils_1.largeNumbers) {
        const n = Math.floor(number / utils_1.largeNumbers[key]);
        if (n) {
          number = number - n * utils_1.largeNumbers[key];
          kanji = `${kanji}${utils_1.n2kan(n)}${key}`;
        }
      }
      if (number) {
        kanji = `${kanji}${utils_1.n2kan(number)}`;
      }
      return kanji;
    }
    dist.number2kanji = number2kanji;
    function findKanjiNumbers(text) {
      const num = '([0-9０-９]*)|([〇一二三四五六七八九壱壹弐弍貳貮参參肆伍陸漆捌玖]*)';
      const basePattern = `((${num})(千|阡|仟))?((${num})(百|陌|佰))?((${num})(十|拾))?(${num})?`;
      const pattern = `((${basePattern}兆)?(${basePattern}億)?(${basePattern}(万|萬))?${basePattern})`;
      const regex = new RegExp(pattern, 'g');
      const match = text.match(regex);
      if (match) {
        return match.filter(item => {
          if (!item.match(/^[0-9０-９]+$/) && item.length && '兆' !== item && '億' !== item && '万' !== item && '萬' !== item) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        return [];
      }
    }
    findKanjiNumbers_1 = dist.findKanjiNumbers = findKanjiNumbers;

    /**
     * Checks whether given array's length is equal to given number.
     *
     * @example
     * ```ts
     * hasLength(arr, 1) // equivalent to arr.length === 1
     * ```
     */
    /**
     * Checks whether given array's length is greather than or equal to given number.
     *
     * @example
     * ```ts
     * hasMinLength(arr, 1) // equivalent to arr.length >= 1
     * ```
     */
    function hasMinLength(arr, length) {
      return arr.length >= length;
    }

    async function fetchArmEntries(branch = 'master') {
        const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`);
        return response.json();
    }

    async function fetchSayaDefinitions(branch = 'master') {
        const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/saya-definitions/${branch}/definitions.json`);
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

    async function fetchSyobocalProgLookup(tids) {
        const { responseText } = await executeGmXhr({
            url: `https://cal.syoboi.jp/db.php?Command=ProgLookup&TID=${tids.join(',')}`,
        });
        const parser = new fastXmlParser.XMLParser();
        return parser.parse(responseText);
    }

    async function findPrograms(media) {
        if (media.work.annictIds.length === 0) {
            return [];
        }
        const arm = await fetchArmEntries();
        const syobocalTids = arm
            .filter((e) => e.annict_id !== undefined && media.work.annictIds.includes(e.annict_id))
            .map((e) => e.syobocal_tid)
            .filter((x) => x !== undefined)
            .filter((x, idx, array) => idx === array.indexOf(x));
        console.info(`[anime-comment-overlay] found syobocal tids: ${syobocalTids}`);
        const saya = await fetchSayaDefinitions();
        const programs = await fetchSyobocalProgLookup(syobocalTids);
        const episodeNumber = extractEpisodeNumber(media.episode.number);
        return (programs.ProgLookupResponse?.ProgItems?.ProgItem?.filter((p) => episodeNumber === undefined || p.Count === episodeNumber)
            ?.map((p) => {
            const startedAt = Date.parse(p.StTime) / 1000;
            if (Date.now() / 1000 < startedAt) {
                return;
            }
            const endedAt = Date.parse(p.EdTime) / 1000;
            if (Date.now() / 1000 < endedAt) {
                return;
            }
            const channel = saya.channels.find((c) => c.syobocalId === p.ChID);
            if (channel === undefined) {
                return;
            }
            console.info(`[anime-comment-overlay] found program: ${channel.name} (${p.StTime} ~ ${p.EdTime})`);
            return {
                channel,
                startedAt,
                endedAt,
            };
        })
            ?.filter((x) => x !== undefined)
            ?.sort((a, b) => b.startedAt - a.startedAt) ?? []);
    }
    function extractEpisodeNumber(text) {
        if (text === undefined) {
            return undefined;
        }
        text = text.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248));
        const match = /\d+(\.\d+)?/.exec(text.replace(',', ''));
        if (match && hasMinLength(match, 1)) {
            return parseFloat(match[0]);
        }
        const kanjis = findKanjiNumbers_1(text);
        if (hasMinLength(kanjis, 1)) {
            return kanji2number_1(kanjis[0]);
        }
    }
    async function fetchComments(providers, media, programs) {
        const comments = [];
        const promises = providers.map((p) => programs.map(async (pg) => [p, await p.provide(media, pg)])).flat();
        for (const r of await Promise.allSettled(promises)) {
            switch (r.status) {
                case 'fulfilled': {
                    const [provider, results] = r.value;
                    comments.push(...results.map((c) => ({
                        id: c.id,
                        vpos: c.vpos,
                        content: c.content,
                        date: c.date,
                        date_usec: c.dateUsec,
                        user_id: c.userId,
                        owner: !c.userId,
                        premium: c.isPremium,
                        mail: c.mails,
                        layer: c.layer,
                    })));
                    console.info(`[anime-comment-overlay] fetched ${results.length} comments from ${provider.name}`);
                    break;
                }
                case 'rejected':
                    console.error(`[anime-comment-overlay] failed to comments: ${r.reason}`);
            }
        }
        return comments;
    }

    async function fetchNiconicoJikkyoKakoLog({ channel, startTime, endTime, }) {
        const response = await fetch(`https://jikkyo.tsukumijima.net/api/kakolog/${channel}?starttime=${startTime}&endtime=${endTime}&format=json`);
        return response.json();
    }

    const NiconicoJikkyoKakoLogProvider = {
        name: 'ニコニコ実況過去ログ',
        async provide(media, program) {
            const jkId = program.channel.nicojkId;
            if (jkId === undefined) {
                return [];
            }
            const request = {
                channel: `jk${jkId}`,
                startTime: program.startedAt,
                endTime: program.endedAt,
            };
            const response = await fetchNiconicoJikkyoKakoLog(request);
            const chats = convertChats(response);
            const attr = ChannelCmAttributes[request.channel];
            switch (attr) {
                case undefined:
                    console.info(`[anime-comment-overlay] CM detection for channel ${request.channel} unsupported. Please contribute to this project!`);
                    return [];
                case null:
                    console.info(`[anime-comment-overlay] channel ${request.channel} does not have CM`);
                    break;
                default:
                    console.log(`[anime-comment-overlay] CM attribute for channel ${request.channel}`, attr);
                    processHeadCms(chats, attr.head, request.startTime);
                    for (const symbol of partSymbols) {
                        processIntervalCms(chats, symbol, attr.normal, attr.sponsor);
                    }
            }
            let copyrightAdjustment = 0;
            if (media.platform === 'danime') {
                const attr2 = copyrightCmAttributes.find((a) => a.pattern.test(media.copyright));
                if (attr2 !== undefined) {
                    copyrightAdjustment = attr2.adjustment;
                    console.info(`[anime-comment-overlay] copyright adjustment for ${media.copyright}: ${copyrightAdjustment}`);
                }
            }
            return (chats
                .filter((c) => !c.isDeleted)
                .map((c) => ({
                ...c,
                vpos: Math.max(copyrightAdjustment + (c.date - request.startTime) * 100 + Math.floor(c.dateUsec / 10000) - vposAdjustment, 0),
            })));
        },
    };
    function convertChats(response) {
        if ('error' in response) {
            console.error(`[anime-comment-overlay] received error from niconico jikkyo kako log: ${response.error}`);
            return [];
        }
        const users = [];
        return (response.packet
            .filter(({ chat }) => chat.deleted !== '1' && chat.abone !== '1')
            .map(({ chat }) => {
            const mails = chat.mail ? chat.mail.split(/\s+/g) : [];
            if (chat.content.startsWith('/')) {
                mails.push('invisible');
            }
            let userId = users.indexOf(chat.user_id);
            if (userId < 0) {
                userId = users.length;
                users.push(chat.user_id);
            }
            return {
                providerId: 1,
                id: parseInt(chat.no, 10),
                vpos: 0,
                content: chat.content,
                date: parseInt(chat.date, 10),
                dateUsec: parseInt(chat.date_usec, 10),
                userId,
                isPremium: chat.premium === '1',
                mails,
                layer: -1,
                isDeleted: false,
            };
        }));
    }
    function processHeadCms(comments, headInterval, startTime) {
        if (headInterval === 0) {
            return;
        }
        let removes = 0;
        const cmStartTime = startTime;
        const cmEndTime = startTime + headInterval;
        for (const comment of comments.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
            comment.isDeleted = true;
            removes++;
        }
        console.info(`[anime-comment-overlay] CM part: head (${removes} comments deleted)`);
        let shifts = 0;
        for (const comment of comments.filter((c) => cmEndTime < c.date)) {
            comment.date -= headInterval;
            shifts++;
        }
        console.info(`[anime-comment-overlay] CM part: head (${shifts} comments shifted)`);
    }
    function processIntervalCms(comments, symbol, normalInterval, sponsorInterval) {
        const partComments = comments.filter((c) => c.content === symbol);
        if (!hasMinLength(partComments, partSymbolCommentsThreshold)) {
            return;
        }
        if (partSymbols.indexOf(symbol) === 0) {
            const opComments = comments.filter((c) => opSymbols.includes(c.content));
            if (hasMinLength(opComments, opSymbolCommentsThreshold)) {
                const opStartTime = opComments[0].date;
                const opEndTime = opStartTime + opLength;
                if (opStartTime < partComments[0].date && partComments[0].date < opEndTime + opAdjustment) {
                    console.info(`[anime-comment-overlay] OP part: ${symbol}`);
                    return;
                }
            }
        }
        let removes = 0;
        const effectiveCmLength = normalInterval + (partSymbols.indexOf(symbol) === 0 ? sponsorInterval : 0);
        const cmEndTime = partComments[0].date - partSymbolAdjustment;
        const cmStartTime = cmEndTime - effectiveCmLength;
        for (const comment of comments.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
            comment.isDeleted = true;
            removes++;
        }
        console.info(`[anime-comment-overlay] CM part: ${symbol} (${removes} comments deleted)`);
        let shifts = 0;
        for (const comment of comments.filter((c) => cmEndTime < c.date)) {
            comment.date -= effectiveCmLength;
            shifts++;
        }
        console.info(`[anime-comment-overlay] CM part: ${symbol} (${shifts} comments shifted)`);
    }

    const overlays = [DanimeOverlay, AbemaVideoOverlay];
    const providers = [NiconicoJikkyoKakoLogProvider];
    async function initializeOverlay(overlay, params) {
        const { video, canvas, toggleButton } = await overlay.initializeContainers();
        const media = await overlay.detectMedia(...params);
        console.log('[anime-comment-overlay] media', media);
        const programs = await findPrograms(media);
        console.log('[anime-comment-overlay] programs', programs);
        const renderer = new NiconiComments(canvas, undefined, {
            format: 'empty',
        });
        fetchComments(providers, media, programs.slice(0, maxPrograms))
            .then((comments) => {
            renderer.addComments(...comments);
        })
            .catch(console.error);
        let isHide = false;
        let cachedVideo = null;
        const interval = setInterval(() => {
            if (isHide) {
                return;
            }
            let v;
            if (typeof video === 'function') {
                if (cachedVideo?.isConnected !== true) {
                    cachedVideo = video();
                }
                v = cachedVideo;
            }
            else {
                v = video;
            }
            renderer.drawCanvas(Math.floor(v.currentTime * 100));
        }, 10);
        toggleButton?.addEventListener('click', () => {
            isHide = !isHide;
            if (isHide) {
                renderer.clear();
            }
        });
        function onMediaChanged() {
            overlay.removeEventListener('mediaChanged', onMediaChanged);
            clearInterval(interval);
            renderer.clear();
            initializeOverlay(overlay, params).catch(console.error);
            console.info('[anime-comment-overlay] media changed');
        }
        overlay.addEventListener('mediaChanged', onMediaChanged);
    }
    for (const overlay of overlays) {
        const params = overlay.url.exec(window.location.href)?.slice(1);
        if (params === undefined) {
            continue;
        }
        console.info(`[anime-comment-overlay] initializing ${overlay.name}`);
        initializeOverlay(overlay, params).catch(console.error);
        break;
    }

})(NiconiComments, fxp);
