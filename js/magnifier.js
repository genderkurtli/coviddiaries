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
    container.addEventListener('mouseleave', hideMagnifier);

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

    // Chrome / Safari
    if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        if (!range) return null;
        textNode = range.startContainer;
        offset = range.startOffset;
    }
    // Firefox
    else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (!pos) return null;
        textNode = pos.offsetNode;
        offset = pos.offset;
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
 * Extrahiert 20 Wörter vor und nach dem gesuchten Wort
 */
function getContext(diaryId, word) {
    const diary = diaryData.find(d => String(d.id) === String(diaryId));
    if (!diary) return null;

    // Tags und HTML entfernen
    const cleanText = diary.text
        .replace(/<[A-Z]+>|<\/[A-Z]+>/gi, '')
        .replace(/<img[^>]*>/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

    const words = cleanText.split(' ');
    const wordLower = word.toLowerCase();

    // Wort-Index suchen (Anfang des Wortes matchen, Satzzeichen ignorieren)
    let wordIndex = words.findIndex(w =>
        w.toLowerCase().replace(/[.,!?;:"'()]/g, '') === wordLower
    );

    // Fallback: enthält das Wort
    if (wordIndex === -1) {
        wordIndex = words.findIndex(w =>
            w.toLowerCase().includes(wordLower)
        );
    }

    // Fallback: Mitte des Textes
    if (wordIndex === -1) wordIndex = Math.floor(words.length / 2);

    const start = Math.max(0, wordIndex - 20);
    const end = Math.min(words.length, wordIndex + 21);

    // Ellipsen wenn nicht am Anfang/Ende
    const prefix = start > 0 ? '… ' : '';
    const suffix = end < words.length ? ' …' : '';

    return prefix + words.slice(start, end).join(' ') + suffix;
}

/**
 * Zeigt den Magnifier-Kasten an
 */
function showMagnifier(text, meta, cursorX, cursorY) {
    const tooltip = document.getElementById('magnifier');
    if (!tooltip) return;

    tooltip.querySelector('#magnifier-meta').textContent = meta;
    tooltip.querySelector('#magnifier-text').textContent = text;
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
