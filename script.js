
// ══════════════════════════════════════════════════
//  CHARACTER IMAGE FILES — относительные пути
// ══════════════════════════════════════════════════
const CHAR_IMGS = [
    './images/char_1_sads.png',      // 1. Роддом / Детский сад
    './images/char_2_schools.png',   // 2. Школа
    './images/char_3_musicss.png',   // 3. Кружки
    './images/char_4_martials.png',  // 4. Казақ күресі
    './images/char_5_colleges.png',  // 5. Колледж
    './images/char_6_unis.png',      // 6. Университет
    './images/char_7_fcs.png',       // 7. Финансовый центр
];

// ══════════════════════════════════════════════════
//  BRANCHING NODE GRAPH
// ══════════════════════════════════════════════════
const NODES = {
  rd: {
    key:'rd', emoji:'🏥',
    age:'0 лет', title:'РОДДОМ 🏥',
    charImg: CHAR_IMGS[0],
    bubble:'Уа-уа!',
    loc:'Перинатальный центр, пр. Тәуелсіздік, 3',
    desc:'Айдос только появился на свет — крошечный, громкий, весь в будущем! Родители ещё не знают, каким он вырастет. Но уже сейчас можно сделать первый шаг.',
    fc:'Открыл депозит на новорождённого → государство зачислило стартовые 235 920 ₸.',
    skills:[{t:'День рождения',c:'#c45c5c',b:'#fceaea'},{t:'Первый вдох',c:'#2db8a4',b:'#e6f7f4'},{t:'Большие мечты',c:'#6b5b95',b:'#f0ecf8'}],
    latlng:[51.1478, 71.4622], zoom:14,
    next:[{key:'kg', label:'В садик →'}]
  },
  kg: {
    key:'kg', emoji:'🧸',
    age:'3–6 лет', title:'ДЕТСКИЙ САД 🧸',
    charImg: CHAR_IMGS[0],
    bubble:'Привет!',
    loc:'мкр. Сарыарка, ул. Сейфуллина, Астана',
    desc:'Айдос делает первые шаги! Новые друзья, казахские сказки и первые слова на трёх языках. Мечты такие большие, как весь Казахстан!',
    fc:'Депозит копится: банк начисляет %, государство добавляет премию 5–7% в год.',
    skills:[{t:'Дружба',c:'#d97b3a',b:'#fef3e8'},{t:'Қазақша',c:'#3a9e6a',b:'#e8f6ee'},{t:'Творчество',c:'#6b5b95',b:'#f0ecf8'}],
    latlng:[51.1580, 71.4665], zoom:14,
    next:[{key:'kr1', label:'🎨 Доп. кружки'},{key:'sc', label:'📚 В школу'}]
  },
  kr1: {
    key:'kr1', emoji:'🎨',
    age:'4–6 лет', title:'ДОП. КРУЖКИ (ДОШКОЛ.) 🎨',
    charImg: CHAR_IMGS[2],
    bubble:'Творю!',
    loc:'Дворец школьников им. Аль-Фараби, пр. Б. Момышұлы, 5',
    desc:'Рисование, лепка, танцы — Айдос пробует всё! Пальцы в краске, язык высунут от старания. Каждый кружок — это новый мир, открытый настежь.',
    fc:'Накопления защищены от арестов и списаний — до 10 млн ₸ под госгарантией.',
    skills:[{t:'Творчество',c:'#6b5b95',b:'#f0ecf8'},{t:'Усидчивость',c:'#2a7a8c',b:'#e6f4f8'},{t:'Любопытство',c:'#d97b3a',b:'#fef3e8'}],
    latlng:[51.1358, 71.4652], zoom:14,
    next:[{key:'sc', label:'📚 В школу'}]
  },
  sc: {
    key:'sc', emoji:'📚',
    age:'7–11 лет', title:'НАЧАЛЬНАЯ ШКОЛА 📚',
    charImg: CHAR_IMGS[1],
    bubble:'Пятёрка!',
    loc:'Школа-гимназия №47, ул. Сейфуллина, 21',
    desc:'Первый звонок! Айдос в синей форме с огромным портфелем. Математика, казахский, русский — и первые пятёрки в дневнике. Жизнь становится серьёзнее.',
    fc:'Госпремия на депозит начисляется каждый год — деньги растут, пока Айдос сидит на уроках.',
    skills:[{t:'Математика',c:'#0f2844',b:'#e6f1f8'},{t:'Чтение',c:'#c45c5c',b:'#fceaea'},{t:'Спорт',c:'#3a9e6a',b:'#e8f6ee'}],
    latlng:[51.1637, 71.4697], zoom:15,
    next:[{key:'kr2', label:'🎵 Доп. кружки'},{key:'co', label:'🎒 В колледж'}]
  },
  kr2: {
    key:'kr2', emoji:'🎵',
    age:'10–14 лет', title:'ДОП. КРУЖКИ (ШКОЛА) 🎵',
    charImg: CHAR_IMGS[2],
    bubble:'♪ кюй ♪',
    loc:'Qurmangazy Music Academy, пр. Қабанбай батыр, 56Б',
    desc:'По вечерам — домбра. Пальцы болят, зато кюй Курмангазы звучит всё лучше. Айдос учится слышать душу казахской музыки — и терпеть, и добиваться.',
    fc:'% по депозиту капают. Никто не тронет — защита от арестов и третьих лиц.',
    skills:[{t:'Домбра',c:'#6b5b95',b:'#f0ecf8'},{t:'Нотная грамота',c:'#c9a03a',b:'#fdf6e3'},{t:'Дисциплина',c:'#2a7a8c',b:'#e6f4f8'}],
    latlng:[51.1018, 71.4085], zoom:15,
    next:[{key:'co', label:'🎒 В колледж'}]
  },
  co: {
    key:'co', emoji:'🎒',
    age:'15–18 лет', title:'КОЛЛЕДЖ 🎒',
    charImg: CHAR_IMGS[4],
    bubble:'Профи!',
    loc:'Колледж «Тұран», ул. Бараева, 9/2',
    desc:'Время серьёзных решений. Айдос влюбился в экономику — таблицы, рынки, цифры. Олимпиады, английский, первые стажировки. Всё ради большой мечты.',
    fc:'Накопленный депозит идёт на оплату колледжа. Не хватает — кредит до 10 лет без залога.',
    skills:[{t:'Экономика',c:'#2a7a8c',b:'#e6f4f8'},{t:'English',c:'#3a9e6a',b:'#e8f6ee'},{t:'Лидерство',c:'#c45c5c',b:'#fceaea'}],
    latlng:[51.1572, 71.4349], zoom:15,
    next:[{key:'kr3', label:'🥋 Доп. кружки'},{key:'ob1', label:'🏠 Общежитие'},{key:'un', label:'🏛️ В универ'}]
  },
  kr3: {
    key:'kr3', emoji:'🥋',
    age:'15–19 лет', title:'КАЗАҚ КҮРЕСІ 🥋',
    charImg: CHAR_IMGS[3],
    bubble:'Батыр!',
    loc:'ЛСК «Qazaqstan», пр. Туран, 59',
    desc:'Три раза в неделю — тренировки. Айдос — БАТЫР! Красный пояс, золото на городских соревнованиях. Воля плюс тело плюс характер — это и есть победа.',
    fc:'Ваучер покрыл колледж. Айдос думает о борьбе, не о деньгах.',
    skills:[{t:'Казақ Күресі',c:'#c45c5c',b:'#fceaea'},{t:'Стратегия',c:'#0f2844',b:'#e6f1f8'},{t:'Характер',c:'#c9a03a',b:'#fdf6e3'}],
    latlng:[51.1033, 71.3940], zoom:15,
    next:[{key:'ob1', label:'🏠 Общежитие'},{key:'un', label:'🏛️ В универ'}]
  },
  ob1: {
    key:'ob1', emoji:'🏠',
    age:'17–22 лет', title:'СТУДЕНЧЕСКОЕ ОБЩЕЖИТИЕ 🏠',
    charImg: CHAR_IMGS[5],
    bubble:'Сосед!',
    loc:'Общежитие NU, пр. Қабанбай батыр, 29',
    desc:'Первый раз вдали от дома. Маленькая комната, общая кухня, новые друзья из разных городов Казахстана. Учишься быть взрослым — считать деньги и время.',
    fc:'Образовательный кредит с отсрочкой: платить начнёшь через 6 месяцев после выпуска.',
    skills:[{t:'Самостоятельность',c:'#d97b3a',b:'#fef3e8'},{t:'Тайм-менеджмент',c:'#2a7a8c',b:'#e6f4f8'},{t:'Командность',c:'#3a9e6a',b:'#e8f6ee'}],
    latlng:[51.0888, 71.3995], zoom:15,
    next:[{key:'un', label:'🏛️ В универ'}]
  },
  un: {
    key:'un', emoji:'🏛️',
    age:'18–22 лет', title:'НАЗАРБАЕВ УН-Т 🏛️',
    charImg: CHAR_IMGS[5],
    bubble:'Диплом!',
    loc:'Nazarbayev University, пр. Қабанбай батыр, 53',
    desc:'Назарбаев Университет — лучший в Центральной Азии. Финансы и банковское дело. Стажировки, конференции, международные программы. Айдос растёт быстро.',
    fc:'Грант — снял депозит с процентами. Не грант — беззалоговый кредит под госгарантию.',
    skills:[{t:'Финансы',c:'#0f2844',b:'#e6f1f8'},{t:'Аналитика',c:'#c9a03a',b:'#fdf6e3'},{t:'Networking',c:'#3a9e6a',b:'#e8f6ee'}],
    latlng:[51.0904, 71.3984], zoom:15,
    next:[{key:'ob2', label:'🏠 Общежитие'},{key:'fc', label:'🏦 Финансовый центр'}]
  },
  ob2: {
    key:'ob2', emoji:'🏠',
    age:'18–23 лет', title:'КАМПУС УНИВЕРСИТЕТА 🏠',
    charImg: CHAR_IMGS[5],
    bubble:'Учусь!',
    loc:'Студенческий кампус NU, пр. Қабанбай батыр',
    desc:'Кампус — это целый город: стартапы, хакатоны, библиотека до полуночи. Айдос не спит, строит модели, спорит с профессорами. Тут куётся будущее.',
    fc:'Кредит закрывает учёбу. После выпуска — 10 лет на погашение, без штрафов за досрочку.',
    skills:[{t:'IT & финтех',c:'#3a9e6a',b:'#e8f6ee'},{t:'Исследования',c:'#2a7a8c',b:'#e6f4f8'},{t:'Стартап',c:'#d97b3a',b:'#fef3e8'}],
    latlng:[51.0875, 71.3960], zoom:15,
    next:[{key:'fc', label:'🏦 Финансовый центр'}]
  },
  fc: {
    key:'fc', emoji:'🏦',
    age:'23+ лет', title:'АО «ФИНАНСОВЫЙ ЦЕНТР» 🏦',
    charImg: CHAR_IMGS[6],
    bubble:'Мечта!',
    loc:'АО «Финансовый центр», пр. Мәңгілік Ел, 18',
    desc:'Айдос достиг своей мечты! Работает в организации, которая инвестирует в образование детей Казахстана. Теперь он сам строит это будущее — для следующего Айдоса. 🇰🇿',
    fc:'С рождения до диплома — депозит, ваучер, кредит. Незаметно. Именно поэтому Айдос здесь.',
    skills:[{t:'Инвестиции в будущее',c:'#c9a03a',b:'#fdf6e3'},{t:'Казахстан 2050',c:'#c45c5c',b:'#fceaea'}],
    latlng:[51.1176, 71.4363], zoom:16,
    next:[]
  }
};

