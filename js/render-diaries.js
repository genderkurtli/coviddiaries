/* ═══════════════════════════════════════════════════════════════════
   RENDER-DIARIES.JS - Zeigt Diaries an
   
   AUFGABEN:
   - Diaries nach Cohorten gruppieren
   - Spalten-Layout erstellen
   - Text mit Tags highlighten
   ═══════════════════════════════════════════════════════════════════ */

// Aktueller State
let currentState = {
    selectedKeyword: null,
    selectedCohort: null,
    selectedTag: null,
    tagStates: {},  // 'clean', 'highlight', 'extract'
    viewMode: 'grid'  // 'grid' oder 'extract'
};

/**
 * Haupt-Render-Funktion
 */
function renderDiaries() {
    if (!isDataLoaded || diaryData.length === 0) {
        console.warn('⚠️ Keine Daten zum Rendern!');
        return;
    }
    
    const container = document.getElementById('diaryContainer');
    container.innerHTML = '';
    
    // Extract-View oder Grid-View?
    if (currentState.viewMode === 'extract' && currentState.selectedTag) {
        renderExtractView();
        return;
    }
    
    // Filtere Diaries
    let filtered = diaryData.filter(d => {
        if (currentState.selectedCohort && d.cohort !== currentState.selectedCohort) {
            return false;
        }
        return true;
    });
    
    // Gruppiere nach Cohort
    const byCohort = {};
    filtered.forEach(diary => {
        const cohort = diary.cohort || 'Unknown';
        if (!byCohort[cohort]) {
            byCohort[cohort] = [];
        }
        byCohort[cohort].push(diary);
    });
    
    // Sortiere innerhalb jeder Cohort nach Alter
    Object.keys(byCohort).forEach(cohort => {
        byCohort[cohort].sort((a, b) => {
            const ageA = a.age || 999;
            const ageB = b.age || 999;
            return ageA - ageB;
        });
    });
    
    // Dynamische Spaltenbreite
    const numCohorts = Object.keys(byCohort).length;
    container.className = numCohorts <= 2 ? 'diary-grid few-columns' : 'diary-grid many-columns';
    
    // Sortiere Cohorten
    const cohortOrder = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
    const sortedCohorts = Object.keys(byCohort).sort((a, b) => {
        const indexA = cohortOrder.indexOf(a);
        const indexB = cohortOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    
    // Erstelle Spalten
    sortedCohorts.forEach(cohort => {
        const column = createCohortColumn(cohort, byCohort[cohort]);
        container.appendChild(column);
    });
    
    console.log(`✅ ${filtered.length} Diaries gerendert in ${sortedCohorts.length} Cohorten`);
}

/**
 * Erstellt eine Cohort-Spalte
 */
function createCohortColumn(cohort, diaries) {
    const column = document.createElement('div');
    column.className = 'cohort-column';
    
    // Header
    const header = document.createElement('div');
    header.className = 'cohort-header';
    header.style.borderBottomColor = cohortColors[cohort] || '#cbd5e0';
    header.textContent = `${cohort} (${diaries.length})`;
    column.appendChild(header);
    
    // Diaries
    diaries.forEach(diary => {
        const entry = createDiaryEntry(diary);
        column.appendChild(entry);
    });
    
    return column;
}

/**
 * Erstellt eine einzelne Diary-Card
 */
function createDiaryEntry(diary) {
    const entry = document.createElement('div');
    entry.className = 'diary-entry';

    entry.dataset.diaryId = diary.id;
    
    // Header mit Metadaten
    const header = document.createElement('div');
    header.className = 'diary-header';
    
    const idSpan = document.createElement('span');
    idSpan.className = 'diary-id';
    idSpan.textContent = '#' + diary.id;
    
    const metaSpan = document.createElement('span');
    metaSpan.className = 'diary-meta';
    const metaParts = [
        diary.age ? diary.age + 'y' : null,
        diary.gender || null,
        diary.location || null
    ].filter(Boolean);
    metaSpan.textContent = metaParts.join(' • ');
    
    header.appendChild(idSpan);
    header.appendChild(metaSpan);
    entry.appendChild(header);
    
    // Text
    const textDiv = document.createElement('div');
    textDiv.className = 'diary-text';
    
    // Split in Paragraphen
    const paragraphs = diary.text.split('\n\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.innerHTML = highlightText(paragraph);
        textDiv.appendChild(p);
    });
    
    entry.appendChild(textDiv);
    
    return entry;
}


// ═══ KEYWORD FREQUENZEN (gecacht) ═══

let keywordFreqCache = {};

/**
 * Zählt wie oft jedes Keyword eines Themes in den Texten vorkommt.
 * Ergebnis wird gecacht, damit es nur einmal berechnet wird.
 */
function getThemeFrequencies(themeName) {
    if (keywordFreqCache[themeName]) return keywordFreqCache[themeName];

    const theme = keywordThemes[themeName];
    const freqs = {};

    theme.keywords.forEach(word => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
        let count = 0;
        diaryData.forEach(diary => {
            const plainText = diary.text.replace(/<[^>]*>/g, '');
            const matches = plainText.match(regex);
            if (matches) count += matches.length;
        });
        freqs[word.toLowerCase()] = count;
    });

    keywordFreqCache[themeName] = freqs;
    return freqs;
}

/**
 * Gibt die Schriftgrösse für ein Keyword zurück — 6 Stufen nach Häufigkeit.
 */
