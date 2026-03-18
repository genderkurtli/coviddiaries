/* ═══════════════════════════════════════════════════════════════════
   CONFIG.JS - Alle Farben, Keywords und Einstellungen
   
   HIER kannst du anpassen:
   - Cohort-Farben
   - Tag-Farben
   - Keyword-Definitionen
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

// Kontraststarke, klar trennbare Palette (kein Fast-Weiss)
const tagColors = {
  COVIDNEWS:  '#232778', // dunkelblau
  SCHOOL:     '#01605A', // teal
  ACTIVITIES: '#8B1E3F', // bordeaux
  FOOD:       '#FF862D', // orange
  ROUTINE:    '#256FAE', // blau
  RELATIONS:  '#B93B72', // pink/magenta
  DIGITAL:    '#F6B82D', // gelb
  EMOTIONS:   '#65348B', // violett
  EMPLOYMENT: '#77944E', // grün
};

// ═══ KEYWORD-THEMES ═══
// Automatische Keyword-Erkennung für Themen
const keywordThemes = {
    'lockdown': {
        keywords: ['lockdown', 'stay at home', 'locked', 'shutdown', 'quarantine', 'home', 'government', 'Boris', 'restrict', 'rules'],
        label: 'lockdown'
    },
    'relations': {
        keywords: ['family', 'friend', 'kid', 'kids', 'partner', 'relative', 'mum', 'dad', 'child', 'couple', 'brother', 'sister', 'daughter', 'son', 'mother', 'wife', 'husband', 'parent', 'gran', 'neighbour', 'colleague', 'baby', 'girlfriend', 'boyfriend'],
        label: 'relations'
    },
    'bad feelings': {
        keywords: ['fear', 'grief','nervous', 'guilt', 'worried', 'worry', 'anxiety', 'scared', 'afraid', 'panic', 'bad', 'difficult', 'longing', 'sad', 'stress', 'tired', 'frustrated', 'bored', 'boring', 'depressed'],
        label: 'bad feelings'
    },
    'good feelings': {
        keywords: ['hope', 'grattitude', 'hopeful', 'optimis', 'positive', 'better', 'loveley', 'lucky', 'fun', 'pretty', 'happy', 'enjoy', 'love', 'comfort', 'grateful', 'calm'],
        label: 'good feelings'
    },
    'isolation': {
        keywords: ['alone', 'isolated', 'lonely', 'solitude', 'miss', 'apart', 'separate', 'stuck', 'social distancing'],
        label: 'isolation'
    },
    'routine': {
        keywords: ['routine', 'daily', 'usual', 'normal', 'regular', 'sleep', 'wake', 'habit'],
        label: 'routine'
    },
    'work': {
        keywords: ['work', 'working', 'lesson', 'job', 'study', 'employment', 'remote', 'university', 'home office', 'homeschooling', 'school', 'math', 'english', 'home school', 'studying', 'college', 'furlough', 'office', 'student', 'teach'],
        label: 'work'
    },
    'food': {
        keywords: ['food', 'cup', 'eat', 'ate', 'cook', 'bake', 'tea', 'bread', 'meal', 'dinner', 'breakfast', 'lunch', 'coffee', 'shop', 'cake', 'drink', 'soup', 'fruit', 'wine'],
        label: 'food'
    },
    'time': {
        keywords: ['time', 'year', 'month', 'week', 'today', 'day', 'daily', 'morning', 'afternoon', 'soon', 'yesterday', 'evening', 'night', 'hour', 'minute'],
        label: 'time'
    },
    'pandemic': {
        keywords: ['pandemic', 'funeral', 'virus', 'covid', 'health', 'sick', 'ill', 'symptom', 'disease', 'hospital', 'NHS', 'nurse', 'doctor', 'death'],
        label: 'pandemic'
    },
    'activities': {
        keywords: ['reading', 'writing', 'exercise', 'yoga', 'shopping', 'walking', 'garden', 'run', 'TV', 'music', 'film', 'Netflix'],
        label: 'activities'
    },
    'spaces': {
        keywords: ['room', 'home', 'house', 'bed', 'garden', 'place', 'downstairs', 'kitchen', 'outside', 'flat', 'park', 'window'],
        label: 'spaces'
    },
    'communication': {
        keywords: ['call', 'chat', 'zoom', 'whatsapp', 'email', 'meet', 'phone', 'talk', 'visit', 'message', 'skype'],
        label: 'communication'
    },
    'animals': {
        keywords: ['pet', 'pets', 'mouse','tortoise', 'cow', 'bird','animal', 'animals', 'cat', 'kitten', 'dog', 'dogs', 'jack russell', 'swarm', 'beagle', 'lurcher', 'greyhound', 'saluki', 'fish', 'birds', 'sparrows', 'blackbird', 'larks', 'sheep', 'bee', 'bees', 'parakeets'],
        label: 'animals'
    },
    'jobs': {
        keywords: [
            'retired', 'retirement', 'furlough', 'furloughed', 'unemployed',
            'nurse', 'doctor', 'teacher', 'headteacher', 'engineer', 'manager', 'counsellor',
            'psychologist', 'therapist', 'tutor', 'lecturer', 'researcher', 'care worker',
            'consultant', 'librarian', 'lawyer', 'solicitor', 'barrister', 'surgeon', 'pharmacist',
            'midwife', 'accountant', 'civil servant', 'secretary', 'director', 'administrator',
            'scientist', 'cleaner', 'architect',
            'self-employed', 'freelance', 'contractor', 'volunteer',
            'part-time', 'full-time', 'colleague', 'employer', 'career', 'profession'
        ],
        label: 'jobs'
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