// Порядок веток при «Вперёд»: кружки → основной путь → общежитие → учёба → работа
const BRANCH_PRIORITY = {
  kr1: 1, kr2: 1, kr3: 1,
  kg: 2, sc: 3, co: 4,
  ob1: 5, ob2: 5,
  un: 6,
  fc: 7
};

function getOrderedNext(node) {
  return [...node.next].sort(
    (a, b) => (BRANCH_PRIORITY[a.key] ?? 99) - (BRANCH_PRIORITY[b.key] ?? 99)
  );
}

function getForwardNextKey() {
  const ordered = getOrderedNext(NODES[history[history.length - 1]]);
  return ordered.length ? ordered[0].key : null;
}

function goForwardStep() {
  const key = getForwardNextKey();
  if (key) goTo(key);
}

// Обработка ошибок загрузки изображений персонажей
document.querySelectorAll('.char-img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const fallback = this.parentElement.querySelector('.char-fallback');
    if (fallback) fallback.style.display = 'flex';
  });
});

// ══════════════════════════════════════════════════
//  MAP SETUP
// ══════════════════════════════════════════════════
const map = L.map('map', {
    zoomControl: false,
    dragging: true,
    scrollWheelZoom: true,
    touchZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    attributionControl: false,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 70
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  opacity: 0.95,
  maxZoom: 19
}).addTo(map);
L.control.zoom({ position: 'topleft' }).addTo(map);
map.setView(NODES.rd.latlng, NODES.rd.zoom);

