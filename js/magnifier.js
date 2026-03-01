/* ═══════════════════════════════════════════════════════════════════
   MAGNIFIER.JS - Lupe für die kleinen Diary-Texte

   Beim Hovern über .diary-text erscheint ein Kasten neben dem Cursor
   mit 20 Wörtern Kontext um das gehovertes Wort.
   ═══════════════════════════════════════════════════════════════════ */

let magnifierThrottle = null;

/**
 * Initialisiert die Magnifier-Events
 * Wird aufgerufen nachdem die Seite geladen ist
 */
function initMagnifier() {
    const container = document.getElementById('diaryContainer');
    if (!container) return;

    container.addEventListener('mousemove', onMagnifierMouseMove);
    container.addEventListener('mousemove', onImageMouseMove);
    container.addEventListener('mouseleave', () => { hideMagnifier(); hideImageTooltip(); });

    console.log('✅ Magnifier bereit');
}

/**
 * MouseMove-Handler (gedrosselt auf 30ms)
 */
function onMagnifierMouseMove(e) {
    if (magnifierThrottle) return;
    magnifierThrottle = setTimeout(() => { magnifierThrottle = null; }, 30);

    // Nur in .diary-text aktiv
    if (!isInDiaryText(e.target)) {
        hideMagnifier();
        return;
    }

    // Diary-Entry finden (für ID und Metadaten)
    const entry = findDiaryEntry(e.target);
    if (!entry) { hideMagnifier(); return; }

    const diaryId = entry.dataset.diaryId;

    // Wort unter dem Cursor ermitteln
    const word = getWordAtPoint(e.clientX, e.clientY);
    if (!word || word.length < 2) { hideMagnifier(); return; }

    // Kontext aus den Daten extrahieren
    const result = getContext(diaryId, word);
    if (!result) { hideMagnifier(); return; }

    // Metadaten für die Titelzeile
    const diary = diaryData.find(d => String(d.id) === String(diaryId));
    const meta = diary
        ? [diary.cohort, diary.age ? diary.age + 'y' : null, diary.gender, diary.location]
            .filter(Boolean).join(' • ')
        : '';

    showMagnifier(result, meta, e.clientX, e.clientY);
}

/**
 * Prüft ob ein Element innerhalb von .diary-text liegt
 */
function isInDiaryText(element) {
    let el = element;
    while (el) {
        if (el.classList && el.classList.contains('diary-text')) return true;
        if (el.classList && el.classList.contains('diary-entry')) return false;
        el = el.parentElement;
    }
    return false;
}

/**
 * Findet das nächste .diary-entry Element
 */
function findDiaryEntry(element) {
    let el = element;
    while (el) {
        if (el.classList && el.classList.contains('diary-entry')) return el;
        el = el.parentElement;
    }
    return null;
}

/**
 * Ermittelt das Wort unter dem Cursor via caretRangeFromPoint
 */
