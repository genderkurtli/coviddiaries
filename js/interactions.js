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

    // "Clear" Button — am Ende
    const allBtn = document.createElement('button');
    allBtn.textContent = 'clear';
    allBtn.classList.add('keyword-btn-clear');
    allBtn.onclick = () => {
        currentState.selectedKeyword = null;
        renderKeywordButtons();
        renderDiaries();
    };
    container.appendChild(allBtn);
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
    
    // Farbreihenfolge: gelb → orange → pink → bordeaux → violett → dunkelblau → blau → teal → grün
    const tagOrder = ['DIGITAL', 'FOOD', 'RELATIONS', 'ACTIVITIES', 'EMOTIONS', 'COVIDNEWS', 'ROUTINE', 'SCHOOL', 'EMPLOYMENT'];
    const sortedTags = [...allTags].sort((a, b) => {
        const ia = tagOrder.indexOf(a);
        const ib = tagOrder.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
    });

    // Erstelle Buttons
    sortedTags.forEach(tag => {
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
            btn.textContent = tag;
        } else { // clean
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
            btn.style.borderWidth = '2px';
            btn.textContent = tag;
        }
        
        // Click Handler: Cycle durch States
        btn.onclick = () => cycleTagState(tag);
        
        // Hover Effects
        btn.onmouseenter = () => {
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
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

    // Clear-Button — am Ende
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'clear';
    clearBtn.classList.add('keyword-btn-clear');
    clearBtn.onclick = () => {
        Object.keys(currentState.tagStates).forEach(t => {
            currentState.tagStates[t] = 'clean';
        });
        renderTagButtons();
        renderDiaries();
    };
    container.appendChild(clearBtn);
}

/**
 * Cycle durch Tag-States: CLEAN → HIGHLIGHT → CLEAN
 */
function cycleTagState(tag) {
    const currentTagState = currentState.tagStates[tag] || 'clean';

    if (currentTagState === 'clean') {
        // CLEAN → HIGHLIGHT (mit Sweep-Animation)
        currentState.tagStates[tag] = 'highlight';
        renderTagButtons();
        sweepTagHighlight(tag);

    } else { // highlight → CLEAN
        currentState.tagStates[tag] = 'clean';
        renderTagButtons();
        renderDiaries();
    }
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
