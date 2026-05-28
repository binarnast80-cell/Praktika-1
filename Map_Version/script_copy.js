
// ══════════════════════════════════════════════════
//  CHARACTER IMAGE FILES — замени пути на свои PNG
// ══════════════════════════════════════════════════
const CHAR_IMGS = [
    'C://Users//User//Downloads//char_1_sads.png',      // 1. Роддом / Детский сад
    'C://Users//User//Downloads//char_2_schools.png',   // 2. Школа
    'C://Users//User//Downloads//char_3_musicss.png',   // 3. Кружки
    'C://Users//User//Downloads//char_4_martials.png',  // 4. Казақ күресі
    'C://Users//User//Downloads//char_5_colleges.png',  // 5. Колледж
    'C://Users//User//Downloads//char_6_unis.png',      // 6. Университет
    'C://Users//User//Downloads//char_7_fcs.png',       // 7. Финансовый центр
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
    loc:'Роддом №1, Астана',
    desc:'Айдос только появился на свет — крошечный, громкий, весь в будущем! Родители ещё не знают, каким он вырастет. Но уже сейчас можно сделать первый шаг.',
    fc:'Открыл депозит на новорождённого → государство зачислило стартовые 235 920 ₸.',
    skills:[{t:'День рождения',c:'#FF3B3B',b:'#FFF0F0'},{t:'Первый вдох',c:'#5BB8FF',b:'#EEF8FF'},{t:'Большие мечты',c:'#6B3FA0',b:'#F5EEFF'}],
    latlng:[51.1700, 71.4200], zoom:13,
    next:[{key:'kg', label:'В садик →'}]
  },
  kg: {
    key:'kg', emoji:'🧸',
    age:'3–6 лет', title:'ДЕТСКИЙ САД 🧸',
    charImg: CHAR_IMGS[0],
    bubble:'Привет!',
    loc:'Мкр. Сарыарка, Астана',
    desc:'Айдос делает первые шаги! Новые друзья, казахские сказки и первые слова на трёх языках. Мечты такие большие, как весь Казахстан!',
    fc:'Депозит копится: банк начисляет %, государство добавляет премию 5–7% в год.',
    skills:[{t:'Дружба',c:'#FF8C42',b:'#FFF3E8'},{t:'Қазақша',c:'#2ECC40',b:'#EDFFF0'},{t:'Творчество',c:'#6B3FA0',b:'#F5EEFF'}],
    latlng:[51.1620, 71.3780], zoom:14,
    next:[{key:'kr1', label:'🎨 Доп. кружки'},{key:'sc', label:'📚 В школу'}]
  },
  kr1: {
    key:'kr1', emoji:'🎨',
    age:'4–6 лет', title:'ДОП. КРУЖКИ (ДОШКОЛ.) 🎨',
    charImg: CHAR_IMGS[2],
    bubble:'Творю!',
    loc:'ДЮЦ «Жас Өркен», Астана',
    desc:'Рисование, лепка, танцы — Айдос пробует всё! Пальцы в краске, язык высунут от старания. Каждый кружок — это новый мир, открытый настежь.',
    fc:'Накопления защищены от арестов и списаний — до 10 млн ₸ под госгарантией.',
    skills:[{t:'Творчество',c:'#6B3FA0',b:'#F5EEFF'},{t:'Усидчивость',c:'#3A7BD5',b:'#EEF5FF'},{t:'Любопытство',c:'#FF8C42',b:'#FFF3E8'}],
    latlng:[51.1780, 71.3500], zoom:14,
    next:[{key:'sc', label:'📚 В школу'}]
  },
  sc: {
    key:'sc', emoji:'📚',
    age:'7–11 лет', title:'НАЧАЛЬНАЯ ШКОЛА 📚',
    charImg: CHAR_IMGS[1],
    bubble:'Пятёрка!',
    loc:'Школа №47, Левобережье',
    desc:'Первый звонок! Айдос в синей форме с огромным портфелем. Математика, казахский, русский — и первые пятёрки в дневнике. Жизнь становится серьёзнее.',
    fc:'Госпремия на депозит начисляется каждый год — деньги растут, пока Айдос сидит на уроках.',
    skills:[{t:'Математика',c:'#1A2E5A',b:'#EEF2FF'},{t:'Чтение',c:'#FF3B3B',b:'#FFF0F0'},{t:'Спорт',c:'#2ECC40',b:'#EDFFF0'}],
    latlng:[51.1850, 71.4550], zoom:14,
    next:[{key:'kr2', label:'🎵 Доп. кружки'},{key:'co', label:'🎒 В колледж'}]
  },
  kr2: {
    key:'kr2', emoji:'🎵',
    age:'10–14 лет', title:'ДОП. КРУЖКИ (ШКОЛА) 🎵',
    charImg: CHAR_IMGS[2],
    bubble:'♪ кюй ♪',
    loc:'Школа им. Курмангазы, Астана',
    desc:'По вечерам — домбра. Пальцы болят, зато кюй Курмангазы звучит всё лучше. Айдос учится слышать душу казахской музыки — и терпеть, и добиваться.',
    fc:'% по депозиту капают. Никто не тронет — защита от арестов и третьих лиц.',
    skills:[{t:'Домбра',c:'#6B3FA0',b:'#F5EEFF'},{t:'Нотная грамота',c:'#FFD21F',b:'#FFFBE8'},{t:'Дисциплина',c:'#3A7BD5',b:'#EEF5FF'}],
    latlng:[51.1950, 71.4720], zoom:14,
    next:[{key:'co', label:'🎒 В колледж'}]
  },
  co: {
    key:'co', emoji:'🎒',
    age:'15–18 лет', title:'КОЛЛЕДЖ 🎒',
    charImg: CHAR_IMGS[4],
    bubble:'Профи!',
    loc:'Колледж «Байтерек», Астана',
    desc:'Время серьёзных решений. Айдос влюбился в экономику — таблицы, рынки, цифры. Олимпиады, английский, первые стажировки. Всё ради большой мечты.',
    fc:'Накопленный депозит идёт на оплату колледжа. Не хватает — кредит до 10 лет без залога.',
    skills:[{t:'Экономика',c:'#3A7BD5',b:'#EEF5FF'},{t:'English',c:'#2ECC40',b:'#EDFFF0'},{t:'Лидерство',c:'#FF3B3B',b:'#FFF0F0'}],
    latlng:[51.1480, 71.4050], zoom:13,
    next:[{key:'kr3', label:'🥋 Доп. кружки'},{key:'ob1', label:'🏠 Общежитие'},{key:'un', label:'🏛️ В универ'}]
  },
  kr3: {
    key:'kr3', emoji:'🥋',
    age:'15–19 лет', title:'КАЗАҚ КҮРЕСІ 🥋',
    charImg: CHAR_IMGS[3],
    bubble:'Батыр!',
    loc:'СК «Казахстан», Астана',
    desc:'Три раза в неделю — тренировки. Айдос — БАТЫР! Красный пояс, золото на городских соревнованиях. Воля плюс тело плюс характер — это и есть победа.',
    fc:'Ваучер покрыл колледж. Айдос думает о борьбе, не о деньгах.',
    skills:[{t:'Казақ Күресі',c:'#FF3B3B',b:'#FFF0F0'},{t:'Стратегия',c:'#1A2E5A',b:'#EEF2FF'},{t:'Характер',c:'#FFD21F',b:'#FFFBE8'}],
    latlng:[51.1300, 71.3700], zoom:13,
    next:[{key:'ob1', label:'🏠 Общежитие'},{key:'un', label:'🏛️ В универ'}]
  },
  ob1: {
    key:'ob1', emoji:'🏠',
    age:'17–22 лет', title:'СТУДЕНЧЕСКОЕ ОБЩЕЖИТИЕ 🏠',
    charImg: CHAR_IMGS[5],
    bubble:'Сосед!',
    loc:'Студенческий корпус, Астана',
    desc:'Первый раз вдали от дома. Маленькая комната, общая кухня, новые друзья из разных городов Казахстана. Учишься быть взрослым — считать деньги и время.',
    fc:'Образовательный кредит с отсрочкой: платить начнёшь через 6 месяцев после выпуска.',
    skills:[{t:'Самостоятельность',c:'#FF8C42',b:'#FFF3E8'},{t:'Тайм-менеджмент',c:'#3A7BD5',b:'#EEF5FF'},{t:'Командность',c:'#2ECC40',b:'#EDFFF0'}],
    latlng:[51.0980, 71.4480], zoom:14,
    next:[{key:'un', label:'🏛️ В универ'}]
  },
  un: {
    key:'un', emoji:'🏛️',
    age:'18–22 лет', title:'НАЗАРБАЕВ УН-Т 🏛️',
    charImg: CHAR_IMGS[5],
    bubble:'Диплом!',
    loc:'Nazarbayev University, Астана',
    desc:'Назарбаев Университет — лучший в Центральной Азии. Финансы и банковское дело. Стажировки, конференции, международные программы. Айдос растёт быстро.',
    fc:'Грант — снял депозит с процентами. Не грант — беззалоговый кредит под госгарантию.',
    skills:[{t:'Финансы',c:'#1A2E5A',b:'#EEF2FF'},{t:'Аналитика',c:'#FFD21F',b:'#FFFBE8'},{t:'Networking',c:'#2ECC40',b:'#EDFFF0'}],
    latlng:[51.0892, 71.4218], zoom:14,
    next:[{key:'ob2', label:'🏠 Общежитие'},{key:'fc', label:'🏦 Финансовый центр'}]
  },
  ob2: {
    key:'ob2', emoji:'🏠',
    age:'18–23 лет', title:'КАМПУС УНИВЕРСИТЕТА 🏠',
    charImg: CHAR_IMGS[5],
    bubble:'Учусь!',
    loc:'Студенческий кампус NU, Астана',
    desc:'Кампус — это целый город: стартапы, хакатоны, библиотека до полуночи. Айдос не спит, строит модели, спорит с профессорами. Тут куётся будущее.',
    fc:'Кредит закрывает учёбу. После выпуска — 10 лет на погашение, без штрафов за досрочку.',
    skills:[{t:'IT & финтех',c:'#2ECC40',b:'#EDFFF0'},{t:'Исследования',c:'#3A7BD5',b:'#EEF5FF'},{t:'Стартап',c:'#FF8C42',b:'#FFF3E8'}],
    latlng:[51.0820, 71.3850], zoom:14,
    next:[{key:'fc', label:'🏦 Финансовый центр'}]
  },
  fc: {
    key:'fc', emoji:'🏦',
    age:'23+ лет', title:'АО «ФИНАНСОВЫЙ ЦЕНТР» 🏦',
    charImg: CHAR_IMGS[6],
    bubble:'Мечта!',
    loc:'ул. Мәңгілік Ел, 18, Астана',
    desc:'Айдос достиг своей мечты! Работает в организации, которая инвестирует в образование детей Казахстана. Теперь он сам строит это будущее — для следующего Айдоса. 🇰🇿',
    fc:'С рождения до диплома — депозит, ваучер, кредит. Незаметно. Именно поэтому Айдос здесь.',
    skills:[{t:'Инвестиции в будущее',c:'#FFD21F',b:'#FFFBE8'},{t:'Казахстан 2050',c:'#FF3B3B',b:'#FFF0F0'}],
    latlng:[51.1120, 71.4780], zoom:14,
    next:[]
  }
};

