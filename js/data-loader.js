/* ═══════════════════════════════════════════════════════════════════
   DATA-LOADER.JS - Lädt CSV-Daten
   
   AUFGABEN:
   - CSV laden mit D3.js
   - Daten parsen
   - Global verfügbar machen
   ═══════════════════════════════════════════════════════════════════ */

// Globale Variable für alle Diaries
let diaryData = [];
let isDataLoaded = false;

/**
 * Lädt die CSV-Datei und startet die App
 */
function loadData() {
    console.log('📂 Lade CSV-Daten...');
    
    // ✅ Standard d3.csv() - CSV mit Komma
    d3.csv('data/diaries.csv').then(function(data) {
        // Konvertiere Daten
        diaryData = data.map(d => ({
            id: d.id,
            cohort: d.cohort,
            age: d.age ? parseInt(d.age) : null,
            gender: d.gender || '',
            location: d.location || '',
            text: d.text || ''
        }));
        
        console.log(`✅ ${diaryData.length} Diaries geladen!`);
        console.log('📊 Erste 3 IDs:', diaryData.slice(0, 3).map(d => '#' + d.id).join(', '));
        console.log('📊 Erste 3 Cohorten:', diaryData.slice(0, 3).map(d => d.cohort).join(', '));
        
        isDataLoaded = true;
        
        // Starte die App
        initializeApp();
        
    }).catch(function(error) {
        console.error('❌ Fehler beim Laden der CSV:', error);
        document.getElementById('diaryContainer').innerHTML = 
            '<div style="padding: 60px; text-align: center; color: red;">' +
            '<h2>❌ Fehler beim Laden der Daten</h2>' +
            '<p>Stelle sicher, dass die Datei <code>data/diaries.csv</code> existiert!</p>' +
            '<p>Fehler: ' + error.message + '</p>' +
            '</div>';
    });
}

/**
 * Initialisiert die App nach dem Laden der Daten
 */
function initializeApp() {
    console.log('🚀 Initialisiere App...');
    
    // Update Counter
    document.getElementById('diaryCount').textContent = diaryData.length;
    
    // Render Filter-Buttons
    renderKeywordButtons();
    renderCohortButtons();
    renderTagButtons();
    
    // Render Diaries
    renderDiaries();
    
    console.log('✅ App bereit!');
}

// Starte das Laden wenn Seite fertig ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
} else {
    loadData();
}
