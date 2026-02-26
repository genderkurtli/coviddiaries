/* ═══════════════════════════════════════════════════════════════════
   KEYWORD-CLOUD.JS - Word Cloud für Keyword-Buttons

   Beim Hover über einen Keyword-Button erscheint eine Word Cloud
   aller Theme-Keywords, skaliert nach Häufigkeit in den Diary-Texten.
   Die Keywords des gehoverten Themes werden farbig hervorgehoben.
   ═══════════════════════════════════════════════════════════════════ */

let cloudSvgSelection = null;
let cloudInitialized = false;

// ═══ FREQUENZEN BERECHNEN ═══

/**
 * Zählt wie oft jedes Keyword in den Diary-Texten vorkommt.
 * Gibt zurück: { word: { count, themes[] } }
 */
function computeKeywordFrequencies() {
    const frequencies = {};

    Object.keys(keywordThemes).forEach(themeName => {
        const theme = keywordThemes[themeName];
        theme.keywords.forEach(word => {
            const key = word.toLowerCase();
            if (!frequencies[key]) {
                frequencies[key] = { count: 0, themes: [] };
            }

            // In Plain-Text zählen (HTML-Tags entfernen)
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Einzel-Wörter: Prefix-Matching (\bword\w*) erfasst Beugungen (z.B. "quarantined")
            // Ausnahmen: Wörter wo Prefix zu false positives führt (z.B. "apart" → "apartment")
            const exactMatchWords = ['apart', 'tea', 'flat'];
            const isMultiWord = word.includes(' ');
            const useExact = isMultiWord || exactMatchWords.includes(key);
            const regex = useExact
                ? new RegExp(`\\b${escapedWord}\\b`, 'gi')
                : new RegExp(`\\b${escapedWord}\\w*`, 'gi');
            diaryData.forEach(diary => {
                const plainText = diary.text.replace(/<[^>]*>/g, '');
                const matches = plainText.match(regex);
                if (matches) frequencies[key].count += matches.length;
            });

            if (!frequencies[key].themes.includes(themeName)) {
                frequencies[key].themes.push(themeName);
            }
        });
    });

    return frequencies;
}

// ═══ CLOUD INITIALISIEREN ═══

/**
 * Berechnet Frequenzen, startet D3-Cloud-Layout.
 * Wird einmalig nach dem Laden der Daten aufgerufen.
 */
function initKeywordCloud() {
    if (cloudInitialized) return;
    cloudInitialized = true;

    const frequencies = computeKeywordFrequencies();

    // Nur Keywords die tatsächlich vorkommen (count > 0)
    const wordEntries = Object.entries(frequencies).filter(([, data]) => data.count > 0);
    if (wordEntries.length === 0) return;

    const maxCount = Math.max(...wordEntries.map(([, d]) => d.count));

    const words = wordEntries.map(([word, data]) => ({
        text: word,
        size: 8 + (Math.log(data.count + 1) / Math.log(maxCount + 1)) * 22,
        count: data.count,
        themes: data.themes
    })).sort((a, b) => b.size - a.size); // Grösste zuerst = bessere Platzierung

    d3.layout.cloud()
        .size([900, 500])
        .words(words)
        .padding(2)
        .rotate(() => (Math.random() > 0.75 ? 90 : 0))
        .font('roboto, sans-serif')
        .fontSize(d => d.size)
        .on('end', positioned => buildCloudSvg(positioned))
        .start();
}

// ═══ SVG AUFBAUEN ═══

/**
 * Rendert die positionierten Wörter als SVG in den Tooltip.
 */
function buildCloudSvg(words) {
    const tooltip = document.getElementById('keyword-cloud-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = '';

    const svg = d3.select('#keyword-cloud-tooltip')
        .append('svg')
        .attr('width', 900)
        .attr('height', 500);

    svg.append('g')
        .attr('transform', 'translate(450,250)')
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .attr('class', 'cloud-word')
        .attr('data-themes', d => d.themes.join(','))
        .style('font-size', d => d.size + 'px')
        .style('font-family', 'roboto, sans-serif')
        .style('fill', '#e0e0e0')
        .style('font-weight', 'normal')
        .style('cursor', 'default')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);

    cloudSvgSelection = svg;
}

// ═══ CLOUD ANZEIGEN / VERSTECKEN ═══

/**
 * Zeigt die Cloud an und hebt das gehoverte Theme hervor.
 */
function showKeywordCloud(themeName, btnElement) {
    const tooltip = document.getElementById('keyword-cloud-tooltip');
    if (!tooltip || !cloudSvgSelection) return;

    // Wörter des gehoverten Themes: schwarz + fett
    // Alle anderen: ausgegraut
    cloudSvgSelection.selectAll('.cloud-word')
        .style('fill', d => d.themes.includes(themeName) ? '#3a3a3a' : '#c0c0c0')
        .style('font-weight', d => d.themes.includes(themeName) ? 'bold' : 'normal')
        .style('opacity', d => d.themes.includes(themeName) ? 1 : 0.35);

    // Tooltip positionieren (unterhalb des Buttons)
    const rect = btnElement.getBoundingClientRect();
    let left = rect.left;
    let top = rect.bottom + 8;

    // Am rechten Rand nach links klappen
    if (left + 920 > window.innerWidth) {
        left = window.innerWidth - 920;
    }
    // Am unteren Rand nach oben klappen
    if (top + 520 > window.innerHeight) {
        top = rect.top - 520 - 8;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.display = 'block';
}

/**
 * Versteckt die Cloud.
 */
function hideKeywordCloud() {
    const tooltip = document.getElementById('keyword-cloud-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

// ═══ INIT nach Datenladen ═══

document.addEventListener('DOMContentLoaded', () => {
    const wait = setInterval(() => {
        if (
            typeof isDataLoaded !== 'undefined' && isDataLoaded &&
            typeof d3 !== 'undefined' &&
            typeof d3.layout !== 'undefined' &&
            typeof d3.layout.cloud !== 'undefined'
        ) {
            clearInterval(wait);
            initKeywordCloud();
        }
    }, 100);
});

console.log('✅ keyword-cloud.js geladen');
