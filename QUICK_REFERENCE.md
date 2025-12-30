# 📝 QUICK REFERENCE - Wo finde ich was?

## 🎨 FARBEN ÄNDERN

| Was ändern | Datei | Zeile ca. |
|------------|-------|-----------|
| Cohort-Farben (1920s-2010s) | `js/config.js` | 13-21 |
| Tag-Farben (EMOTIONS etc.) | `js/config.js` | 24-32 |
| Keyword-Farben | `js/config.js` | 36-78 |
| Header-Farbe | `css/styles.css` | 45 |
| Button-Farbe | `css/styles.css` | 72 |

## 📊 DATEN ÄNDERN

| Was ändern | Datei | Tool |
|------------|-------|------|
| Diary-Texte | `data/diaries.csv` | Excel |
| Tags hinzufügen | `data/diaries.csv` | Excel |
| Metadaten (Alter, Location) | `data/diaries.csv` | Excel |

## ⚙️ EINSTELLUNGEN ÄNDERN

| Was ändern | Datei | Variable |
|------------|-------|----------|
| Zoom Min/Max | `js/config.js` | CONFIG.minZoom / maxZoom |
| Animations-Speed | `js/config.js` | CONFIG.animationSpeed |
| Schriftgröße | `css/styles.css` | .diary-text { font-size: } |
| Spaltenbreite | `css/styles.css` | .cohort-column { max-width: } |

## 🔧 HÄUFIGE ÄNDERUNGEN

### Cohort-Farbe ändern
```javascript
// js/config.js, Zeile ~13
'1920s': '#FF0000',  // ← Neuer Hex-Code
```

### Schrift größer
```css
/* css/styles.css, Zeile ~183 */
.diary-text {
    font-size: 18px;  /* war 15px */
}
```

### Neues Keyword
```javascript
// js/config.js, Zeile ~78
'mein-thema': {
    color: '#FF69B4',
    keywords: ['wort1', 'wort2'],
    label: 'mein-thema'
}
```

### Tag im CSV
```
Normaler Text <EMOTIONS>getaggter Text</EMOTIONS> weiter normal
```

## 🗂️ DATEI-ÜBERSICHT

```
📄 index.html          → HTML-Struktur (selten ändern)
📁 css/
  📄 styles.css        → Design (oft ändern!)
📁 js/
  📄 config.js         → Farben & Keywords (sehr oft!)
  📄 data-loader.js    → CSV laden (nie ändern)
  📄 render-diaries.js → Anzeige-Logic (manchmal)
  📄 interactions.js   → Filter & Buttons (manchmal)
  📄 animate-tags.js   → Animation (Phase 2)
📁 data/
  📄 diaries.csv       → Daten (oft bearbeiten!)
📁 images/
  🖼️ background.jpg    → Hintergrundbild (optional)
```

## ⌨️ SHORTCUTS

| Aktion | Shortcut |
|--------|----------|
| Speichern | Strg+S / Cmd+S |
| Browser aktualisieren | F5 |
| Console öffnen | F12 |
| Suchen in Datei | Strg+F / Cmd+F |
| Format Document | Shift+Alt+F |

## 🎯 WORKFLOW

1. **Datei öffnen** (in VS Code)
2. **Ändern** (z.B. Farbe)
3. **Speichern** (Strg+S)
4. **Browser** aktualisiert automatisch! ✨
5. **Testen**

## 📞 WENN FEHLER

1. **F12** drücken
2. **Console** Tab
3. **Fehlermeldung** lesen
4. **Datei/Zeile** steht dabei!

## 🎨 ANIMATION (Phase 2)

Datei: `js/animate-tags.js`
Status: Vorbereitet
Kommt: Nächste Session!

---

**Diese Karte ausdrucken & neben PC legen!** 📌
