// ══════════════════════════════════════════════════
//  MAIN PATH vs optional branches
// ══════════════════════════════════════════════════
const MAIN_PATH = ['rd', 'kg', 'sc', 'co', 'un', 'fc'];

const MAIN_NEXT = {
  rd: 'kg',
  kg: 'sc',
  sc: 'co',
  co: 'un',
  un: 'fc',
  fc: null
};

const BRANCH_NODES = new Set(['kr1', 'kr2', 'kr3', 'ob1', 'ob2']);

// ══════════════════════════════════════════════════
//  CHARACTER — девочка Айдана
// ══════════════════════════════════════════════════
const CHAR = {
  baby: './image/baby.png',
  kg: './image/child.png',
  school: './image/schoolgirl.png',
  college: './image/collage.png',
  uni: './image/univer.png',
  work: './image/job.png',
  drawing: './image/drawning_club4-6year.png',
  music: './image/dombra12year.png',
  vocal: './image/vocal16year.png',
  dorm: './image/dormitary16year.png',
  campus: './image/campus.png',
};

const NODES = {
  rd: {
    key: 'rd', emoji: '🏥',
    age: '0 лет', title: 'РОДДОМ 🏥',
    charImg: CHAR.baby, grow: 0.5, motion: 'crawl',
    bubble: 'Уа-уа!',
    desc: 'Айдана только появилась на свет — крошечная, громкая, вся в будущем! Родители ещё не знают, какой она вырастет. Но уже сейчас можно сделать первый шаг.',
    fc: 'Открыли депозит на новорождённого → государство зачислило стартовые 235 920 ₸.',
    skills: [{ t: 'День рождения', c: '#c45c5c', b: '#fceaea' }, { t: 'Первый вдох', c: '#2db8a4', b: '#e6f7f4' }, { t: 'Большие мечты', c: '#6b5b95', b: '#f0ecf8' }],
    next: [{ key: 'kg', label: 'В садик →' }]
  },
  kg: {
    key: 'kg', emoji: '🧸',
    age: '3–6 лет', title: 'ДЕТСКИЙ САД 🧸',
    charImg: CHAR.kg, grow: 0.65, motion: 'wobble',
    bubble: 'Привет!',
    desc: 'Айдана делает первые шаги! Новые друзья, сказки и первые слова на трёх языках. Мечты такие большие, как весь Казахстан!',
    fc: 'Депозит копится: банк начисляет %, государство добавляет премию 5–7% в год.',
    skills: [{ t: 'Дружба', c: '#d97b3a', b: '#fef3e8' }, { t: 'Қазақша', c: '#3a9e6a', b: '#e8f6ee' }, { t: 'Творчество', c: '#6b5b95', b: '#f0ecf8' }],
    next: [{ key: 'kr1', label: '🎨 Доп. кружки' }, { key: 'sc', label: '📚 В школу →' }]
  },
  kr1: {
    key: 'kr1', emoji: '🎨', isBranch: true,
    age: '4–6 лет', title: 'ДОП. КРУЖКИ (ДОШКОЛ.) 🎨',
    charImg: CHAR.drawing, grow: 0.54, motion: 'hop',
    bubble: 'Творю!',
    desc: 'Рисование, лепка, танцы — Айдана пробует всё! Пальцы в краске, язык высунут от старания. Каждый кружок — новый мир.',
    fc: 'Накопления защищены от арестов и списаний — до 10 млн ₸ под госгарантией.',
    skills: [{ t: 'Творчество', c: '#6b5b95', b: '#f0ecf8' }, { t: 'Усидчивость', c: '#2a7a8c', b: '#e6f4f8' }, { t: 'Любопытство', c: '#d97b3a', b: '#fef3e8' }],
    next: [{ key: 'sc', label: '📚 В школу →' }]
  },
  sc: {
    key: 'sc', emoji: '📚',
    age: '7–11 лет', title: 'НАЧАЛЬНАЯ ШКОЛА 📚',
    charImg: CHAR.school, grow: 0.75, motion: 'run',
    bubble: 'Пятёрка!',
    desc: 'Первый звонок! Айдана в синей форме с огромным рюкзаком бежит на уроки. Математика, казахский, русский — и первые пятёрки в дневнике.',
    fc: 'Госпремия на депозит начисляется каждый год — деньги растут, пока Айдана сидит на уроках.',
    skills: [{ t: 'Математика', c: '#0f2844', b: '#e6f1f8' }, { t: 'Чтение', c: '#c45c5c', b: '#fceaea' }, { t: 'Спорт', c: '#3a9e6a', b: '#e8f6ee' }],
    next: [{ key: 'kr2', label: '🎵 Доп. кружки' }, { key: 'co', label: '🎒 В колледж →' }]
  },
  kr2: {
    key: 'kr2', emoji: '🎵', isBranch: true,
    age: '10–14 лет', title: 'ДОП. КРУЖКИ (ШКОЛА) 🎵',
    charImg: CHAR.music, grow: 0.68, motion: 'hop',
    bubble: '♪ кюй ♪',
    desc: 'По вечерам — домбра. Пальцы болят, зато кюй Курмангазы звучит всё лучше. Айдана учится слышать душу казахской музыки.',
    fc: '% по депозиту капают. Никто не тронет — защита от арестов и третьих лиц.',
    skills: [{ t: 'Домбра', c: '#6b5b95', b: '#f0ecf8' }, { t: 'Нотная грамота', c: '#c9a03a', b: '#fdf6e3' }, { t: 'Дисциплина', c: '#2a7a8c', b: '#e6f4f8' }],
    next: [{ key: 'co', label: '🎒 В колледж →' }]
  },
  co: {
    key: 'co', emoji: '🎒',
    age: '15–18 лет', title: 'КОЛЛЕДЖ 🎒',
    charImg: CHAR.college, grow: 0.88, motion: 'walk',
    bubble: 'Профи!',
    desc: 'Время серьёзных решений. Айдана влюбилась в экономику — таблицы, рынки, цифры. Олимпиады, английский, первые стажировки.',
    fc: 'Накопленный депозит идёт на оплату колледжа. Не хватает — кредит до 10 лет без залога.',
    skills: [{ t: 'Экономика', c: '#2a7a8c', b: '#e6f4f8' }, { t: 'English', c: '#3a9e6a', b: '#e8f6ee' }, { t: 'Лидерство', c: '#c45c5c', b: '#fceaea' }],
    next: [{ key: 'kr3', label: '🥋 Доп. кружки' }, { key: 'ob1', label: '🏠 Общежитие' }, { key: 'un', label: '🏛️ В универ →' }]
  },
  kr3: {
    key: 'kr3', emoji: '🎤', isBranch: true,
    age: '15–19 лет', title: 'ВОКАЛЬНЫЙ КРУЖОК 🎤',
    charImg: CHAR.vocal, grow: 0.8, motion: 'stride',
    bubble: 'Пою!',
    desc: 'По вечерам — репетиции. Айдана учится владеть голосом, выступает на сцене и растёт в артистичности.',
    fc: 'Ваучер покрыл колледж. Айдана думает о музыке, не о деньгах.',
    skills: [{ t: 'Вокал', c: '#c45c5c', b: '#fceaea' }, { t: 'Постановка голоса', c: '#0f2844', b: '#e6f1f8' }, { t: 'Самовыражение', c: '#c9a03a', b: '#fdf6e3' }],
    next: [{ key: 'ob1', label: '🏠 Общежитие' }, { key: 'un', label: '🏛️ В универ →' }]
  },
  ob1: {
    key: 'ob1', emoji: '🏠', isBranch: true,
    age: '17–22 лет', title: 'СТУДЕНЧЕСКОЕ ОБЩЕЖИТИЕ 🏠',
    charImg: CHAR.dorm, grow: 0.84, motion: 'walk',
    bubble: 'Сосед!',
    desc: 'Первый раз вдали от дома. Маленькая комната, общая кухня, новые друзья из разных городов. Учится быть взрослой — считать деньги и время.',
    fc: 'Образовательный кредит с отсрочкой: платить начнёшь через 6 месяцев после выпуска.',
    skills: [{ t: 'Самостоятельность', c: '#d97b3a', b: '#fef3e8' }, { t: 'Тайм-менеджмент', c: '#2a7a8c', b: '#e6f4f8' }, { t: 'Командность', c: '#3a9e6a', b: '#e8f6ee' }],
    next: [{ key: 'kr3', label: '🎤 Вокал' }, { key: 'un', label: '🏛️ В универ →' }]
  },
  un: {
    key: 'un', emoji: '🏛️',
    age: '18–22 лет', title: 'НАЗАРБАЕВ УН-Т 🏛️',
    charImg: CHAR.uni, grow: 0.96, motion: 'calm',
    bubble: 'Диплом!',
    desc: 'Назарбаев Университет — лучший в Центральной Азии. Финансы и банковское дело. Айдана спокойно идёт с портфелем между лекциями и стажировками.',
    fc: 'Грант — снял депозит с процентами. Не грант — беззалоговый кредит под госгарантию.',
    skills: [{ t: 'Финансы', c: '#0f2844', b: '#e6f1f8' }, { t: 'Аналитика', c: '#c9a03a', b: '#fdf6e3' }, { t: 'Networking', c: '#3a9e6a', b: '#e8f6ee' }],
    next: [{ key: 'ob2', label: '🏠 Кампус' }, { key: 'fc', label: '🏦 Первая работа →' }]
  },
  ob2: {
    key: 'ob2', emoji: '🏠', isBranch: true,
    age: '18–23 лет', title: 'КАМПУС УНИВЕРСИТЕТА 🏠',
    charImg: CHAR.campus, grow: 0.92, motion: 'walk',
    bubble: 'Учусь!',
    desc: 'Кампус — целый город: стартапы, хакатоны, библиотека до полуночи. Айдана строит модели и спорит с профессорами.',
    fc: 'Кредит закрывает учёбу. После выпуска — 10 лет на погашение, без штрафов за досрочку.',
    skills: [{ t: 'IT & финтех', c: '#3a9e6a', b: '#e8f6ee' }, { t: 'Исследования', c: '#2a7a8c', b: '#e6f4f8' }, { t: 'Стартап', c: '#d97b3a', b: '#fef3e8' }],
    next: [{ key: 'fc', label: '🏦 Первая работа →' }]
  },
  fc: {
    key: 'fc', emoji: '🏦',
    age: '23+ лет', title: 'АО «ФИНАНСОВЫЙ ЦЕНТР» 🏦',
    charImg: CHAR.work, grow: 1, motion: 'pro',
    bubble: 'Мечта!',
    desc: 'Айдана достигла мечты! Работает в организации, которая инвестирует в образование детей Казахстана. Теперь она сама строит это будущее. 🇰🇿',
    fc: 'С рождения до диплома — депозит, ваучер, кредит. Незаметно. Именно поэтому Айдана здесь.',
    skills: [{ t: 'Инвестиции в будущее', c: '#c9a03a', b: '#fdf6e3' }, { t: 'Казахстан 2050', c: '#c45c5c', b: '#fceaea' }],
    next: []
  }
};