// ══════════════════════════════════════════════════
//  MAP SETUP
// ══════════════════════════════════════════════════
const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    attributionControl: false
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { opacity: 1 }).addTo(map);
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
    color: '#aaa', weight: 2, opacity: 0.35, dashArray: '6,5'
  }).addTo(map);
  lineObjs[a+'_'+b] = line;
});

function mkIcon(emoji, active, visited) {
    const s = active ? 50 : 36;
    const bg = active ? '#FFD21F' : visited ? '#c8e6c9' : '#FFF8E1';
    const bdr = active ? '4px solid #1A1A1A' : '3px solid #1A1A1A';
    const sh = active ? '3px 3px 0 #1A1A1A' : '2px 2px 0 #1A1A1A';
    return L.divIcon({
        className: '',
        html: `<div style="width:${s}px;height:${s}px;background:${bg};border:${bdr};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:${active?22:15}px;box-shadow:${sh};cursor:pointer;">${emoji}</div>`,
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
  if (line) line.setStyle({ color: '#FFD21F', weight: 4, opacity: 0.9, dashArray: '10,6' });
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
        <img src="${w.charImg}" alt="Айдос" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'">
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
      ${w.next.length === 0 ? '<div style="margin-top:6px"><span class="finish-badge">🏆 ФИНИШ!</span></div>' : ''}
    `;
    sw.appendChild(d);
});

// ══════════════════════════════════════════════════
//  MAP CHOICE POPUP
// ══════════════════════════════════════════════════
const mapPopup = document.getElementById('map-popup');
const mapPopupInner = document.getElementById('map-popup-inner');

function showMapPopup(key) {
  const node = NODES[key];
  mapPopupInner.innerHTML = '';

  if (node.next.length === 0) {
    mapPopup.classList.remove('visible');
    return;
  }

  node.next.forEach(nx => {
    const btn = document.createElement('button');
    btn.className = 'map-choice-btn';
    btn.textContent = nx.label;
    btn.onclick = () => goTo(nx.key);
    mapPopupInner.appendChild(btn);
  });

  const pt = map.latLngToContainerPoint(node.latlng);
  mapPopup.style.left = pt.x + 'px';
  mapPopup.style.top = pt.y + 'px';
  mapPopup.classList.add('visible');
}

function hideMapPopup() {
  mapPopup.classList.remove('visible');
}

map.on('move zoom', () => {
  const curKey = history[history.length - 1];
  const node = NODES[curKey];
  if (node.next.length > 0 && mapPopup.classList.contains('visible')) {
    const pt = map.latLngToContainerPoint(node.latlng);
    mapPopup.style.left = pt.x + 'px';
    mapPopup.style.top = pt.y + 'px';
  }
});


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
  updateNavBtns();
  updateDots();

  map.flyTo(NODES[key].latlng, NODES[key].zoom, { duration: 1.2, easeLinearity: 0.4 });

  hideMapPopup();
  setTimeout(() => showMapPopup(key), 1300);
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
    if (line) line.setStyle({ color: '#aaa', weight: 2, opacity: 0.35, dashArray: '6,5' });
  }
  markers[key].setIcon(mkIcon(NODES[key].emoji, true, false));

  history = history.slice(0, idx+1);
  document.getElementById('cn').textContent = history.length;
  updateNavBtns();
  updateDots();
  map.flyTo(NODES[key].latlng, NODES[key].zoom, { duration: 1.2, easeLinearity: 0.4 });
  hideMapPopup();
  setTimeout(() => showMapPopup(key), 1300);
}

bp.addEventListener('click', () => { if (history.length > 1) goBackTo(history.length-2); });

function updateNavBtns() {
  bp.disabled = history.length <= 1;
  const curNode = NODES[history[history.length-1]];
  bn.disabled = curNode.next.length === 0;
}

bn.addEventListener('click', () => {
  const curNode = NODES[history[history.length-1]];
  if (curNode.next.length > 0) goTo(curNode.next[0].key);
});

document.addEventListener('keydown', e => {
  if (e.key==='ArrowLeft' && history.length > 1) goBackTo(history.length-2);
  if (e.key==='ArrowRight') {
    const curNode = NODES[history[history.length-1]];
    if (curNode.next.length === 1) goTo(curNode.next[0].key);
  }
});

document.getElementById('tn').textContent = '?';
document.getElementById('cn').textContent = '1';
bp.disabled = true;
updateNavBtns();

updateDots();
markers['rd'].setIcon(mkIcon(NODES['rd'].emoji, true, false));
setTimeout(() => showMapPopup('rd'), 500);

// Fade hint
const hint = document.getElementById('hint');
setTimeout(() => { hint.style.opacity='0'; }, 5000);
document.addEventListener('click', () => { hint.style.opacity='0'; }, {once:true});