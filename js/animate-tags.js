/* ═══════════════════════════════════════════════════════════════════
   ANIMATE-TAGS.JS - D3.js Animation für Tags (Ben Fry Style!)
   
   PHASE 2: IMPLEMENTIERT! 🎉
   
   - Animiert ALLE Tags nacheinander durch alle Diaries
   - Jedes Tag in seiner Farbe
   - Smooth D3.js transitions
   - Von oben nach unten durch die Spalten
   ═══════════════════════════════════════════════════════════════════ */

// ═══ ANIMATION STATE ═══
let animationState = {
    isRunning: false,
    currentIndex: 0,
    allTagElements: [],
    animationSpeed: 500  // ms zwischen jedem Tag
};

/**
 * Startet die Ben Fry Style Animation!
 */
function startAnimation() {
    console.log('🎬 Animation startet!');
    
    if (animationState.isRunning) {
        console.log('⚠️ Animation läuft bereits!');
        return;
    }
    
    // 1. Sammle ALLE Tag-Spans im DOM
    collectAllTagElements();
    
    if (animationState.allTagElements.length === 0) {
        alert('Keine Tags gefunden! Stelle sicher dass Diaries Tags haben (<EMOTIONS>, <SCHOOL>, etc.)');
        return;
    }
    
    console.log(`✅ ${animationState.allTagElements.length} Tags gefunden!`);
    
    // 2. Reset alle Tags (transparent machen)
    resetAllTags();
    
    // 3. Starte Animation
    animationState.isRunning = true;
    animationState.currentIndex = 0;
    
    // UI Updates
    document.getElementById('stopBtn').style.display = 'inline-block';
    updateAnimationStatus();
    
    // 4. Starte sequentielle Animation
    animateNextTag();
}

/**
 * Stoppt die Animation
 */
function stopAnimation() {
    animationState.isRunning = false;
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('animationStatus').textContent = '⏸️ Gestoppt';
    console.log('⏸️ Animation gestoppt');
}

/**
 * Reset Animation
 */
function resetAnimation() {
    animationState.currentIndex = 0;
    animationState.isRunning = false;
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('animationStatus').textContent = '';
    
    // Alle Tags zurücksetzen
    animationState.allTagElements.forEach(element => {
        d3.select(element)
            .style('background-color', null)
            .style('opacity', 1);
    });
    
    console.log('🔄 Animation zurückgesetzt');
}

/**
 * Sammelt alle Tag-Elemente aus dem DOM
 */
function collectAllTagElements() {
    animationState.allTagElements = [];
    
    // Finde alle Diary-Einträge
    const allDiaries = document.querySelectorAll('.diary-entry');
    
    // Gehe durch jedes Diary
    allDiaries.forEach(diary => {
        // Finde alle Tag-Spans in diesem Diary
        const tagSpans = diary.querySelectorAll('[class*="tag-highlight"]');
        
        tagSpans.forEach(span => {
            // Extrahiere Tag-Name aus className
            const tagName = extractTagNameFromElement(span);
            
            if (tagName && tagColors[tagName]) {
                animationState.allTagElements.push({
                    element: span,
                    tagName: tagName,
                    color: tagColors[tagName]
                });
            }
        });
    });
    
    console.log(`📊 Gesammelt: ${animationState.allTagElements.length} Tag-Elemente`);
}

/**
 * Extrahiert Tag-Name aus Element-ClassName
 */
function extractTagNameFromElement(element) {
    const classList = element.className.split(' ');
    
    // Suche nach 'tag-highlight-TAGNAME' oder ähnlich
    for (let className of classList) {
        if (className.includes('tag-highlight')) {
            // Annahme: className ist sowas wie 'tag-highlight' und data-tag Attribut existiert
            // ODER: Text-Inhalt gibt Hinweis
            
            // Versuche: Welche Farbe hat das Element bereits?
            const computedStyle = window.getComputedStyle(element);
            const bgColor = computedStyle.backgroundColor;
            
            // Finde Tag durch Farb-Matching
            for (let [tagName, color] of Object.entries(tagColors)) {
                if (element.textContent && element.parentElement) {
                    // Check ob Tag im Text vorkommt
                    const parentText = element.parentElement.innerHTML;
                    if (parentText.includes(`<${tagName}>`)) {
                        return tagName;
                    }
                }
            }
        }
    }
    
    // Fallback: Check alle Tag-Namen
    const text = element.textContent || '';
    for (let tagName of Object.keys(tagColors)) {
        // Check Parent HTML für Tag
        if (element.parentElement && element.parentElement.innerHTML.includes(`<${tagName}>`)) {
            return tagName;
        }
    }
    
    return null;
}

/**
 * Reset alle Tags zu transparent
 */
function resetAllTags() {
    animationState.allTagElements.forEach(({element}) => {
        d3.select(element)
            .style('background-color', 'transparent')
            .style('opacity', 0.3);
    });
}

/**
 * Animiert das nächste Tag
 */
function animateNextTag() {
    if (!animationState.isRunning) {
        console.log('⏸️ Animation unterbrochen');
        return;
    }
    
    if (animationState.currentIndex >= animationState.allTagElements.length) {
        // Animation fertig!
        console.log('✅ Animation komplett!');
        animationState.isRunning = false;
        document.getElementById('stopBtn').style.display = 'none';
        document.getElementById('animationStatus').textContent = '✅ Fertig!';
        return;
    }
    
    // Hole aktuelles Tag
    const {element, tagName, color} = animationState.allTagElements[animationState.currentIndex];
    
    // Animiere mit D3.js!
    d3.select(element)
        .transition()
        .duration(600)
        .style('background-color', color)
        .style('opacity', 1)
        .style('padding', '3px 6px')
        .style('border-radius', '4px');
    
    // Optional: Scroll zu Element
    scrollToElement(element);
    
    // Update Status
    updateAnimationStatus();
    
    // Nächstes Tag
    animationState.currentIndex++;
    
    // Warte, dann nächstes
    setTimeout(animateNextTag, animationState.animationSpeed);
}

/**
 * Scrollt sanft zum animierten Element
 */
function scrollToElement(element) {
    // Nur scrollen wenn Element nicht sichtbar
    const rect = element.getBoundingClientRect();
    const isVisible = (
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
    );
    
    if (!isVisible) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

/**
 * Update Animation Status Anzeige
 */
function updateAnimationStatus() {
    const current = animationState.currentIndex + 1;
    const total = animationState.allTagElements.length;
    const percent = Math.round((current / total) * 100);
    
    document.getElementById('animationStatus').textContent = 
        `🎬 ${current} / ${total} (${percent}%)`;
}

// ═══ EXPORT (falls als Modul genutzt) ═══
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startAnimation,
        stopAnimation,
        resetAnimation
    };
}

console.log('✅ animate-tags.js geladen - Bereit für Ben Fry Style Animation! 🎨');