const BRANCH_PRIORITY = {
  kr1: 1, kr2: 1, kr3: 1,
  ob1: 5, ob2: 5
};

function getOrderedNext(node) {
  const available = node.next.filter(n => !history.includes(n.key));
  return [...available].sort((a, b) => {
    const aMain = MAIN_PATH.includes(a.key) ? 0 : 1;
    const bMain = MAIN_PATH.includes(b.key) ? 0 : 1;
    if (aMain !== bMain) return aMain - bMain;
    return (BRANCH_PRIORITY[a.key] ?? 99) - (BRANCH_PRIORITY[b.key] ?? 99);
  });
}

function getForwardNextKey() {
  const curKey = history[history.length - 1];
  const node = NODES[curKey];

  if (MAIN_PATH.includes(curKey)) {
    const mainNext = MAIN_NEXT[curKey];
    if (mainNext && node.next.some(n => n.key === mainNext) && !history.includes(mainNext)) return mainNext;
  }

  const ordered = getOrderedNext(node);
  const mainOption = ordered.find(n => MAIN_PATH.includes(n.key));
  if (mainOption) return mainOption.key;

  return ordered.length ? ordered[0].key : null;
}

function goForwardStep() {
  const key = getForwardNextKey();
  if (key) goTo(key);
}

function findLastMainInHistory() {
  for (let i = history.length - 1; i >= 0; i--) {
    if (MAIN_PATH.includes(history[i])) return history[i];
  }
  return MAIN_PATH[0];
}

