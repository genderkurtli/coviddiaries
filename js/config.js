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
    '1920s': '#000000',  // Rot
    '1930s': '#010101',  // Orange
    '1940s': '#000000',  // Gelb
    '1950s': '#080808',  // Türkis
    '1960s': '#000000',  // Blau
    '1970s': '#000000',  // Lila
    '2010s': '#000000'   // Pink
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
        keywords: ['lockdown', 'stay home','locked', 'shutdown', 'quarantine','home', 'stay home'],
        label: 'lockdown'
    },
    'relations': {
        color: '#ffd1d6',
        keywords: ['family', 'friend', 'partner', 'relative', 'mum', 'dad','child','couple', 'brother', 'sister','daughter', 'son','mother','wife', 'husband'],
        label: 'relations'
    },
    'bad feelings': {
        color: 'rgb(221, 195, 189)',
        keywords: ['fear', 'grief', 'guilt','worried','worry', 'anxiety', 'scared', 'afraid', 'panic', 'bad', 'difficult'],
        label: 'bad feelings'
    },
    'good feelings': {
        color: 'rgb(95, 168, 194)',
        keywords: ['hope', 'grattitude','hopeful', 'optimis', 'positive', 'better', 'loveley','lucky','fun', 'pretty','happy', ],
        label: 'good feelings'
    },
    'isolation': {
        color: '#5c879c',
        keywords: ['alone', 'isolated', 'lonely', 'solitude', 'miss'],
        label: 'isolation'
    },
    'routine': {
        color: '#636173',
        keywords: ['routine', 'daily', 'usual', 'normal', 'regular'],
        label: 'routine'
    },
    'work': {
        color: '#75424f',
        keywords: ['work', 'working', 'lesson','job', 'study', 'employment', 'remote', 'university', 'home office', 'homeschooling', 'school', 'math', 'english', 'home school', 'study', 'studying', 'college'],
        label: 'work'
     },
     'food': {
        color: '#936375',
        keywords: ['food','cup', 'eat', 'ate', 'cook', 'bake', 'tea', 'bread', 'meal','dinner','breakfast','lunch','coffee'],
        label: 'food'
    },
    'time': {
        color: '#ddb98b',
        keywords: ['time', 'year', 'month', 'week', 'today', 'day', 'daily','morning', 'afternoon','soon','yesterday','evening','night','hour','minute'],
        label: 'time'
         },
    'pandemic': {
        color: '#ae9386',
        keywords: ['pandemic', 'funeral','virus', 'covid', 'health', 'sick', 'ill', 'symptom', 'disease'],
        label: 'pandemic'
},
'activities': {
        color: '#b39741',
        keywords: ['reading','writing','exercise', 'yoga','shopping','walking' ],
        label: 'activities'
},
'spaces': {
        color: '#ae8874',
        keywords: ['room', 'home', 'house', 'bed','garden' , 'place','downstairs'],
        label: 'spaces'
},
'communication': {
        color: '#dfc6a2ff',
        keywords: ['call', 'chat', 'zoom', 'whatsapp','email','meet'],
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
