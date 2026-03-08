/* ═══════════════════════════════════════════════════════════════════
   INTRO-SPLASH.JS - Intro-Animation beim Seitenaufruf
   ═══════════════════════════════════════════════════════════════════ */

const splashWords = [
    { word: 'work',     color: '#f30847',           count: 528 },
    { word: 'day',      color: 'rgb(222, 22, 99)', count: 477 },
    { word: 'time',     color: '#e6548c',           count: 463 },
    { word: 'home',     color: '#ea71a6',           count: 362 },
    { word: 'people',   color: '#eb8db0',           count: 348 },
    { word: 'lockdown', color: '#ecb1c8',           count: 338 },
    { word: 'today',    color: '#eddbe3',           count: 308 },
];

const msDuration = 900;  // ms sichtbar
const msFade     = 350;  // ms ein-/ausblenden 
const msTitlePause = 1000; // ms zwischen Titel und Untertitel

function runIntroSplash() {
    const splash    = document.getElementById('intro-splash');
    const wordEl    = document.getElementById('splash-word');
    const titleEl   = document.getElementById('splash-title');
    const subtitleEl= document.getElementById('splash-subtitle');
    if (!splash || !wordEl) return;

    splash.style.display = 'flex';

    // Failsafe
    const failsafe = setTimeout(hideSplash, 20000);

    function hideSplash() {
        clearTimeout(failsafe);
        // Schwarz → transparent: Seite scheint durch → Cross-fade
        splash.style.transition = 'opacity 3.5s ease';
        splash.style.opacity = '0';
        setTimeout(() => { splash.style.display = 'none'; }, 3500);
    }

    // Wörter 1-7 nacheinander zeigen
    let i = 0;
    function showNextWord() {
        if (i >= splashWords.length) {
            // Wörter fertig → Titel zeigen
            wordEl.style.opacity = '0';
            setTimeout(showTitle, msFade + 60);
            return;
        }

        const { word, color, count } = splashWords[i];
        wordEl.innerHTML = `${word}<sup style="font-size:20px; font-weight:400; vertical-align:super; margin-left:10px; opacity:0.7">${count}</sup>`;
        wordEl.style.color = color;

        wordEl.style.opacity = '0';
        wordEl.style.transform = 'scale(0.92)';
        setTimeout(() => {
            wordEl.style.opacity = '1';
            wordEl.style.transform = 'scale(1)';
        }, 30);

        setTimeout(() => {
            wordEl.style.opacity = '0';
            wordEl.style.transform = 'scale(1.06)';
            i++;
            setTimeout(showNextWord, msFade + 60);
        }, msDuration);
    }

    const msPerChar = 50; // ms pro Buchstabe – hier spielen

    function typeWriter(el, text, onDone, append = false) {
        if (!append) { el.textContent = ''; el.style.opacity = '1'; }
        let j = 0;
        function nextChar() {
            if (j >= text.length) { if (onDone) onDone(); return; }
            el.textContent += text[j++];
            setTimeout(nextChar, msPerChar);
        }
        nextChar();
    }

    // Titel an echter Header-Position platzieren
    function showTitle() {
        const realTitle    = document.querySelector('.header-title');
        const realSubtitle = document.querySelector('.header-subtitle');

        if (realTitle && titleEl) {
            const r  = realTitle.getBoundingClientRect();
            const cs = window.getComputedStyle(realTitle);
            titleEl.style.top        = r.top + 'px';
            titleEl.style.left       = r.left + 'px';
            titleEl.style.width      = r.width + 'px';
            titleEl.style.fontSize   = cs.fontSize;
            titleEl.style.fontWeight = cs.fontWeight;
            titleEl.style.lineHeight = cs.lineHeight;
        }

        const titleText = 'Everything changed over night.';

        typeWriter(titleEl, titleText, () => {
            // Kurze Pause, dann Untertitel tippen
            setTimeout(() => {
                if (realSubtitle && subtitleEl) {
                    const r  = realSubtitle.getBoundingClientRect();
                    const cs = window.getComputedStyle(realSubtitle);
                    subtitleEl.style.top        = (r.top + parseFloat(cs.fontSize)) + 'px';
                    subtitleEl.style.left       = r.left + 'px';
                    subtitleEl.style.width      = r.width + 'px';
                    subtitleEl.style.fontSize   = cs.fontSize;
                    subtitleEl.style.fontWeight = cs.fontWeight;
                    subtitleEl.style.lineHeight = cs.lineHeight;
                }
                const msPause = 600; // Pause nach "One day." und "164 voices." – hier spielen
                typeWriter(subtitleEl, 'One day.', () => {
                    setTimeout(() => {
                        typeWriter(subtitleEl, ' 162 voices.', () => {
                            setTimeout(() => {
                                typeWriter(subtitleEl, ' Nine generations.', () => {
                                    setTimeout(hideSplash, msTitlePause);
                                }, true);
                            }, msPause);
                        }, true);
                    }, msPause);
                });
            }, 600);
        });
    }

    showNextWord();
}

runIntroSplash();