function getMainVisualState(mainKey) {
  const cur = history[history.length - 1];
  const mainIdx = MAIN_PATH.indexOf(mainKey);
  const lastMain = findLastMainInHistory();
  const lastMainIdx = MAIN_PATH.indexOf(lastMain);

  if (cur === mainKey) return 'active';
  if (history.includes(mainKey)) return 'visited';
  if (mainIdx < lastMainIdx) return 'visited';
  return 'future';
}

function collectBranchesAfterMain(mainKey) {
  const startIdx = history.indexOf(mainKey);
  if (startIdx === -1) return [];
  const branches = [];
  for (let i = startIdx + 1; i < history.length; i++) {
    if (MAIN_PATH.includes(history[i])) break;
    if (BRANCH_NODES.has(history[i]) && !branches.includes(history[i])) {
      branches.push(history[i]);
    }
  }
  return branches;
}

// ══════════════════════════════════════════════════
//  DOM REFS
// ══════════════════════════════════════════════════
const timelineNodesEl = document.getElementById('timeline-nodes');
const timelineLineFill = document.getElementById('timeline-line-fill');
const stepChoices = document.getElementById('step-choices');
const journeyWalker = document.getElementById('journey-walker');
const walkerImg = document.getElementById('walker-img');
const fireworksOverlay = document.getElementById('fireworks-overlay');