function getWordAtPoint(x, y) {
    let textNode, offset;

    // Modern Standard (Chrome 128+, Firefox)
    if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (!pos) return null;
        textNode = pos.offsetNode;
        offset = pos.offset;
    }
    // Fallback (ältere Chrome / Safari)
    else if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        if (!range) return null;
        textNode = range.startContainer;
        offset = range.startOffset;
    }
    else return null;

    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return null;

    const text = textNode.textContent;
    let start = offset;
    let end = offset;

    // Wortgrenzen suchen
    while (start > 0 && !/\s/.test(text[start - 1])) start--;
    while (end < text.length && !/\s/.test(text[end])) end++;

    return text.slice(start, end).replace(/[.,!?;:"'()]/g, '').trim() || null;
}

/**
 * Baut eine Liste von {word, tagName} aus dem Originaltext
 */
function parseTaggedWords(text) {
    const clean = text.replace(/<img[^>]*>/gi, '');
    const words = [];
    const regex = /<([A-Z]+)>(.*?)<\/\1>|([^<]+)/gs;
    let match;

    while ((match = regex.exec(clean)) !== null) {
        if (match[1]) {
            // Getaggter Inhalt
            const tagName = match[1];
            match[2].split(/\s+/).filter(w => w).forEach(w => {
                words.push({ word: w, tagName });
            });
        } else if (match[3]) {
            // Ungetaggter Text
            match[3].split(/\s+/).filter(w => w).forEach(w => {
                words.push({ word: w, tagName: null });
            });
        }
    }

    return words;
}

/**
 * Prüft ob ein Tag aktiv (highlight oder extract) ist
 */
function isTagActive(tagName) {
    return currentState &&
        currentState.tagStates[tagName] &&
        currentState.tagStates[tagName] !== 'clean';
}

/**
 * Extrahiert 20 Wörter vor und nach dem gesuchten Wort, mit Tag-Farben als HTML
 */
function getContext(diaryId, word) {
    const diary = diaryData.find(d => String(d.id) === String(diaryId));
    if (!diary) return null;

    const taggedWords = parseTaggedWords(diary.text);
    const wordLower = word.toLowerCase();

    // Wort-Index suchen
    let wordIndex = taggedWords.findIndex(w =>
        w.word.toLowerCase().replace(/[.,!?;:"'()]/g, '') === wordLower
    );
    if (wordIndex === -1) {
        wordIndex = taggedWords.findIndex(w =>
            w.word.toLowerCase().includes(wordLower)
        );
    }
    if (wordIndex === -1) wordIndex = Math.floor(taggedWords.length / 2);

    const start = Math.max(0, wordIndex - 20);
    const end = Math.min(taggedWords.length, wordIndex + 21);
    const slice = taggedWords.slice(start, end);

    // HTML mit Tag-Farben aufbauen
    let html = start > 0 ? '<span style="color:#aaa">… </span>' : '';

    slice.forEach(({ word: w, tagName }) => {
        if (tagName && tagColors[tagName] && isTagActive(tagName)) {
            html += `<span style="background-color:${tagColors[tagName]}">${w}</span> `;
        } else {
            html += w + ' ';
        }
    });

    if (end < taggedWords.length) html += '<span style="color:#aaa"> …</span>';

    return html;
}

/**
 * Zeigt den Magnifier-Kasten an
 */
function showMagnifier(text, meta, cursorX, cursorY) {
    const tooltip = document.getElementById('magnifier');
    if (!tooltip) return;

    tooltip.querySelector('#magnifier-meta').textContent = meta;
    tooltip.querySelector('#magnifier-text').innerHTML = text;
    tooltip.style.display = 'block';

    positionMagnifier(cursorX, cursorY);
}

/**
 * Versteckt den Magnifier
 */
function hideMagnifier() {
    const tooltip = document.getElementById('magnifier');
    if (tooltip) tooltip.style.display = 'none';
}

/**
 * Positioniert den Magnifier neben dem Cursor
 * Klappt an Bildschirmrändern um
 */
function positionMagnifier(x, y) {
    const tooltip = document.getElementById('magnifier');
    const offset = 20;
    const padding = 10;

    let left = x + offset;
    let top = y + offset;

    // Am rechten Rand nach links klappen
    if (left + tooltip.offsetWidth > window.innerWidth - padding) {
        left = x - tooltip.offsetWidth - offset;
    }

    // Am unteren Rand nach oben klappen
    if (top + tooltip.offsetHeight > window.innerHeight - padding) {
        top = y - tooltip.offsetHeight - offset;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

/**
 * MouseMove-Handler für img-placeholder
 */
function onImageMouseMove(e) {
    const placeholder = e.target.closest('.img-placeholder');
    if (!placeholder) {
        hideImageTooltip();
        return;
    }
    const src = placeholder.dataset.src;
    if (!src) { hideImageTooltip(); return; }
    showImageTooltip(src, e.clientX, e.clientY);
}

function showImageTooltip(src, x, y) {
    const tooltip = document.getElementById('image-tooltip');
    const img = document.getElementById('image-tooltip-img');
    if (!tooltip || !img) return;
    img.src = src;
    tooltip.style.display = 'block';
    positionImageTooltip(x, y);
}

function hideImageTooltip() {
    const tooltip = document.getElementById('image-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

function positionImageTooltip(x, y) {
    const tooltip = document.getElementById('image-tooltip');
    const offset = 20;
    const padding = 10;
    let left = x + offset;
    let top = y + offset;
    if (left + tooltip.offsetWidth > window.innerWidth - padding) {
        left = x - tooltip.offsetWidth - offset;
    }
    if (top + tooltip.offsetHeight > window.innerHeight - padding) {
        top = y - tooltip.offsetHeight - offset;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Starten sobald die App bereit ist
document.addEventListener('DOMContentLoaded', () => {
    // Warten bis diaryData geladen – kurzes Polling
    const wait = setInterval(() => {
        if (typeof isDataLoaded !== 'undefined' && isDataLoaded) {
            clearInterval(wait);
            initMagnifier();
        }
    }, 100);
});

console.log('✅ magnifier.js geladen');