// Draw all connection lines between nodes
const CONNECTIONS = [
  ['rd','kg'],['kg','kr1'],['kg','sc'],['kr1','sc'],
  ['sc','kr2'],['sc','co'],['kr2','co'],
  ['co','kr3'],['co','ob1'],['co','un'],
  ['kr3','ob1'],['kr3','un'],
  ['ob1','un'],
  ['un','ob2'],['un','fc'],
  ['ob2','fc']
];
const lineObjs = {};
CONNECTIONS.forEach(([a,b]) => {
  const line = L.polyline([NODES[a].latlng, NODES[b].latlng], {
    color: '#b8c5d6', weight: 2.5, opacity: 0.55, dashArray: '8,6'
  }).addTo(map);
  lineObjs[a+'_'+b] = line;
});

function mkIcon(emoji, active, visited) {
    const s = active ? 48 : 38;
    const state = active ? 'active' : visited ? 'visited' : 'default';
    const fs = active ? 22 : 16;
    return L.divIcon({
        className: '',
        html: `<div class="map-marker map-marker--${state}" style="width:${s}px;height:${s}px;font-size:${fs}px;">${emoji}</div>`,
        iconSize: [s, s],
        iconAnchor: [s/2, s/2]
    });
}

// Create markers for all nodes
const markers = {};
Object.values(NODES).forEach(w => {
  const m = L.marker(w.latlng, { icon: mkIcon(w.emoji, false, false) })
    .addTo(map)
    .bindTooltip(w.title, { direction: 'top' });
  m.on('click', () => {
    const curNode = NODES[history[history.length-1]];
    if (curNode.next.some(n => n.key === w.key) || w.key === history[history.length-1]) {
      goTo(w.key);
    }
  });
  markers[w.key] = m;
});