let history = ['rd'];
const visited = new Set(['rd']);

// ══════════════════════════════════════════════════
//  TIMELINE + WALKER
// ══════════════════════════════════════════════════
function createMarkerButton(node, state, key, isBranch) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'timeline-marker timeline-marker--' + state;
  if (isBranch) btn.classList.add('timeline-marker--branch');
  btn.dataset.key = key;
  btn.setAttribute('aria-label', node.title);
  btn.setAttribute('aria-current', state === 'active' ? 'step' : 'false');
  if (state === 'future') btn.disabled = true;

  const icon = document.createElement('span');
  icon.className = 'timeline-marker-icon';
  icon.textContent = node.emoji;

  const label = document.createElement('span');
  label.className = 'timeline-marker-label';
  if (!isBranch) {
    label.textContent = node.age;
  } else {
    label.classList.add('timeline-marker-label--hidden');
  }

  const title = document.createElement('span');
  title.className = 'timeline-marker-title';
  const rawTitle = node.title.replace(/[^\u0400-\u04FF\s]/g, '').trim();
  if (isBranch) {
    title.textContent = rawTitle.replace(/^(?:ДОП(?:\.|ОЛЬНОЕ)?\s*)/i, '').trim().split(' ').slice(0, 2).join(' ');
  } else {
    title.textContent = rawTitle.split(' ')[0];
  }

  btn.append(icon, label, title);

  if (state !== 'future') {
    btn.addEventListener('click', () => {
      const idx = history.indexOf(key);
      if (idx !== -1) goBackTo(idx);
    });
  }

  return btn;
}

function buildTimelineMarkers() {
  timelineNodesEl.innerHTML = '';

  MAIN_PATH.forEach(mainKey => {
    const node = NODES[mainKey];
    const state = getMainVisualState(mainKey);
    const li = document.createElement('li');
    li.className = 'timeline-node timeline-node--main timeline-node--' + state;
    li.dataset.key = mainKey;

    li.appendChild(createMarkerButton(node, state, mainKey, false));

    const branches = collectBranchesAfterMain(mainKey);
    if (branches.length) {
      const branchGroup = document.createElement('div');
      branchGroup.className = 'timeline-branch-group' + (branches.length > 1 ? ' timeline-branch-group--multi' : '');
      branches.forEach(bKey => {
        const bNode = NODES[bKey];
        const bState = history[history.length - 1] === bKey ? 'active' : 'visited';
        const branchEl = document.createElement('div');
        branchEl.className = 'timeline-branch-node timeline-branch-node--' + bState;
        branchEl.dataset.key = bKey;
        branchEl.appendChild(createMarkerButton(bNode, bState, bKey, true));
        branchGroup.appendChild(branchEl);
      });
      li.appendChild(branchGroup);
    }

    timelineNodesEl.appendChild(li);
  });

  requestAnimationFrame(() => {
    updateTimelineProgress();
    updateWalker(true);
  });
}

