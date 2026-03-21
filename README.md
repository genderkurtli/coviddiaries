# COVID Diaries — 12th May 2020

An interactive visualisation of 162 diary entries written on 12 May 2020 for the [Mass Observation Archive](https://massobs.org.uk/research/covid19/). On that day, the UK was in its second month of lockdown. These are the things that occupied people's minds.

## What you can explore

- **Keywords** — highlight words across all diaries by topic (food, isolation, pandemic, relations, …)
- **Tags** — colour-coded passages by theme (EMOTIONS, DIGITAL, SCHOOL, EMPLOYMENT, …)
- **Locations** — hover over a diary's location to see where in the UK the writer lived
- **Images** — hover over ▣ to see photographs included in the original entries

## Data

Diary entries are sourced from the Mass Observation Archive and stored in `data/diaries.csv`. Each passage is tagged by theme using XML-style tags (e.g. `<EMOTIONS>…</EMOTIONS>`).

> Mass Observation Archive, University of Sussex. Used under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Running locally

The project is plain HTML/CSS/JavaScript — no build step required. Because the data is loaded from a CSV file, you need a local server:

1. Open the folder in [VS Code](https://code.visualstudio.com/)
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
3. Right-click `index.html` → **Open with Live Server**

## Project structure

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js          # colours, keyword definitions
│   ├── data-loader.js     # CSV parsing
│   ├── render-diaries.js  # layout and tag highlighting
│   ├── interactions.js    # buttons, filters
│   ├── animate-tags.js    # sweep animation
│   ├── magnifier.js       # hover magnifier
│   ├── map-tooltip.js     # location map
│   └── intro-splash.js    # intro animation
├── data/
│   └── diaries.csv
└── images/
    └── uk-map.png
```