// Highlight active path line
function highlightLine(fromKey, toKey) {
  const k1 = fromKey+'_'+toKey;
  const k2 = toKey+'_'+fromKey;
  const line = lineObjs[k1] || lineObjs[k2];
  if (line) line.setStyle({ color: '#e8b84a', weight: 4, opacity: 0.95, dashArray: null });
}

// ══════════════════════════════════════════════════
//  BUILD SLIDES
// ══════════════════════════════════════════════════
const sw = document.getElementById('slides-wrap');
Object.values(NODES).forEach((w) => {
    const d = document.createElement('div');
    d.className = 'slide' + (w.key==='rd'?' active':'');
    d.id = 'sl_'+w.key;

    const tags = w.skills ? w.skills.map(s =>
        `<span class="stag" style="color:${s.c};background:${s.b};border-color:${s.c}">${s.t}</span>`
    ).join('') : '';

    const locHtml = w.loc ? `<div class="loc-tag">📍 ${w.loc}</div>` : '';
    const skillsHtml = w.skills ? `<div class="skills">${tags}</div>` : '';
    d.innerHTML = `
      <div class="char-wrap">
        <img src="${w.charImg}" alt="Айдос" class="char-img" onerror="this.parentElement.setAttribute('data-error', 'true'); this.style.display='none'">
        <div class="char-fallback">${w.emoji}</div>
        <div class="bubble">${w.bubble}</div>
      </div>
      <div class="age-badge">${w.age}</div>
      <h2>${w.title}</h2>
      ${locHtml}
      <p>${w.desc}</p>
      ${skillsHtml}
      <div class="fc-strip">
        <div class="fc-strip-icon">🏦</div>
        <div class="fc-strip-text">${w.fc}</div>
      </div>
      ${w.next.length === 0 ? '<div class="finish-container"><span class="finish-badge">🏆 ФИНИШ!</span></div>' : ''}
    `;
    sw.appendChild(d);
});