function getActiveMarkerEl() {
  const cur = history[history.length - 1];
  const branchMarker = document.querySelector(`.timeline-branch-node[data-key="${cur}"] .timeline-marker`);
  if (branchMarker) return branchMarker;
  return document.querySelector(`.timeline-node--main[data-key="${cur}"] .timeline-marker`);
}

function updateWalker(animate) {
  const key = history[history.length - 1];
  const node = NODES[key];
  const track = document.getElementById('timeline-track');
  const marker = getActiveMarkerEl();

  journeyWalker.className = 'journey-walker journey-walker--motion-' + node.motion;
  if (animate) journeyWalker.classList.add('journey-walker--moving');
  journeyWalker.style.setProperty('--walker-grow', String(node.grow));
  walkerImg.src = node.charImg;
  walkerImg.alt = 'Айдана';

  const fxClasses = ['walker-fx--sparkle', 'walker-fx--dust', 'walker-fx--notes'];
  journeyWalker.classList.remove(...fxClasses);
  if (node.motion === 'crawl' || node.motion === 'wobble') journeyWalker.classList.add('walker-fx--sparkle');
  if (node.motion === 'run' || node.motion === 'stride') journeyWalker.classList.add('walker-fx--dust');
  if (node.motion === 'hop') journeyWalker.classList.add('walker-fx--notes');

  if (!marker || !track) return;

  const trackRect = track.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  const x = markerRect.left + markerRect.width / 2 - trackRect.left;
  const y = markerRect.top - trackRect.top - 8;

  journeyWalker.style.setProperty('--walker-x', x + 'px');
  journeyWalker.style.setProperty('--walker-y', y + 'px');
  journeyWalker.setAttribute('aria-hidden', 'false');

  if (animate) {
    setTimeout(() => journeyWalker.classList.remove('journey-walker--moving'), 1100);
  }
}

function updateTimelineProgress() {
  const mainNodes = timelineNodesEl.querySelectorAll('.timeline-node--main');
  if (mainNodes.length < 2) {
    timelineLineFill.classList.add('timeline-line--short');
    return;
  }
  timelineLineFill.classList.remove('timeline-line--short');

  const track = document.getElementById('timeline-track');
  const firstMarker = mainNodes[0].querySelector('.timeline-marker');
  const lastMain = findLastMainInHistory();
  const lastMainEl = timelineNodesEl.querySelector(`.timeline-node--main[data-key="${lastMain}"] .timeline-marker`);
  if (!firstMarker || !lastMainEl || !track) return;

  const trackRect = track.getBoundingClientRect();
  const centerX = (el) => el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2 - trackRect.left;
  const start = centerX(firstMarker);
  const end = centerX(lastMainEl);
  const width = Math.max(0, end - start);

  timelineLineFill.style.setProperty('--line-left', start + 'px');
  timelineLineFill.style.setProperty('--line-width', width + 'px');
}

