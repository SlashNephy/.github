// ==UserScript==
// @name            Annict Work Links
// @namespace       https://github.com/SlashNephy
// @version         0.3.1
// @author          SlashNephy
// @description     Add links to "Shoboi Calendar", "MyAnimeList" and "AniList" on Annict works page.
// @description:ja  Annict の作品ページに「しょぼいカレンダー」「MyAnimeList」「AniList」へのリンクを追加します。
// @homepage        https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E5%90%84%E7%A8%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E5%90%84%E7%A8%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=annict.com
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-work-links.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-work-links.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://annict.com/*
// @connect         raw.githubusercontent.com
// @grant           GM_xmlhttpRequest
// @license         MIT license
// ==/UserScript==

(function () {
    'use strict';

    async function fetchArmEntries(branch = 'master') {
        const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`);
        return response.json();
    }

    const annictWorkPageUrlPattern = /^https:\/\/annict\.com\/works\/(\d+)/;
    const cachedEntries = [];
    const main = async () => {
        const match = annictWorkPageUrlPattern.exec(window.location.href);
        if (!match) {
            return;
        }
        const annictId = parseInt(match[1], 10);
        if (!annictId) {
            throw new Error('Failed to extract Annict work id');
        }
        const links = document.querySelector('div.c-work-header.pt-3 > div.container > div > div.col.mt-3.mt-sm-0 > ul.list-inline.mb-0');
        if (!links || links.childNodes.length === 0) {
            throw new Error('Failed to find target container');
        }
        if (cachedEntries.length === 0) {
            const entries = await fetchArmEntries();
            cachedEntries.push(...entries);
        }
        const entry = cachedEntries.find((x) => x.annict_id === annictId);
        if (!entry) {
            console.warn(`arm entry not found: annict_id=${annictId}`);
            return;
        }
        if (entry.syobocal_tid !== undefined && links.firstChild) {
            const link = links.firstChild.cloneNode(true);
            const aHtml = link.firstChild;
            aHtml.href = `https://cal.syoboi.jp/tid/${entry.syobocal_tid}`;
            aHtml.childNodes[0].textContent = 'しょぼいカレンダー';
            links.appendChild(link);
        }
        if (entry.anilist_id !== undefined && links.firstChild) {
            const link = links.firstChild.cloneNode(true);
            const aHtml = link.firstChild;
            aHtml.href = `https://anilist.co/anime/${entry.anilist_id}`;
            aHtml.childNodes[0].textContent = 'AniList';
            links.appendChild(link);
        }
        if (entry.mal_id !== undefined && links.firstChild) {
            const link = links.firstChild.cloneNode(true);
            const aHtml = link.firstChild;
            aHtml.href = `https://myanimelist.net/anime/${entry.mal_id}`;
            aHtml.childNodes[0].textContent = 'MyAnimeList';
            links.appendChild(link);
        }
    };
    document.addEventListener('turbo:load', () => {
        main().catch(console.error);
    });

})();
