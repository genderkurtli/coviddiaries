# 🎯 COVID DIARIES - SAUBERE VERSION MIT TRENNUNG

## 📦 WAS DU HAST:

Eine **komplett neu strukturierte Version** mit sauberer Trennung:

```
covid-diaries-projekt/
│
├── index.html              ← HAUPTDATEI (HTML-Struktur)
│
├── css/
│   └── styles.css          ← ALLE Styles (Farben, Layout)
│
├── js/
│   ├── config.js           ← Konfiguration (Farben, Keywords)
│   ├── data-loader.js      ← CSV laden
│   ├── render-diaries.js   ← Diaries anzeigen
│   ├── interactions.js     ← Filter, Zoom, Buttons
│   └── animate-tags.js     ← D3.js Animation (Phase 2)
│
├── data/
│   └── diaries.csv         ← DATEN (164 Diaries mit Tags)
│
└── images/
    └── background.jpg      ← Hintergrundbild (optional)
```

---

## 🚀 INSTALLATION (Schritt für Schritt):

### **Schritt 1: Alle Dateien herunterladen**

Lade alle Dateien aus dem Output-Ordner herunter:
- ✅ `index.html`
- ✅ `styles.css` (in `css/` Ordner)
- ✅ `config.js` (in `js/` Ordner)
- ✅ `data-loader.js` (in `js/` Ordner)
- ✅ `render-diaries.js` (in `js/` Ordner)
- ✅ `interactions.js` (in `js/` Ordner)
- ✅ `animate-tags.js` (in `js/` Ordner)
- ✅ `diaries.csv` (in `data/` Ordner)

### **Schritt 2: Ordner-Struktur erstellen**

Erstelle diese Ordner-Struktur auf deinem PC:

```
covid-diaries-projekt/         ← Haupt-Ordner erstellen
├── css/                       ← Unterordner erstellen
├── js/                        ← Unterordner erstellen
├── data/                      ← Unterordner erstellen
└── images/                    ← Unterordner erstellen (optional)
```

**Windows:**
1. Erstelle Ordner `covid-diaries-projekt`
2. Darin erstelle Unterordner: `css`, `js`, `data`, `images`

**Mac:**
1. Erstelle Ordner `covid-diaries-projekt`
2. Darin erstelle Unterordner: `css`, `js`, `data`, `images`

### **Schritt 3: Dateien platzieren**

Kopiere die Dateien in die richtigen Ordner:

```
covid-diaries-projekt/
├── index.html              ← Direkt hier
├── css/
│   └── styles.css          ← Hier
├── js/
│   ├── config.js           ← Hier
│   ├── data-loader.js      ← Hier
│   ├── render-diaries.js   ← Hier
│   ├── interactions.js     ← Hier
│   └── animate-tags.js     ← Hier
├── data/
│   └── diaries.csv         ← Hier (dein CSV!)
└── images/
    └── background.jpg      ← Optional: Dein Hintergrundbild
```

### **Schritt 4: VS Code öffnen**

1. VS Code starten
2. **File → Open Folder**
3. Wähle `covid-diaries-projekt`
4. Alle Dateien sollten im Explorer links sichtbar sein

### **Schritt 5: Live Server starten**

1. Rechtsklick auf `index.html`
2. **"Open with Live Server"**
3. Browser öffnet sich automatisch
4. **FERTIG!** 🎉

---

## ✅ FUNKTIONIERT ES?

**Checklist:**

- [ ] Alle 164 Diaries sichtbar?
- [ ] Cohort-Spalten (1920s - 2010s)?
- [ ] Tags farbig? (Klick auf Tag-Button → Highlight → Extract)
- [ ] Keywords funktionieren? (Klick auf Keyword → Färbung)
- [ ] Zoom +/- funktioniert?
- [ ] Filter nach Cohort funktioniert?

**Wenn alles ✅ → Perfekt!**

---

## 🎨 WAS DU JETZT ANPASSEN KANNST:

### **1. FARBEN ÄNDERN**

**Datei:** `js/config.js`

```javascript
// Cohort-Farben
const cohortColors = {
    '1920s': '#FF0000',  // ← Hier ändern! (Hex-Code)
    '1930s': '#dd6b20',
    // ...
};

// Tag-Farben
const tagColors = {
    'EMOTIONS': '#00FF00',  // ← Hier ändern!
    'RELATIONS': '#0000FF',
    // ...
};
```

**Speichern → Browser aktualisiert automatisch!**

### **2. KEYWORDS HINZUFÜGEN/ÄNDERN**

**Datei:** `js/config.js`

```javascript
const keywordThemes = {
    'lockdown': {
        color: '#fbbf24',
        keywords: ['lockdown', 'locked', 'shutdown'],  // ← Hier Wörter hinzufügen
        label: 'lockdown'
    },
    
    // NEU hinzufügen:
    'NEUES_THEMA': {
        color: '#FF69B4',
        keywords: ['wort1', 'wort2', 'wort3'],
        label: 'NEUES_THEMA'
    }
};
```

### **3. LAYOUT ÄNDERN**

**Datei:** `css/styles.css`