function scrollTimelineToActive() {
  const cur = history[history.length - 1];
  const el = document.querySelector(`[data-key="${cur}"] .timeline-marker--active, .timeline-branch-node[data-key="${cur}"] .timeline-marker, .timeline-node--main[data-key="${cur}"] .timeline-marker`);
  if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function renderStepChoices() {
  stepChoices.innerHTML = '';
  const node = NODES[history[history.length - 1]];
  const ordered = getOrderedNext(node);
  const mainNext = getForwardNextKey();

  if (ordered.length === 0) {
    stepChoices.classList.remove('step-choices--visible');
    return;
  }

  const title = document.createElement('p');
  title.className = 'step-choices-title';
  title.textContent = ordered.length > 1 ? 'Куда дальше?' : 'Следующий этап';
  stepChoices.append(title);

  const wrap = document.createElement('div');
  wrap.className = 'step-choices-btns';
  ordered.forEach(nx => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isMain = nx.key === mainNext;
    btn.className = 'step-choice-btn' + (isMain ? ' step-choice-btn--main' : ' step-choice-btn--extra');
    btn.textContent = nx.label;
    btn.addEventListener('click', () => goTo(nx.key));
    wrap.appendChild(btn);
  });
  stepChoices.append(wrap);
  stepChoices.classList.add('step-choices--visible');
}

function createChoiceButtons(container, ordered) {
  container.innerHTML = '';
  if (ordered.length === 0) return;
  const mainNext = getForwardNextKey();
  ordered.forEach(nx => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'step-choice-btn' + (nx.key === mainNext ? ' step-choice-btn--main' : ' step-choice-btn--extra');
    btn.textContent = nx.label;
    btn.addEventListener('click', () => goTo(nx.key));
    container.appendChild(btn);
  });
}

function createSkillTag(skill) {
  const span = document.createElement('span');
  span.className = 'stag';
  span.textContent = skill.t;
  span.style.setProperty('--stag-color', skill.c);
  span.style.setProperty('--stag-bg', skill.b);
  return span;
}

function buildSlide(node) {
  const slide = document.createElement('div');
  slide.className = 'slide' + (node.key === 'rd' ? ' active' : '');
  slide.id = 'sl_' + node.key;

  const slideMain = document.createElement('div');
  slideMain.className = 'slide-main';

  const charWrap = document.createElement('div');
  charWrap.className = 'char-wrap';
  charWrap.dataset.grow = String(node.grow);
  const img = document.createElement('img');
  img.src = node.charImg;
  img.alt = 'Айдана';
  img.className = 'char-img char-img--motion-' + node.motion;
  img.addEventListener('error', () => charWrap.setAttribute('data-error', 'true'));
  const fallback = document.createElement('div');
  fallback.className = 'char-fallback';
  fallback.textContent = node.emoji;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = node.bubble;
  charWrap.append(img, fallback, bubble);

  const slideBody = document.createElement('div');
  slideBody.className = 'slide-body';

  const slideHeader = document.createElement('div');
  slideHeader.className = 'slide-header';
  const ageBadge = document.createElement('div');
  ageBadge.className = 'age-badge';
  ageBadge.textContent = node.age;
  const title = document.createElement('h2');
  title.textContent = node.title;
  slideHeader.append(ageBadge, title);

  if (node.isBranch) {
    const branchBadge = document.createElement('span');
    branchBadge.className = 'branch-badge';
    branchBadge.textContent = '✦ Дополнение пути';
    slideHeader.appendChild(branchBadge);
  }

  slideBody.appendChild(slideHeader);

  const desc = document.createElement('p');
  desc.className = 'slide-desc';
  desc.textContent = node.desc;
  slideBody.appendChild(desc);

  if (node.skills && node.skills.length) {
    const skills = document.createElement('div');
    skills.className = 'skills';
    node.skills.forEach(s => skills.appendChild(createSkillTag(s)));
    slideBody.appendChild(skills);
  }

  const fcStrip = document.createElement('div');
  fcStrip.className = 'fc-strip';
  const fcIcon = document.createElement('div');
  fcIcon.className = 'fc-strip-icon';
  fcIcon.textContent = '🏦';
  const fcText = document.createElement('div');
  fcText.className = 'fc-strip-text';
  fcText.textContent = node.fc;
  fcStrip.append(fcIcon, fcText);
  slideBody.appendChild(fcStrip);

  if (node.next.length === 0) {
    const finishWrap = document.createElement('div');
    finishWrap.className = 'finish-container';
    const finish = document.createElement('span');
    finish.className = 'finish-badge';
    finish.textContent = '🏆 ФИНИШ!';
    finishWrap.appendChild(finish);
    slideBody.appendChild(finishWrap);
  }

  slideMain.append(charWrap, slideBody);
  slide.appendChild(slideMain);
  return slide;
}

