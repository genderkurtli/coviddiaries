/* ═══════════════════════════════════════════════════════════════════
   ANIMATE-TAGS.JS - Sweep-Animation für Tags

   Beim Klick auf einen Tag-Button werden alle Spans dieses Tags
   nacheinander eingefärbt – wie ein Textmarker über die Seite.
   ═══════════════════════════════════════════════════════════════════ */

let sweepState = {
    isRunning: false,
    timeouts: []  // zum Abbrechen laufender Animationen
};

/**
 * Startet den Sweep für einen bestimmten Tag-Typ
 * Sammelt alle Spans mit data-tag, sortiert spaltenweise,
 * färbt sie nacheinander ein.
 */
function sweepTagHighlight(tagName) {
    // Laufende Animation abbrechen
    stopSweep();

    const color = tagColors[tagName] || '#cbd5e0';

    // Alle Spans dieses Tags sammeln via data-tag Attribut
    const spans = document.querySelectorAll(`.tag-highlight[data-tag="${tagName}"]`);

    if (spans.length === 0) return;

    // Sortiere: spaltenweise (links→rechts), dann oben→unten
    const sorted = Array.from(spans).sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        // Erst nach X (Spalte), dann nach Y (Position in Spalte)
        const colDiff = rectA.left - rectB.left;
        if (Math.abs(colDiff) > 50) return colDiff; // andere Spalte
        return rectA.top - rectB.top; // gleiche Spalte, nach Y
    });

    sweepState.isRunning = true;
    sweepState.timeouts = [];

    const delayPerSpan = 10; // ms – vorher 15

    sorted.forEach((span, i) => {
        const timeout = setTimeout(() => {
            span.style.backgroundColor = color;
        }, i * delayPerSpan);
        sweepState.timeouts.push(timeout);
    });

    // Nach letztem Span: Animation beendet
    const finishTimeout = setTimeout(() => {
        sweepState.isRunning = false;
    }, sorted.length * delayPerSpan);
    sweepState.timeouts.push(finishTimeout);
}

/**
 * Entfärbt einen Tag-Typ mit Sweep (zurück zu transparent)
 */
function sweepTagClear(tagName) {
    stopSweep();

    const spans = document.querySelectorAll(`.tag-highlight[data-tag="${tagName}"]`);

    if (spans.length === 0) return;

    const sorted = Array.from(spans).sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        const colDiff = rectA.left - rectB.left;
        if (Math.abs(colDiff) > 50) return colDiff;
        return rectA.top - rectB.top;
    });

    sweepState.isRunning = true;
    sweepState.timeouts = [];

    const delayPerSpan = 10;

    sorted.forEach((span, i) => {
        const timeout = setTimeout(() => {
            span.style.backgroundColor = 'transparent';
        }, i * delayPerSpan);
        sweepState.timeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
        sweepState.isRunning = false;
    }, sorted.length * delayPerSpan);
    sweepState.timeouts.push(finishTimeout);
}

/**
 * Stoppt laufende Sweep-Animation
 */
function stopSweep() {
    sweepState.timeouts.forEach(t => clearTimeout(t));
    sweepState.timeouts = [];
    sweepState.isRunning = false;
}

console.log('✅ animate-tags.js geladen - Sweep-Animation bereit');