```css
/* Schriftgröße */
.diary-text {
    font-size: 18px;  /* Größer! (war 15px) */
}

/* Spaltenbreite */
.diary-grid.few-columns .cohort-column {
    max-width: 1000px;  /* Breiter! (war 800px) */
}

/* Header-Farbe */
.header {
    background: #FFE4E1;  /* ← Andere Farbe! */
}
```

### **4. DATEN BEARBEITEN**

**Datei:** `data/diaries.csv`

1. Öffne in Excel/LibreOffice
2. Bearbeite Texte, Tags, Metadaten
3. **Speichern als CSV (UTF-8, Semikolon)**
4. Browser neu laden (F5)
5. Änderungen sichtbar!

---

## 📚 DATEIEN ERKLÄRT:

### **index.html**
- **Was:** HTML-Struktur
- **Wann ändern:** Fast nie
- **Enthält:** Header, Container, Script-Einbindungen

### **css/styles.css**
- **Was:** Alles Design
- **Wann ändern:** Für Look & Feel
- **Enthält:** Farben, Abstände, Schriften, Layout

### **js/config.js**
- **Was:** Alle Einstellungen
- **Wann ändern:** Oft! Farben, Keywords
- **Enthält:** cohortColors, tagColors, keywordThemes

### **js/data-loader.js**
- **Was:** CSV laden
- **Wann ändern:** Selten
- **Enthält:** D3.csv(), Parsing-Logic

### **js/render-diaries.js**
- **Was:** Diaries anzeigen
- **Wann ändern:** Wenn du Layout ändern willst
- **Enthält:** Cohort-Spalten, Highlighting, Extract-View

### **js/interactions.js**
- **Was:** Filter & Buttons
- **Wann ändern:** Für neue Filter/Buttons
- **Enthält:** Click-Handler, Zoom, Tag-States

### **js/animate-tags.js**
- **Was:** Animation (Phase 2!)
- **Wann ändern:** Später!
- **Enthält:** Noch leer - bereit für D3.js

### **data/diaries.csv**
- **Was:** Alle Daten
- **Wann ändern:** Immer wenn du Daten änderst
- **Enthält:** 164 Diaries mit Tags

---

## 🎬 PHASE 2: ANIMATION

**Status:** Vorbereitet, aber noch nicht implementiert!

**In `animate-tags.js` kommt:**
- D3.js Timeline-Animation
- Tags nacheinander einfärben
- Play/Pause Button
- Geschwindigkeit anpassen

**Wird in nächster Session gebaut!**

---

## 🐛 TROUBLESHOOTING:

### **Problem: Seite ist leer**

**Lösung:**
1. F12 drücken → Console
2. Fehlermeldung lesen
3. Häufig: CSV nicht gefunden
   - Check: Ist `data/diaries.csv` da?
   - Check: Heißt es EXAKT `diaries.csv`?

### **Problem: Keine Tags sichtbar**

**Lösung:**
- Tags müssen GROSSGESCHRIEBEN sein: `<EMOTIONS>` nicht `<emotions>`
- Check CSV: Sind Tags drin?
- Click auf Tag-Button → Sollte highlighten

### **Problem: Background-Image fehlt**

**Lösung:**
- Kopiere `background.jpg` in `images/` Ordner
- Oder entferne in `styles.css` die Zeile:
  ```css
  background-image: url('../images/background.jpg');
  ```

### **Problem: Live Server funktioniert nicht**

**Lösung:**
- Extension installiert? (Live Server von Ritwick Dey)
- Rechtsklick auf index.html → "Open with Live Server"
- Oder unten rechts: "Go Live" klicken

---

## 💡 VORTEILE DIESER VERSION:

| Vorteil | Erklärung |
|---------|-----------|
| **Sauber getrennt** | Daten ≠ Design ≠ Logic |
| **Leicht anpassbar** | Ändere nur was du brauchst |
| **Lernbar** | Jede Datei macht EIN Ding |
| **Erweiterbar** | Animation später easy hinzufügen |
| **Teilbar** | Ganzen Ordner kopieren = funktioniert |
| **Wartbar** | Bugs leicht zu finden |

---

## 🎯 NÄCHSTE SCHRITTE:

### **Session 1: Testen (JETZT)**
- [ ] Setup durchführen
- [ ] Alle Dateien platzieren
- [ ] Live Server starten
- [ ] Checken ob alles funktioniert

### **Session 2: Verstehen**
- [ ] Code durchlesen
- [ ] Farben ändern (experimentieren!)
- [ ] Keywords anpassen
- [ ] Eigene Änderungen machen

### **Session 3: Animation (D3.js)**
- [ ] D3.js Basics lernen
- [ ] Animation implementieren
- [ ] Tags nacheinander einfärben
- [ ] Ben Fry-Style! 🎨

---

## 📞 HILFE BRAUCHST DU?

**Häufige Fragen:**

**Q:** Wo ändere ich Cohort-Farben?
**A:** `js/config.js` → `cohortColors`

**Q:** Wo ändere ich Layout/Design?
**A:** `css/styles.css`

**Q:** Wie füge ich Tags hinzu?
**A:** `data/diaries.csv` in Excel öffnen, Text mit `<TAGNAME>...</TAGNAME>` umschließen

**Q:** Funktioniert Doppelklick auf HTML?
**A:** NEIN! CSV braucht Server → Live Server benutzen!

---

**VIEL ERFOLG! Du schaffst das!** 🚀✨