function getKeywordFontSize(word, themeName) {
    const freqs = getThemeFrequencies(themeName);
    const counts = Object.values(freqs).filter(c => c > 0);
    if (counts.length === 0) return 10;

    const max = Math.max(...counts);
    const min = Math.min(...counts);
    const count = freqs[word.toLowerCase()] || 0;

    const steps = [8, 10, 12, 14, 16, 18]; // 6 Stufen
    if (count === 0) return steps[0];
    if (max === min) return steps[2];

    const ratio = (count - min) / (max - min); // 0.0 → 1.0
    const stepIndex = Math.min(Math.floor(ratio * 6), 5);
    return steps[stepIndex];
}

/* Highlightet Text (Tags + Keywords)*/

function highlightText(text) {
    let result = text;

    // 0. Bilder durch ▣ Placeholder ersetzen
    result = result.replace(/<img([^>]*)>/gi, (match, attrs) => {
        const srcMatch = attrs.match(/src="{1,2}([^"]+?)"{1,2}/i) || attrs.match(/src='([^']+?)'/i);
        const src = srcMatch ? srcMatch[1] : '';
        return `<span class="img-placeholder" data-src="${src}">▣</span>`;
    });

    // 1. Tags highlighten - IMMER Spans erstellen!
    result = result.replace(/<([A-Z]+)>(.*?)<\/\1>/gs, (match, tag, content) => {
        const state = currentState.tagStates[tag] || 'clean';
        const color = tagColors[tag] || '#cbd5e0';
        
        if (state === 'clean') {
            // Bei clean: Span mit transparentem Hintergrund
            return `<span class="tag-highlight tag-${tag}" data-tag="${tag}" style="background-color: transparent; opacity: 1;">${content}</span>`;
        } else if (state === 'highlight') {
            // Bei highlight: Span mit Farbe
            return `<span class="tag-highlight tag-${tag}" data-tag="${tag}" style="background-color: ${color}; padding: 0; border-radius: 0px;">${content}</span>`;
        } else if (state === 'extract') {
            // Bei extract: Span mit Farbe
            return `<span class="tag-highlight tag-${tag}" data-tag="${tag}" style="background-color: ${color}; padding: 0; border-radius: 0px;">${content}</span>`;
        }
    });
    
    // 2. Keywords highlighten (wenn ausgewählt)
    if (currentState.selectedKeyword) {
        const theme = keywordThemes[currentState.selectedKeyword];
        if (theme) {
            theme.keywords.forEach(word => {
                const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(<[^>]*>)|(\\b${escapedWord}\\b)`, 'gi');
                const fontSize = getKeywordFontSize(word, currentState.selectedKeyword);
                result = result.replace(regex, (_match, htmlTag, keyword) => {
                    if (htmlTag) return htmlTag;
                    return `<mark class="keyword-highlight" style="font-size:${fontSize}px;">${keyword}</mark>`;
                });
            });
        }
    }
    
    return result;
}

/**
 * Extrahiert Tags aus Text
 */
function extractTags(text) {
    const tags = [];
    const regex = /<([A-Z]+)>(.*?)<\/\1>/gs;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
        tags.push({
            tag: match[1],
            content: match[2].trim()
        });
    }
    
    return tags;
}

/**
 * Rendert Extract-View
 */
function renderExtractView() {
    const container = document.getElementById('diaryContainer');
    container.innerHTML = '';
    container.className = 'extract-container';
    
    // Zurück-Button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← back to all diaries';
    backBtn.onclick = () => {
        currentState.viewMode = 'grid';
        if (currentState.selectedTag) {
            currentState.tagStates[currentState.selectedTag] = 'clean';
        }
        currentState.selectedTag = null;
        renderTagButtons();
        renderDiaries();
    };
    container.appendChild(backBtn);
    
    // Extrahiere Passagen
    const passages = [];
    diaryData.forEach(diary => {
        const tags = extractTags(diary.text);
        tags.forEach(({tag, content}) => {
            if (tag === currentState.selectedTag) {
                passages.push({
                    diaryId: diary.id,
                    cohort: diary.cohort,
                    age: diary.age,
                    gender: diary.gender,
                    location: diary.location,
                    content: content
                });
            }
        });
    });
    
    // Render Passagen
    const section = document.createElement('div');
    section.className = 'extract-tag-section';
    
    const color = tagColors[currentState.selectedTag] || '#cbd5e0';
    
    const header = document.createElement('div');
    header.className = 'extract-tag-header';
    header.style.borderBottomColor = color;
    header.textContent = `${currentState.selectedTag} (${passages.length} passages)`;
    section.appendChild(header);
    
    passages.forEach(passage => {
        const passageDiv = document.createElement('div');
        passageDiv.className = 'extract-passage';
        passageDiv.style.borderLeftColor = color;
        
        const meta = document.createElement('div');
        meta.className = 'extract-meta';
        const metaParts = [
            `#${passage.diaryId}`,
            passage.cohort,
            passage.age ? passage.age + 'y' : null,
            passage.gender,
            passage.location
        ].filter(Boolean);
        meta.textContent = metaParts.join(' • ');
        
        const text = document.createElement('div');
        text.className = 'extract-text';
        text.textContent = passage.content;
        
        passageDiv.appendChild(meta);
        passageDiv.appendChild(text);
        section.appendChild(passageDiv);
    });
    
    container.appendChild(section);
    
    console.log(`✅ Extract-View: ${passages.length} Passagen für ${currentState.selectedTag}`);
}
