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
    '1920s': '#e53e3e',  // Rot
    '1930s': '#dd6b20',  // Orange
    '1940s': '#d69e2e',  // Gelb
    '1950s': '#9BDFCA',  // Türkis
    '1960s': '#3182ce',  // Blau
    '1970s': '#CEA0DF',  // Lila
    '2010s': '#ed64a6'   // Pink
};

// ═══ TAG-FARBEN ═══
// Farben für manuell getaggte Passagen <EMOTIONS>...</EMOTIONS>
const tagColors = {
    'EMOTIONS': '#e46a88ff',
    'EMPLOYMENT': '#e19595ff',
    'ACTIVITIES': '#cd7eaeff',
    'RELATIONS': '#c4b1d6ff',
    'DIGITAL': '#8DAEB3',
    'ROUTINE': '#F0B7DB',
    'SCHOOL': '#FFB347',
    'COVIDNEWS': '#edaec3ff'
};

// ═══ KEYWORD-THEMES ═══
// Automatische Keyword-Erkennung für Themen
const keywordThemes = {
    'lockdown': {
        color: '#e8cb81ff',
        keywords: ['lockdown', 'stay home','locked', 'shutdown', 'quarantine','home', 'stay home'],
        label: 'lockdown'
    },
    'relations': {
        color: '#fb923c',
        keywords: ['family', 'friend', 'partner', 'relative', 'mum', 'dad','child','couple', 'brother', 'sister','daughter', 'son','mother','wife', 'husband'],
        label: 'relations'
    },
    'bad feelings': {
        color: '#8e6c6cff',
        keywords: ['fear', 'grief', 'guilt','worried','worry', 'anxiety', 'scared', 'afraid', 'panic', 'bad', 'difficult'],
        label: 'bad feelings'
    },
    'good feelings': {
        color: '#5fab92ff',
        keywords: ['hope', 'grattitude','hopeful', 'optimis', 'positive', 'better', 'loveley','lucky','fun', 'pretty','happy', ],
        label: 'good feelings'
    },
    'isolation': {
        color: '#b39ce9ff',
        keywords: ['alone', 'isolated', 'lonely', 'solitude', 'miss'],
        label: 'isolation'
    },
    'routine': {
        color: '#ed94c0ff',
        keywords: ['routine', 'daily', 'usual', 'normal', 'regular'],
        label: 'routine'
    },
    'work': {
        color: '#95e1d3',
        keywords: ['work', 'working', 'lesson','job', 'study', 'employment', 'remote', 'university', 'home office', 'homeschooling', 'school', 'math', 'english', 'home school', 'study', 'studying', 'college'],
        label: 'work'
     },
     'food': {
        color: '#c8eda5ff',
        keywords: ['food','cup', 'eat', 'ate', 'cook', 'bake', 'tea', 'bread', 'meal','dinner','breakfast','lunch','coffee'],
        label: 'food'
    },
    'time': {
        color: '#a5edcfff',
        keywords: ['time', 'year', 'month', 'week', 'today', 'day', 'daily','morning', 'afternoon','soon','yesterday','evening','night','hour','minute'],
        label: 'time'
         },
    'pandemic': {
        color: '#8da278ff',
        keywords: ['pandemic', 'funeral','virus', 'covid', 'health', 'sick', 'ill', 'symptom', 'disease'],
        label: 'pandemic'
},
'activities': {
        color: '#9ea1bdff',
        keywords: ['reading','writing','exercise', 'yoga','shopping','walking' ],
        label: 'activities'
},
'spaces': {
        color: '#8578a2ff',
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