// ══════════════════════════════════════════════════
//  MAP CHOICE POPUP
// ══════════════════════════════════════════════════
const mapPopup = document.getElementById('map-popup');
const mapPopupInner = document.getElementById('map-popup-inner');

function showMapPopup(key) {
  if (panelCollapsed) return;

  const node = NODES[key];
  mapPopupInner.innerHTML = '';

  if (node.next.length === 0) {
    mapPopup.classList.remove('visible');
    return;
  }

  getOrderedNext(node).forEach(nx => {
    const btn = document.createElement('button');
    btn.className = 'map-choice-btn';
    btn.textContent = nx.label;
    btn.onclick = () => goTo(nx.key);
    mapPopupInner.appendChild(btn);
  });

  positionOverlayAtMarker(mapPopup, node.latlng, 34);
  mapPopup.classList.add('visible');
}

function hideMapPopup() {
  mapPopup.classList.remove('visible');
}

map.on('move zoom zoomend', () => {
  repositionMapOverlays();
});

// ══════════════════════════════════════════════════
//  PANEL COLLAPSE + COMPACT STEP BUBBLE
// ══════════════════════════════════════════════════
const panel = document.getElementById('panel');
const panelToggle = document.getElementById('panel-toggle');
const compactStep = document.getElementById('compact-step');
const compactPin = document.getElementById('compact-pin');
const compactPinEmoji = document.getElementById('compact-pin-emoji');
const compactExpanded = document.getElementById('compact-step-expanded');
const compactAge = document.getElementById('compact-age');
const compactEmoji = document.getElementById('compact-emoji');
const compactTitle = document.getElementById('compact-title');
const compactDesc = document.getElementById('compact-desc');
const compactFc = document.getElementById('compact-fc');
const compactChoices = document.getElementById('compact-choices');
const cbp = document.getElementById('cbp');
const cbn = document.getElementById('cbn');
const ccn = document.getElementById('ccn');

let panelCollapsed = false;

function setPanelCollapsed(collapsed) {
  panelCollapsed = collapsed;
  document.body.classList.toggle('panel-collapsed', collapsed);
  panelToggle.setAttribute('aria-expanded', String(!collapsed));
  panelToggle.setAttribute(
    'aria-label',
    collapsed ? 'Развернуть панель пути' : 'Свернуть панель пути'
  );
  panelToggle.setAttribute('title', collapsed ? 'Развернуть панель' : 'Свернуть панель');
  panelToggle.textContent = collapsed ? '⟨' : '⟩';
  setTimeout(() => map.invalidateSize(), 360);
  refreshMapOverlays();
}

panelToggle.addEventListener('click', () => setPanelCollapsed(!panelCollapsed));

function positionOverlayAtMarker(el, latlng, offsetY) {
  const pt = map.latLngToContainerPoint(latlng);
  el.style.left = pt.x + 'px';
  el.style.top = pt.y + 'px';
  el.style.setProperty('--compact-offset', offsetY + 'px');
}

function getCompactZoomMode(node) {
  const z = map.getZoom();
  const target = node.zoom ?? 14;
  if (z < target - 2) return 'pin';
  if (z < target - 0.5) return 'medium';
  return 'full';
}