function runSlideTransition(prevSlide, nextSlide) {
  prevSlide.classList.remove('active', 's-exit-fwd', 's-exit-bwd', 's-enter-fwd', 's-enter-bwd');
  nextSlide.classList.remove('s-exit-fwd', 's-exit-bwd', 's-enter-fwd', 's-enter-bwd', 'no-transition');
  nextSlide.classList.add('active');
}

const sw = document.getElementById('slides-wrap');
Object.values(NODES).forEach(w => sw.appendChild(buildSlide(w)));

function refreshPathUI() {
  buildTimelineMarkers();
  renderStepChoices();
  scrollTimelineToActive();
}

const bp = document.getElementById('bp');
const bn = document.getElementById('bn');

function updateDots() {
  const dotsEl = document.getElementById('dots');
  dotsEl.innerHTML = '';
  history.forEach((key, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot' + (i === history.length - 1 ? ' active' : ' done');
    if (BRANCH_NODES.has(key)) d.classList.add('dot--branch');
    d.title = NODES[key].title;
    d.setAttribute('aria-label', NODES[key].title);
    d.onclick = () => goBackTo(i);
    dotsEl.appendChild(d);
  });
}

function goTo(key) {
  const prevKey = history[history.length - 1];
  if (key === prevKey) return;

  const prevSlide = document.getElementById('sl_' + prevKey);
  const nextSlide = document.getElementById('sl_' + key);

  runSlideTransition(prevSlide, nextSlide);

  history.push(key);
  visited.add(key);

  document.getElementById('cn').textContent = history.length;
  updateNavBtns();
  updateDots();
  refreshPathUI();

  if (key === 'fc') setTimeout(() => triggerFireworks(), 600);
}

function triggerFireworks() {
  fireworksOverlay.replaceChildren();
  fireworksOverlay.classList.add('fireworks-overlay--active');
  fireworksOverlay.setAttribute('aria-hidden', 'false');

  const emojis = ['🎉', '🎊', '✨', '🌟', '⭐', '💫', '🏆', '🎈', '🎁', '🚀'];
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle ' + (Math.random() > 0.5 ? 'burst' : 'pop');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (i / 50) * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', -Math.sin(angle) * distance + 'px');
    particle.style.setProperty('--distance', -(200 + Math.random() * 400));
    particle.style.setProperty('--particle-delay', String(Math.random() * 0.2));
    particle.style.setProperty('--particle-left', String(Math.random() * 100));
    fireworksOverlay.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }

  const flash = document.createElement('div');
  flash.className = 'fireworks-flash';
  fireworksOverlay.appendChild(flash);

  setTimeout(() => {
    fireworksOverlay.classList.remove('fireworks-overlay--active');
    fireworksOverlay.setAttribute('aria-hidden', 'true');
    fireworksOverlay.replaceChildren();
  }, 1600);
}

function goBackTo(idx) {
  if (idx >= history.length - 1) return;
  const key = history[idx];
  const prevKey = history[history.length - 1];

  runSlideTransition(
    document.getElementById('sl_' + prevKey),
    document.getElementById('sl_' + key)
  );

  history = history.slice(0, idx + 1);
  document.getElementById('cn').textContent = history.length;
  updateNavBtns();
  updateDots();
  refreshPathUI();
}

bp.addEventListener('click', () => { if (history.length > 1) goBackTo(history.length - 2); });

function updateNavBtns() {
  const canBack = history.length > 1;
  const canForward = !!getForwardNextKey();
  bp.disabled = !canBack;
  bn.disabled = !canForward;
}

bn.addEventListener('click', goForwardStep);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && history.length > 1) goBackTo(history.length - 2);
  if (e.key === 'ArrowRight') goForwardStep();
});

window.addEventListener('resize', () => {
  requestAnimationFrame(() => {
    updateTimelineProgress();
    updateWalker(false);
  });
});

document.getElementById('tn').textContent = '?';
document.getElementById('cn').textContent = '1';
bp.disabled = true;
updateNavBtns();
updateDots();
refreshPathUI();
