/* ═══════════════════════════════════════════════════════════════════
   MAP-TOOLTIP.JS - Hover über .diary-meta → UK-Karte mit Punkt
   ═══════════════════════════════════════════════════════════════════ */

// Alle Orte mit Koordinaten (aus locations.csv / Foursquare Export)
const locationCoords = {
    'Aigburth':                           [53.36451,  -2.92661],
    'Alnwick':                            [55.41334,  -1.70724],
    'Barnsley, South Yorkshire':          [53.55277,  -1.48278],
    'Basingstoke':                        [51.26283,  -1.08620],
    'Beckenham':                          [51.40709,  -0.03032],
    'Beddau':                             [51.55182,  -3.35786],
    'Beeston':                            [53.12377,  -2.68692],
    'Belfast':                            [54.59758,  -5.92771],
    'Bermondsey':                         [51.49701,  -0.06327],
    'Birmingham':                         [52.47970,  -1.90269],
    'Bordon':                             [51.10912,  -0.85934],
    'Boston':                             [52.97766,  -0.02380],
    'Brighton':                           [50.82146,  -0.14006],
    'Broomhill':                          [55.87734,  -4.32175],
    'Cambridge':                          [52.20553,   0.11866],
    'Cambridgeshire':                     [52.37290,  -0.04494],
    'Cardiff':                            [51.48165,  -3.17919],
    'Cardiff, Wales':                     [51.48165,  -3.17919],
    'central London (Bermondsey)':        [51.49701,  -0.06327],
    'Chesterfield':                       [53.23521,  -1.42641],
    'Chiswick':                           [51.49231,  -0.26382],
    'Congleton, Cheshire':                [53.16353,  -2.21080],
    'Coventry':                           [52.40818,  -1.51048],
    'Crawley':                            [51.11034,  -0.18011],
    'Derby':                              [52.92330,  -1.47655],
    'Devon':                              [50.72414,  -3.66078],
    'Ealing, London':                     [51.51266,  -0.30520],
    'East Norton':                        [52.59525,  -0.84008],
    'East of England':                    [52.21998,   0.48758],
    'Eastbourne':                         [50.76644,   0.27815],
    'Edinburgh':                          [55.95335,  -3.18837],
    'Finchley':                           [51.59732,  -0.18056],
    'Framfield East Sussex':              [50.96430,   0.13213],
    'Glasgow':                            [55.86116,  -4.25017],
    'Grayshott':                          [51.11010,  -0.75061],
    'Great Glen, Leicester':              [52.57774,  -1.02647],
    'Hailsham in East Sussex':            [50.86282,   0.27306],
    'Hampshire':                          [51.04498,  -1.24331],
    'Headingley':                         [53.82101,  -1.57777],
    'Heath':                              [51.51431,  -3.19020],
    'Hertfordshire':                      [51.84005,  -0.09786],
    'Hesketh Bank':                       [53.70854,  -2.84697],
    'Hitchin':                            [51.94869,  -0.27791],
    'Hitchin, Hertfordshire':             [51.94869,  -0.27791],
    'Hove':                               [50.82869,  -0.17457],
    'Lambourn':                           [51.50831,  -1.53090],
    'Lancashire':                         [53.86117,  -2.56509],
    'Leeds':                              [53.79742,  -1.54379],
    'Leicester':                          [52.63620,  -1.13320],
    'Leicestershire':                     [52.66667,  -1.00000],
    'Letchworth Garden City, Hertfordshire': [51.97950, -0.22946],
    'Lewes':                              [50.87461,   0.00512],
    'Lewes, East Sussex':                 [50.87461,   0.00512],
    'Lindfield':                          [51.01295,  -0.08077],
    'Lindgield':                          [51.01295,  -0.08077],
    'Liverpool':                          [53.40720,  -2.99168],
    'London':                             [51.50745,  -0.12777],
    'Macclesfield, Cheshire':             [53.26066,  -2.12552],
    'Manchester':                         [53.47949,  -2.24511],
    'Milton Keynes':                      [52.04065,  -0.75941],
    'Newcastle':                          [54.97385,  -1.61316],
    'Newcastle Upon Tyne':                [54.97385,  -1.61316],
    'Norfolk':                            [52.66667,   1.00000],
    'North England':                      [52.57784,  -1.54855],
    'north London':                       [51.61834,  -0.04415],
    'North West':                         [52.95591,  -1.15574],
    'Northamptonshire':                   [52.31061,  -0.86591],
    'North-East Wales.':                  [53.05348,  -3.00479],
    'Norwich':                            [52.62856,   1.29240],
    'Nottingham':                         [52.95342,  -1.14965],
    'Portsmout':                          [50.80003,  -1.09060],
    'Redditch':                           [52.30577,  -1.94174],
    'Reigate':                            [51.23766,  -0.20571],
    'Risby, Suffolk':                     [52.26723,   0.63283],
    'Rochdale':                           [53.61537,  -2.15576],
    'Rushmere St. Andrew':                [52.07121,   1.21094],
    'Salford':                            [53.48775,  -2.28919],
    'Sarisburggreen Hampshire':           [50.87619,  -1.28897],
    'Scotland':                           [56.78611,  -4.11405],
    'Sennen':                             [50.07059,  -5.69504],
    'Sheffield':                          [53.38066,  -1.47023],
    'South East England':                 [51.45115,  -0.99357],
    'South Yorkshire':                    [53.48153,  -1.38104],
    'Southhampton':                       [50.90253,  -1.40419],
    'Stapleford':                         [52.92939,  -1.27404],
    'Surrey':                             [51.27153,  -0.34145],
    'Sussex':                             [50.94451,  -0.06227],
    'Taunton, Somerset':                  [51.01491,  -3.10296],
    'Teddington':                         [51.42778,  -0.33365],
    'Tredeger':                           [51.77326,  -3.24695],
    'Tredigar':                           [51.77326,  -3.24695],
    'Trimley St Mary':                    [51.97903,   1.32162],
    'Turnbridge':                         [51.13715,   0.26734],
    'Urmston, Manchester':                [53.44537,  -2.35255],
    'Wales':                              [52.29281,  -3.73893],
    'West Bromwich':                      [52.51866,  -1.99231],
    'West Sussex':                        [51.00000,  -0.41667],
    'West Yorkshire':                     [53.74143,  -1.72020],
    'Wilmslow':                           [53.32613,  -2.23275],
    'Winchester':                         [51.06128,  -1.31317],
    'Worthing':                           [50.81154,  -0.36997],
};