function applyCompactZoomMode(key) {
  const node = NODES[key];
  const mode = getCompactZoomMode(node);
  const z = map.getZoom();
  const target = node.zoom ?? 14;

  compactStep.classList.remove('compact-step--pin', 'compact-step--medium', 'compact-step--full');
  compactStep.classList.add('compact-step--' + mode);

  const t = Math.max(0, Math.min(1, (z - (target - 3)) / 3));
  let scale = 1;
  if (mode === 'medium') scale = 0.72 + t * 0.18;
  else if (mode === 'full') scale = 0.88 + t * 0.12;

  compactExpanded.style.setProperty('--compact-scale', String(scale));
  compactPin.title = mode === 'pin'
    ? `${node.title} — нажмите, чтобы приблизить`
    : node.title;
}

function repositionMapOverlays() {
  const curKey = history[history.length - 1];
  const node = NODES[curKey];
  if (panelCollapsed) {
    applyCompactZoomMode(curKey);
    const mode = getCompactZoomMode(node);
    const offsetY = mode === 'pin' ? 28 : 52;
    positionOverlayAtMarker(compactStep, node.latlng, offsetY);
  } else if (node.next.length > 0 && mapPopup.classList.contains('visible')) {
    positionOverlayAtMarker(mapPopup, node.latlng, 34);
  }
}

function hideCompactStep() {
  compactStep.classList.remove('visible');
}

function showCompactStep(key) {
  const node = NODES[key];
  const ordered = getOrderedNext(node);

  compactAge.textContent = node.age;
  compactEmoji.textContent = node.emoji;
  compactPinEmoji.textContent = node.emoji;
  compactTitle.textContent = node.title;
  compactDesc.textContent = node.desc;
  compactFc.innerHTML = '<span class="compact-fc-icon">🏦</span>' + node.fc;

  compactChoices.innerHTML = '';
  if (ordered.length > 1) {
    ordered.forEach(nx => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'compact-choice-btn';
      btn.textContent = nx.label;
      btn.onclick = () => goTo(nx.key);
      compactChoices.appendChild(btn);
    });
    compactChoices.hidden = false;
  } else {
    compactChoices.hidden = true;
  }

  if (node.next.length === 0) {
    compactStep.classList.add('compact-step--finish');
  } else {
    compactStep.classList.remove('compact-step--finish');
  }

  applyCompactZoomMode(key);
  const mode = getCompactZoomMode(node);
  positionOverlayAtMarker(compactStep, node.latlng, mode === 'pin' ? 28 : 52);
  compactStep.classList.add('visible');
}

compactPin.addEventListener('click', () => {
  const key = history[history.length - 1];
  const node = NODES[key];
  map.flyTo(node.latlng, node.zoom, { duration: 0.85, easeLinearity: 0.4 });
});

function refreshMapOverlays() {
  const key = history[history.length - 1];
  if (panelCollapsed) {
    hideMapPopup();
    showCompactStep(key);
  } else {
    hideCompactStep();
    const node = NODES[key];
    if (node.next.length > 0) {
      showMapPopup(key);
    } else {
      hideMapPopup();
    }
  }
}

let history = ['rd'];
const visited = new Set(['rd']);

const bp = document.getElementById('bp');
const bn = document.getElementById('bn');

function updateDots() {
  const dotsEl = document.getElementById('dots');
  dotsEl.innerHTML = '';
  history.forEach((key, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === history.length-1 ? ' active' : ' done');
    d.title = NODES[key].title;
    d.onclick = () => goBackTo(i);
    dotsEl.appendChild(d);
  });
}

