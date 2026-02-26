/* ═══════════════════════════════════════════════════════════════════
   INTERACTIONS.JS - Filter, Zoom, Buttons
   
   AUFGABEN:
   - Filter-Buttons rendern
   - Click-Handler
   - Zoom-Funktionen
   ═══════════════════════════════════════════════════════════════════ */

let currentZoom = CONFIG.defaultZoom;

// ═══ KEYWORD BUTTONS ═══

function renderKeywordButtons() {
    const container = document.getElementById('keywordButtons');
    container.innerHTML = '';
    
    // "Clear" Button
    const allBtn = createButton('clear', currentState.selectedKeyword === null);
    allBtn.classList.add('keyword-btn');
    allBtn.onclick = () => {
        currentState.selectedKeyword = null;
        renderKeywordButtons();
        renderDiaries();
    };
    container.appendChild(allBtn);
    
    // Keyword Buttons
    Object.keys(keywordThemes).forEach(keyword => {
        const theme = keywordThemes[keyword];
        const isActive = currentState.selectedKeyword === keyword;
        
        const btn = createButton(theme.label, isActive);
        btn.classList.add('keyword-btn');
        btn.onclick = () => {
            currentState.selectedKeyword = keyword;
            renderKeywordButtons();
            renderDiaries();
        };

        btn.onmouseenter = () => {
            showKeywordCloud(keyword, btn);
        };

        btn.onmouseleave = () => {
            hideKeywordCloud();
        };
        
        container.appendChild(btn);
    });
}

// ═══ COHORT BUTTONS ═══

function renderCohortButtons() {
    const container = document.getElementById('cohortButtons');
    container.innerHTML = '';
    
    // Sammle alle Cohorten
    const cohorts = [...new Set(diaryData.map(d => d.cohort))].sort();
    
    // "Alle" Button
    const allBtn = createButton('all', currentState.selectedCohort === null);
    allBtn.onclick = () => {
        currentState.selectedCohort = null;
        renderCohortButtons();
        renderDiaries();
    };
    container.appendChild(allBtn);
    
    // Cohort Buttons
    cohorts.forEach(cohort => {
        const btn = createButton(cohort, currentState.selectedCohort === cohort);
        btn.onclick = () => {
            currentState.selectedCohort = cohort;
            renderCohortButtons();
            renderDiaries();
        };
        container.appendChild(btn);
    });
}

// ═══ TAG BUTTONS ═══

function renderTagButtons() {
    const container = document.getElementById('tagButtons');
    container.innerHTML = '';
    
    // Sammle alle Tags
    const allTags = new Set();
    diaryData.forEach(diary => {
        const tags = extractTags(diary.text);
        tags.forEach(({tag}) => allTags.add(tag));
    });
    
    if (allTags.size === 0) {
        container.innerHTML = '<span style="color: #718096; font-size: 11px;">Keine Tags gefunden</span>';
        return;
    }
    
    // Initialisiere Tag-States
    [...allTags].forEach(tag => {
        if (!(tag in currentState.tagStates)) {
            currentState.tagStates[tag] = 'clean';
        }
    });
    
    // Erstelle Buttons
    [...allTags].sort().forEach(tag => {
        const state = currentState.tagStates[tag] || 'clean';
        const color = tagColors[tag] || '#cbd5e0';// ← Farbe holen, die in config.js in den Tags definiert sind
        
        const btn = document.createElement('button');
        btn.className = `tag-btn tag-state-${state}`;
        btn.style.borderColor = color;
        
        // State-spezifisches Styling
        if (state === 'highlight') {
            btn.style.color = color;
            btn.style.backgroundColor = 'white';
            btn.style.borderWidth = '3px';
            btn.textContent = tag
             btn.innerHTML = `${tag} <span>☀</span>`;
        } else if (state === 'extract') {
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
            btn.style.borderWidth = '3px';
            btn.innerHTML = `${tag} <span>✀</span>`;
        } else { // clean
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
            btn.style.borderWidth = '2px';
            btn.textContent = tag;
           btn.innerHTML = `${tag} <span>⏻</span>`;
        }
        
        // Click Handler: Cycle durch States
        btn.onclick = () => cycleTagState(tag);
        
        // Hover Effects
        btn.onmouseenter = () => {
            if (state !== 'extract') {
                btn.style.backgroundColor = color;
                btn.style.color = 'white';
            }
        };
        btn.onmouseleave = () => {
            if (state === 'highlight') {
                btn.style.backgroundColor = 'white';
                btn.style.color = color;
            } else if (state === 'clean') {
                btn.style.backgroundColor = color;
                btn.style.color = 'white';
            }
        };
        
        container.appendChild(btn);
    });
}

/**
 * Cycle durch Tag-States: CLEAN → HIGHLIGHT → CLEAN
 */
function cycleTagState(tag) {
    const currentTagState = currentState.tagStates[tag] || 'clean';

    if (currentTagState === 'clean') {
        // CLEAN → HIGHLIGHT (mit Sweep-Animation)
        currentState.tagStates[tag] = 'highlight';
        currentState.viewMode = 'grid';
        renderTagButtons();
        sweepTagHighlight(tag);

    } else { // highlight
        // HIGHLIGHT → CLEAN
        currentState.tagStates[tag] = 'clean';
        currentState.viewMode = 'grid';
        renderTagButtons();
        renderDiaries();
    }

    /* EXTRACT-Zustand auskommentiert (nicht nötig solange Magnifier aktiv)
    } else if (currentTagState === 'highlight') {
        currentState.tagStates[tag] = 'extract';
        currentState.selectedTag = tag;
        currentState.viewMode = 'extract';
        renderTagButtons();
        renderDiaries();
    } else { // extract
        currentState.tagStates[tag] = 'clean';
        currentState.selectedTag = null;
        currentState.viewMode = 'grid';
        renderTagButtons();
        renderDiaries();
    }
    */
}

// ═══ ZOOM ═══

function zoomIn() {
    currentZoom = Math.min(currentZoom + CONFIG.zoomStep, CONFIG.maxZoom);
    updateZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - CONFIG.zoomStep, CONFIG.minZoom);
    updateZoom();
}

function updateZoom() {
    document.getElementById('diaryContainer').style.transform = `scale(${currentZoom})`;
    document.getElementById('diaryContainer').style.transformOrigin = 'top center';
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

// ═══ HELPER FUNCTIONS ═══

function createButton(text, active) {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (active ? ' active' : '');
    btn.textContent = text;
    return btn;
}
