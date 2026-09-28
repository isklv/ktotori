/* Моковые портреты для лендинга Тори.
   Внешние картинки на странице недоступны, поэтому кадры портфолио —
   генерируемые SVG-иллюстрации: тон кожи, цвет волос, форма причёски,
   оттенок теней и помады задаются в разметке:
   <figure data-shot="причёска|тон кожи|фон|помада|тени"> */
(function () {
  var SKIN = {
    porcelain: ['#F6DDCE', '#D7AC94', '#B98C74'],
    warm:      ['#F2CDA8', '#C9946A', '#A87450'],
    olive:     ['#E5C097', '#AE8055', '#8A6240'],
    deep:      ['#C08A5E', '#845433', '#603A22'],
    cool:      ['#F3DAD3', '#CDA098', '#AE8079']
  };
  var HAIR = {
    dark:  ['#372836', '#140E14'],
    brown: ['#71472F', '#301C13'],
    honey: ['#B98A52', '#6B4726'],
    cold:  ['#565064', '#252030'],
    red:   ['#9A4A26', '#4C2011'],
    ash:   ['#A79C92', '#5F574F']
  };
  var BG = {
    wine:   ['#4A2A3C', '#130D16', '#2A1722'],
    plum:   ['#513059', '#17101F', '#2E1B34'],
    champ:  ['#7E6045', '#221A16', '#3D2E22'],
    jade:   ['#2F6459', '#0D1E1B', '#1B3B35'],
    mint:   ['#D6E5DC', '#8AAEA1', '#B7CFC4', '#6E8E82', '#3F544C'],
    blush:  ['#EDD3CB', '#BE9189', '#D8B2A9', '#AE867E', '#71514A'],
    linen:  ['#E7E3D9', '#ADA697', '#CFC9BB', '#938C7D', '#5B5549'],
    slate:  ['#52616A', '#171E22', '#2E3B42'],
    film:   ['#8A6A4C', '#241B15', '#4A3728'],
    forest: ['#55654B', '#1B221B', '#33402F'],
    pearl:  ['#F0EAEF', '#C3B2C0', '#DACDD6', '#8D7889', '#584A56'],
    sand:   ['#F1E7D9', '#C2AE93', '#DCCCB6', '#9B8666', '#645440'],
    sky:    ['#E2E8EE', '#A6B6C3', '#C6D2DC', '#7C8E9E', '#4B5966'],
    ivory:  ['#F2EFE7', '#BCB5A4', '#D9D3C4', '#938B79', '#5C564A'],
    lilac:  ['#EEE7F7', '#BCACD6', '#D8CCEA', '#8574A8', '#4E4270']
  };
  var LIP = { rose: '#B75569', wine: '#8B2F46', nude: '#BE7E72', coral: '#C25B45', plum: '#7E3F5C', red: '#B62E36' };
  var SHADOW = { warm: '#A66B4E', smoke: '#5C4E5E', gold: '#B18B4B', plum: '#7E4E70', jade: '#3F6E63', none: null };

  var LIGHT_BG = { mint: 1, blush: 1, linen: 1, pearl: 1, sand: 1, sky: 1, ivory: 1, lilac: 1 };
  var HAIR_FOR = { porcelain: 'brown', warm: 'honey', olive: 'dark', deep: 'dark', cool: 'cold' };
  var seq = 0;

  function grad(id, a, b, x2, y2) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + x2 + '" y2="' + y2 + '">' +
      '<stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient>';
  }

  function hairBack(style, fill, dark) {
    switch (style) {
      case 'bun':
        return '<ellipse cx="150" cy="140" rx="80" ry="98" fill="' + fill + '"/>' +
               '<circle cx="150" cy="30" r="33" fill="' + fill + '"/>' +
               '<path d="M120 46 q30 18 60 0" fill="none" stroke="' + dark + '" stroke-width="4" opacity=".5"/>';
      case 'tail':
        return '<ellipse cx="150" cy="142" rx="78" ry="96" fill="' + fill + '"/>' +
               '<path d="M216 128 c30 40 32 100 18 158 c-8 30 -28 44 -42 40 c18 -36 24 -90 12 -130 c-8 -28 -16 -50 -24 -62 z" fill="' + fill + '"/>';
      case 'short':
        return '<path d="M150 26 c-54 0 -82 38 -80 94 c1 40 5 70 12 100 l26 6 c-10 -36 -14 -68 -14 -100 l112 0 c0 32 -4 64 -14 100 l26 -6 c7 -30 11 -60 12 -100 c2 -56 -26 -94 -80 -94 z" fill="' + fill + '"/>';
      case 'veil':
      default:
        return '<path d="M150 22 c-64 0 -88 46 -84 112 c4 52 -10 98 -24 162 c24 -10 46 -28 56 -56 c-14 -48 -12 -94 -6 -120 l116 0 c6 26 8 72 -6 120 c10 28 32 46 56 56 c-14 -64 -28 -110 -24 -162 c4 -66 -20 -112 -84 -112 z" fill="' + fill + '"/>';
    }
  }

  function hairFront(style, fill, dark) {
    var cap;
    if (style === 'short') {
      cap = '<path d="M84 132 c-4 -68 26 -100 66 -100 c40 0 70 32 66 100 c-12 -44 -30 -62 -66 -62 c-36 0 -54 18 -66 62 z"';
    } else if (style === 'tail' || style === 'bun') {
      cap = '<path d="M86 128 c-4 -66 26 -98 64 -98 c38 0 68 32 64 98 c-14 -42 -34 -58 -64 -58 c-30 0 -50 16 -64 58 z"';
    } else {
      cap = '<path d="M84 136 c-6 -72 26 -104 66 -104 c42 0 72 32 66 104 c-8 -36 -18 -56 -30 -68 c-26 16 -66 20 -88 10 c-8 14 -12 36 -14 58 z"';
    }
    return cap + ' fill="' + fill + '"/>' +
      '<path d="M104 78 q46 -26 92 2" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".1" stroke-linecap="round"/>' +
      '<path d="M96 116 q40 -34 84 -14" fill="none" stroke="' + dark + '" stroke-width="3" opacity=".3" stroke-linecap="round"/>';
  }

  function build(style, tone, bg, lip, shade) {
    var id = 'p' + (++seq);
    var sk = SKIN[tone] || SKIN.porcelain;
    var hr = HAIR[HAIR_FOR[tone] || 'brown'];
    var bgc = BG[bg] || BG.wine;
    var lipc = LIP[lip] || LIP.rose;
    var shc = SHADOW[shade || 'smoke'];
    var veil = style === 'veil';
    var light = !!LIGHT_BG[bg];

    return '' +
'<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Портрет — макет фотографии">' +
'<defs>' +
  grad('bg' + id, bgc[0], bgc[1], 0.85, 1) +
  grad('sk' + id, sk[0], sk[1], 0.85, 0.9) +
  grad('hr' + id, hr[0], hr[1], 0.5, 1) +
  grad('cl' + id, bgc[3] || bgc[2], bgc[4] || bgc[1], 0.4, 1) +
  '<radialGradient id="lt' + id + '" cx="0.3" cy="0.22" r="0.8">' +
    '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.3"/>' +
    '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
  '<radialGradient id="vg' + id + '" cx="0.46" cy="0.4" r="0.72">' +
    '<stop offset="0.5" stop-color="#000000" stop-opacity="0"/>' +
    '<stop offset="1" stop-color="#000000" stop-opacity="' + (light ? '0.2' : '0.46') + '"/></radialGradient>' +
  '<filter id="sf' + id + '" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter>' +
  '<filter id="sm' + id + '" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3.2"/></filter>' +
  '<filter id="gr' + id + '"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>' +
    '<feColorMatrix type="saturate" values="0"/></filter>' +
'</defs>' +
'<rect width="300" height="400" fill="url(#bg' + id + ')"/>' +
'<rect width="300" height="400" fill="url(#lt' + id + ')"/>' +
'<g transform="rotate(-3 150 230)">' +
  hairBack(style, 'url(#hr' + id + ')', hr[1]) +
  '<path d="M126 218 h48 v74 c0 22 -48 22 -48 0 z" fill="' + sk[2] + '"/>' +
  '<path d="M-10 400 C 18 332 66 306 112 298 C 128 334 172 334 188 298 C 234 306 282 332 310 400 Z" fill="url(#cl' + id + ')"/>' +
  '<path d="M150 50 c-41 0 -68 31 -68 78 c0 31 6 58 19 79 c12 20 31 35 49 35 s37 -15 49 -35 c13 -21 19 -48 19 -79 c0 -47 -27 -78 -68 -78 z" fill="url(#sk' + id + ')"/>' +
  '<path d="M202 96 c14 34 12 92 -12 128 c-12 18 -26 30 -40 34 c26 -2 48 -34 56 -70 c6 -30 4 -68 -4 -92 z" fill="' + sk[2] + '" opacity=".5" filter="url(#sf' + id + ')"/>' +
  '<ellipse cx="82" cy="160" rx="9" ry="14" fill="' + sk[1] + '"/>' +
  '<ellipse cx="218" cy="160" rx="9" ry="14" fill="' + sk[1] + '"/>' +
  (shc ? '<ellipse cx="121" cy="140" rx="24" ry="13" fill="' + shc + '" opacity=".5" filter="url(#sm' + id + ')"/>' +
         '<ellipse cx="179" cy="139" rx="24" ry="13" fill="' + shc + '" opacity=".5" filter="url(#sm' + id + ')"/>' : '') +
  '<ellipse cx="108" cy="178" rx="18" ry="11" fill="' + lipc + '" opacity=".22" filter="url(#sf' + id + ')"/>' +
  '<ellipse cx="192" cy="178" rx="18" ry="11" fill="' + lipc + '" opacity=".22" filter="url(#sf' + id + ')"/>' +
  '<ellipse cx="128" cy="98" rx="26" ry="18" fill="#FFFFFF" opacity=".13" filter="url(#sf' + id + ')"/>' +
  '<path d="M102 124 q20 -11 38 -3" fill="none" stroke="' + hr[1] + '" stroke-width="4" stroke-linecap="round" opacity=".7"/>' +
  '<path d="M160 121 q20 -8 38 5" fill="none" stroke="' + hr[1] + '" stroke-width="4" stroke-linecap="round" opacity=".7"/>' +
  '<path d="M104 148 q18 14 36 2" fill="none" stroke="' + hr[1] + '" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M160 150 q18 12 36 -2" fill="none" stroke="' + hr[1] + '" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M138 150 l8 -7" stroke="' + hr[1] + '" stroke-width="2.4" stroke-linecap="round"/>' +
  '<path d="M196 148 l8 -8" stroke="' + hr[1] + '" stroke-width="2.4" stroke-linecap="round"/>' +
  '<path d="M150 158 q9 22 -5 27" fill="none" stroke="' + sk[2] + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>' +
  '<path d="M126 200 q11 -11 24 -4 q13 -8 24 4 q-11 22 -24 22 q-13 0 -24 -22 z" fill="' + lipc + '"/>' +
  '<path d="M130 200 q20 7 40 0" fill="none" stroke="#000000" stroke-width="1.6" opacity=".3"/>' +
  '<ellipse cx="141" cy="212" rx="7" ry="3" fill="#FFFFFF" opacity=".2" filter="url(#sm' + id + ')"/>' +
  hairFront(style, 'url(#hr' + id + ')', hr[1]) +
  (veil ? '<path d="M150 16 c-74 0 -102 60 -98 132 c4 70 -16 142 -30 252 l256 0 c-14 -110 -34 -182 -30 -252 c4 -72 -24 -132 -98 -132 z" fill="#FFFFFF" opacity=".16"/>' +
          '<path d="M52 400 c8 -96 26 -168 22 -240" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".18"/>' +
          '<path d="M248 400 c-8 -96 -26 -168 -22 -240" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".18"/>' : '') +
'</g>' +
'<rect width="300" height="400" fill="url(#vg' + id + ')"/>' +
'<rect width="300" height="400" filter="url(#gr' + id + ')" opacity="' + (light ? '0.09' : '0.13') + '"/>' +
'</svg>';
  }

  function render() {
    document.querySelectorAll('[data-shot]').forEach(function (el) {
      var p = String(el.dataset.shot).split('|');
      el.insertAdjacentHTML('afterbegin', build(
        (p[0] || 'locks').trim(), (p[1] || 'porcelain').trim(), (p[2] || 'wine').trim(),
        (p[3] || 'rose').trim(), (p[4] || 'smoke').trim()
      ));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