function goTo(key) {
  const prevKey = history[history.length-1];
  if (key === prevKey) return;

  const prevSlide = document.getElementById('sl_'+prevKey);
  const nextSlide = document.getElementById('sl_'+key);

  nextSlide.style.transition = 'none';
  nextSlide.classList.remove('active','s-exit-fwd','s-exit-bwd','s-enter-fwd','s-enter-bwd');
  nextSlide.classList.add('s-enter-fwd');
  nextSlide.style.visibility = 'visible';
  void nextSlide.offsetWidth;
  prevSlide.classList.remove('active');
  prevSlide.classList.add('s-exit-fwd');
  nextSlide.style.transition = '';
  nextSlide.classList.remove('s-enter-fwd');
  nextSlide.classList.add('active');
  setTimeout(() => {
    prevSlide.classList.remove('s-exit-fwd','s-exit-bwd');
    prevSlide.style.visibility = '';
  }, 380);

  markers[prevKey].setIcon(mkIcon(NODES[prevKey].emoji, false, true));
  markers[key].setIcon(mkIcon(NODES[key].emoji, true, false));

  highlightLine(prevKey, key);

  history.push(key);
  visited.add(key);

  document.getElementById('cn').textContent = history.length;
  ccn.textContent = history.length;
  updateNavBtns();
  updateDots();

  map.flyTo(NODES[key].latlng, NODES[key].zoom, { duration: 1.2, easeLinearity: 0.4 });

  hideMapPopup();
  setTimeout(() => refreshMapOverlays(), 1300);
}

function goBackTo(idx) {
  if (idx >= history.length - 1) return;
  const key = history[idx];
  const prevKey = history[history.length-1];

  const prevSlide = document.getElementById('sl_'+prevKey);
  const nextSlide = document.getElementById('sl_'+key);

  nextSlide.style.transition = 'none';
  nextSlide.classList.remove('active','s-exit-fwd','s-exit-bwd','s-enter-fwd','s-enter-bwd');
  nextSlide.classList.add('s-enter-bwd');
  nextSlide.style.visibility = 'visible';
  void nextSlide.offsetWidth;
  prevSlide.classList.remove('active');
  prevSlide.classList.add('s-exit-bwd');
  nextSlide.style.transition = '';
  nextSlide.classList.remove('s-enter-bwd');
  nextSlide.classList.add('active');
  setTimeout(() => {
    prevSlide.classList.remove('s-exit-fwd','s-exit-bwd');
    prevSlide.style.visibility = '';
  }, 380);

  for (let k = idx+1; k < history.length; k++) {
    markers[history[k]].setIcon(mkIcon(NODES[history[k]].emoji, false, false));
    const a = history[k-1], b = history[k];
    const lk1 = a+'_'+b, lk2 = b+'_'+a;
    const line = lineObjs[lk1] || lineObjs[lk2];
    if (line) line.setStyle({ color: '#b8c5d6', weight: 2.5, opacity: 0.55, dashArray: '8,6' });
  }
  markers[key].setIcon(mkIcon(NODES[key].emoji, true, false));

  history = history.slice(0, idx+1);
  document.getElementById('cn').textContent = history.length;
  ccn.textContent = history.length;
  updateNavBtns();
  updateDots();
  map.flyTo(NODES[key].latlng, NODES[key].zoom, { duration: 1.2, easeLinearity: 0.4 });
  hideMapPopup();
  setTimeout(() => refreshMapOverlays(), 1300);
}

bp.addEventListener('click', () => { if (history.length > 1) goBackTo(history.length-2); });
cbp.addEventListener('click', () => { if (history.length > 1) goBackTo(history.length-2); });

function updateNavBtns() {
  const canBack = history.length > 1;
  const canForward = !!getForwardNextKey();

  bp.disabled = !canBack;
  cbp.disabled = !canBack;
  bn.disabled = !canForward;
  cbn.disabled = !canForward;
}

bn.addEventListener('click', goForwardStep);
cbn.addEventListener('click', goForwardStep);

document.addEventListener('keydown', e => {
  if (e.key==='ArrowLeft' && history.length > 1) goBackTo(history.length-2);
  if (e.key==='ArrowRight') goForwardStep();
});

document.getElementById('tn').textContent = '?';
document.getElementById('cn').textContent = '1';
ccn.textContent = '1';
bp.disabled = true;
cbp.disabled = true;
updateNavBtns();

updateDots();
markers['rd'].setIcon(mkIcon(NODES['rd'].emoji, true, false));
setTimeout(() => refreshMapOverlays(), 500);

// Fade hint
const hint = document.getElementById('hint');
setTimeout(() => { hint.style.opacity='0'; }, 5000);
document.addEventListener('click', () => { hint.style.opacity='0'; }, {once:true});