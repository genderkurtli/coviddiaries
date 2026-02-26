/* ═══════════════════════════════════════════════════════════════════
   CONFIG.JS - Alle Farben, Keywords und Einstellungen
   
   HIER kannst du anpassen:
   - Cohort-Farben
   - Tag-Farben
   - Keyword-Definitionen
   - Theme-Farben
   ═══════════════════════════════════════════════════════════════════ */

// ═══ COHORT-FARBEN ═══
// Farben für die linke Linie jeder Diary-Card
const cohortColors = {
    '1920s': '#000000',  
    '1930s': '#010101',  
    '1940s': '#000000',  
    '1950s': '#1b1b1b', 
    '1960s': '#000000',  
    '1970s': '#000000', 
    '2010s': '#000000'  
};

// ═══ TAG-FARBEN ═══
// Farben für manuell getaggte Passagen <EMOTIONS>...</EMOTIONS>
const tagColors = {
    'EMOTIONS': '#ebc952',
    'EMPLOYMENT': '#cfc25c',
    'ACTIVITIES': '#b0bd63',
    'RELATIONS': '#94b56e',
    'DIGITAL': '#75b078',
    'ROUTINE': '#59ab82',
    'SCHOOL': '#a2eada',
    'COVIDNEWS': '#f063cf'
};

// ═══ KEYWORD-THEMES ═══
// Automatische Keyword-Erkennung für Themen
const keywordThemes = {
    'lockdown': {
        color: 'rgb(190, 152, 182)',
        keywords: ['lockdown', 'stay at home', 'locked', 'shutdown', 'quarantine', 'home', 'government', 'Boris', 'restrict', 'rules'],
        label: 'lockdown'
    },
    'relations': {
        color: '#ffd1d6',
        keywords: ['family', 'friend', 'kid', 'kids', 'partner', 'relative', 'mum', 'dad', 'child', 'couple', 'brother', 'sister', 'daughter', 'son', 'mother', 'wife', 'husband', 'parent', 'gran', 'neighbour', 'colleague', 'baby', 'girlfriend', 'boyfriend'],
        label: 'relations'
    },
    'bad feelings': {
        color: 'rgb(221, 195, 189)',
        keywords: ['fear', 'grief', 'guilt', 'worried', 'worry', 'anxiety', 'scared', 'afraid', 'panic', 'bad', 'difficult', 'longing', 'sad', 'stress', 'tired', 'frustrated', 'bored', 'boring', 'depressed'],
        label: 'bad feelings'
    },
    'good feelings': {
        color: 'rgb(95, 168, 194)',
        keywords: ['hope', 'grattitude', 'hopeful', 'optimis', 'positive', 'better', 'loveley', 'lucky', 'fun', 'pretty', 'happy', 'enjoy', 'love', 'comfort', 'grateful', 'calm'],
        label: 'good feelings'
    },
    'isolation': {
        color: '#5c879c',
        keywords: ['alone', 'isolated', 'lonely', 'solitude', 'miss', 'apart', 'separate', 'stuck', 'social distancing'],
        label: 'isolation'
    },
    'routine': {
        color: '#636173',
        keywords: ['routine', 'daily', 'usual', 'normal', 'regular', 'sleep', 'wake', 'habit'],
        label: 'routine'
    },
    'work': {
        color: '#75424f',
        keywords: ['work', 'working', 'lesson', 'job', 'study', 'employment', 'remote', 'university', 'home office', 'homeschooling', 'school', 'math', 'english', 'home school', 'studying', 'college', 'furlough', 'office', 'student', 'teach'],
        label: 'work'
    },
    'food': {
        color: '#936375',
        keywords: ['food', 'cup', 'eat', 'ate', 'cook', 'bake', 'tea', 'bread', 'meal', 'dinner', 'breakfast', 'lunch', 'coffee', 'shop', 'cake', 'drink', 'soup', 'fruit', 'wine'],
        label: 'food'
    },
    'time': {
        color: '#ddb98b',
        keywords: ['time', 'year', 'month', 'week', 'today', 'day', 'daily', 'morning', 'afternoon', 'soon', 'yesterday', 'evening', 'night', 'hour', 'minute'],
        label: 'time'
    },
    'pandemic': {
        color: '#ae9386',
        keywords: ['pandemic', 'funeral', 'virus', 'covid', 'health', 'sick', 'ill', 'symptom', 'disease', 'hospital', 'NHS', 'nurse', 'doctor', 'death'],
        label: 'pandemic'
    },
    'activities': {
        color: '#b39741',
        keywords: ['reading', 'writing', 'exercise', 'yoga', 'shopping', 'walking', 'garden', 'run', 'TV', 'music', 'film', 'Netflix'],
        label: 'activities'
    },
    'spaces': {
        color: '#ae8874',
        keywords: ['room', 'home', 'house', 'bed', 'garden', 'place', 'downstairs', 'kitchen', 'outside', 'flat', 'park', 'window'],
        label: 'spaces'
    },
    'communication': {
        color: '#dfc6a2ff',
        keywords: ['call', 'chat', 'zoom', 'whatsapp', 'email', 'meet', 'phone', 'talk', 'visit', 'message', 'skype'],
        label: 'communication'
    }
};

// ═══ GLOBALE EINSTELLUNGEN ═══
const CONFIG = {
    // Zoom
    defaultZoom: 1.0,
    minZoom: 0.7,
    maxZoom: 1.5,
    zoomStep: 0.1,
    
    // Animation (später)
    animationSpeed: 500,  // ms zwischen jedem Tag
    animationDuration: 800,  // ms für Fade-in
    
    // Layout
    cohortColumnLayout: true,  // false = Zeilen-Layout
    maxVisibleDiaries: 164,    // Alle anzeigen
};
