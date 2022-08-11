// ==UserScript==
// @name         Annict Work Links
// @namespace    https://tampermonkey.net/
// @version      0.2.2
// @description  Annict の作品ページに「しょぼいカレンダー」「MyAnimeList」「AniList」へのリンクを追加します。
// @author       SlashNephy <spica@starry.blue>
// @match        https://annict.com/*
// @license      MIT license
// @grant        GM_xmlhttpRequest
// @icon         https://www.google.com/s2/favicons?sz=64&domain=annict.com
// @connect      raw.githubusercontent.com
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-work-links.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-work-links.user.js
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

const ANNICT_WORK_PAGE_URL_PATTERN = /^https:\/\/annict\.com\/works\/(\d+)/;
let cachedEntries = null;
const main = async () => {
    const match = location.href.match(ANNICT_WORK_PAGE_URL_PATTERN);
    if (!match) {
        return;
    }
    const annictId = parseInt(match[1]);
    if (!annictId) {
        throw new Error('Failed to extract Annict work id');
    }
    const links = document.querySelector('div.c-work-header.pt-3 > div.container > div > div.col.mt-3.mt-sm-0 > ul.list-inline.mb-0');
    if (!links || links.childNodes.length === 0) {
        throw new Error('Failed to find target container');
    }
    const entries = cachedEntries ?? (await fetchArmEntries());
    cachedEntries = entries;
    const entry = entries.find((x) => x.annict_id === annictId);
    if (!entry) {
        console.warn(`arm entry not found: annict_id=${annictId}`);
        return;
    }
    if (entry.syobocal_tid && links.firstChild) {
        const link = links.firstChild.cloneNode(true);
        const a = link.firstChild;
        a.href = `https://cal.syoboi.jp/tid/${entry.syobocal_tid}`;
        a.childNodes[0].textContent = 'しょぼいカレンダー';
        links.appendChild(link);
    }
    if (entry.mal_id && links.firstChild) {
        const link = links.firstChild.cloneNode(true);
        const a = link.firstChild;
        a.href = `https://myanimelist.net/anime/${entry.mal_id}`;
        a.childNodes[0].textContent = 'MyAnimeList';
        links.appendChild(link);
    }
    if (entry.anilist_id && links.firstChild) {
        const link = links.firstChild.cloneNode(true);
        const a = link.firstChild;
        a.href = `https://anilist.co/anime/${entry.anilist_id}`;
        a.childNodes[0].textContent = 'AniList';
        links.appendChild(link);
    }
};
main().catch(console.error);
window.addEventListener('turbo:load', () => {
    main().catch(console.error);
});