// Tooltip-Kartengrösse (Anzeige)
const TIP_W = 300;
const TIP_H = Math.round(300 * 2105 / 1774); // 356px – Originalbild-Verhältnis

// Kalibrierung: empirisch aus calibrate-map.html
// Referenzpunkte im Originalbild (1774×2105):
//   London  (lat=51.508, lng=-0.128) → px=(1274, 1657)
//   Glasgow (lat=55.861, lng=-4.250) → px=(571,  385)  [Label-Klick, nur für lng]
//   Sennen  (lat=50.071, lng=-5.695) → px=(336,  2025) [nur für lat]
//
// LNG: (1274-571) / (-0.128-(-4.250)) = 170.5 px/°
// LAT: yM=ln(tan((45+lat/2)*π/180)); (1657-2025) / (yM_London-yM_Sennen) = -7129

const LNG_SCALE  = 170.5;    // px pro Grad (im Originalbild)
const LNG_OFFSET = 1295.8;   // px  [= 1274 - 170.5 * (-0.128)]

const LAT_SCALE  = -7129.0;  // px pro Mercator-Einheit
const LAT_OFFSET = 9190.6;   // px  [= 1657 - (-7129) * yM_London]

function latlngToImagePixel(lat, lng) {
    const yM = Math.log(Math.tan((45 + lat / 2) * Math.PI / 180));
    const px = LNG_SCALE * lng + LNG_OFFSET;
    const py = LAT_SCALE * yM  + LAT_OFFSET;
    return [px, py];
}

// Zeige Tooltip
function showMapTooltip(loc, coords, mouseX, mouseY) {
    const tooltip = document.getElementById('map-tooltip');
    const dot     = document.getElementById('map-dot');
    const label   = document.getElementById('map-tooltip-label');

    const [imgPx, imgPy] = latlngToImagePixel(coords[0], coords[1]);

    // Skaliere auf Tooltip-Grösse
    const dotX = imgPx * TIP_W / 1774;
    const dotY = imgPy * TIP_H / 2105;

    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
    label.textContent = loc;

    // Grösse setzen (einmalig)
    const img = tooltip.querySelector('img');
    img.width  = TIP_W;
    img.height = TIP_H;

    tooltip.style.display = 'block';
    positionTooltip(tooltip, mouseX, mouseY);
}

function positionTooltip(tooltip, mouseX, mouseY) {
    const margin = 15;
    const tw = TIP_W + 16;   // padding
    const th = TIP_H + 36;

    let left = mouseX + margin;
    let top  = mouseY - 20;

    if (left + tw > window.innerWidth)  left = mouseX - tw - margin;
    if (top  + th > window.innerHeight) top  = window.innerHeight - th - 10;
    if (top < 0) top = 10;

    tooltip.style.left = left + 'px';
    tooltip.style.top  = top  + 'px';
}

// Event-Listener
document.addEventListener('mouseover', function(e) {
    const meta = e.target.closest('.diary-meta[data-location]');
    if (!meta) return;
    const loc = meta.dataset.location;
    if (!loc) return;
    const coords = locationCoords[loc];
    if (!coords) return;
    showMapTooltip(loc, coords, e.clientX, e.clientY);
});

document.addEventListener('mousemove', function(e) {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip.style.display === 'none') return;
    const meta = e.target.closest('.diary-meta[data-location]');
    if (!meta) return;
    positionTooltip(tooltip, e.clientX, e.clientY);
});

document.addEventListener('mouseout', function(e) {
    const meta = e.target.closest('.diary-meta[data-location]');
    if (!meta) return;
    document.getElementById('map-tooltip').style.display = 'none';
});

console.log('Map tooltip bereit');
