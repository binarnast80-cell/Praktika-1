// ══════════════════════════════════════════════════
//  GRAPH UTILITIES (BFS)
// ══════════════════════════════════════════════════

// Build undirected adjacency list (for finding paths between any two nodes)
const ADJ = {};
Object.keys(NODES).forEach(k => ADJ[k] = []);
CONNECTIONS.forEach(([a, b]) => {
  ADJ[a].push(b);
  ADJ[b].push(a);
});

// Find shortest path between two nodes using BFS.
// Returns array of node keys [from, ..., to], or null if no path exists.
function shortestPath(fromKey, toKey) {
  if (fromKey === toKey) return [fromKey];
  const queue = [[fromKey]];
  const seen = new Set([fromKey]);
  while (queue.length) {
    const path = queue.shift();
    const last = path[path.length - 1];
    for (const next of ADJ[last]) {
      if (seen.has(next)) continue;
      if (next === toKey) return [...path, next];
      seen.add(next);
      queue.push([...path, next]);
    }
  }
  return null;
}

// Find the FINISH node (a node with no `next` options)
const FINISH_KEY = Object.values(NODES).find(n => n.next.length === 0).key;

// Minimum number of steps from a node to the finish (using directed `next` graph)
function stepsToFinish(fromKey) {
  if (fromKey === FINISH_KEY) return 0;
  const queue = [[fromKey, 0]];
  const seen = new Set([fromKey]);
  while (queue.length) {
    const [cur, dist] = queue.shift();
    for (const nx of NODES[cur].next) {
      if (nx.key === FINISH_KEY) return dist + 1;
      if (seen.has(nx.key)) continue;
      seen.add(nx.key);
      queue.push([nx.key, dist + 1]);
    }
  }
  return 0;
}

// ══════════════════════════════════════════════════
//  MAP SETUP
// ══════════════════════════════════════════════════
const map = L.map('map', {
    zoomControl: false,
    dragging: true,
    scrollWheelZoom: true,
    attributionControl: false
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { opacity: 1 }).addTo(map);
L.control.zoom({ position: 'topleft' }).addTo(map);
map.setView(NODES.rd.latlng, NODES.rd.zoom);

// Draw all connection lines between nodes
const lineObjs = {};
CONNECTIONS.forEach(([a,b]) => {
  const line = L.polyline([NODES[a].latlng, NODES[b].latlng], {
    color: '#9A9A95', weight: 1.5, opacity: 0.4, dashArray: '4,4'
  }).addTo(map);
  lineObjs[a+'_'+b] = line;
});

function mkIcon(emoji, active, visited) {
    const s = active ? 44 : 32;
    const bg = active ? '#2563EB' : visited ? '#EFF4FF' : '#FFFFFF';
    const bdr = active
        ? '2px solid #2563EB'
        : visited
            ? '1px solid #C7D7FC'
            : '1px solid #E5E5E0';
    const sh = active
        ? '0 4px 12px rgba(37,99,235,0.25), 0 0 0 4px rgba(37,99,235,0.12)'
        : '0 1px 3px rgba(0,0,0,0.08)';
    return L.divIcon({
        className: '',
        html: `<div style="width:${s}px;height:${s}px;background:${bg};border:${bdr};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${active?18:14}px;box-shadow:${sh};cursor:pointer;transition:all 0.2s ease;">${emoji}</div>`,
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
    handleMarkerClick(w.key);
  });
  markers[w.key] = m;
});

// Highlight active path line
function highlightLine(fromKey, toKey) {
  const k1 = fromKey+'_'+toKey;
  const k2 = toKey+'_'+fromKey;
  const line = lineObjs[k1] || lineObjs[k2];
  if (line) line.setStyle({ color: '#2563EB', weight: 2.5, opacity: 0.85, dashArray: null });
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


// ══════════════════════════════════════════════════
//  NAVIGATION LOGIC
// ══════════════════════════════════════════════════
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

  updateStepCounter();
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
    if (line) line.setStyle({ color: '#9A9A95', weight: 1.5, opacity: 0.4, dashArray: '4,4' });
  }
  markers[key].setIcon(mkIcon(NODES[key].emoji, true, false));

  history = history.slice(0, idx+1);
  updateStepCounter();
  updateNavBtns();
  updateDots();
  map.flyTo(NODES[key].latlng, NODES[key].zoom, { duration: 1.2, easeLinearity: 0.4 });
  hideMapPopup();
  setTimeout(() => showMapPopup(key), 1300);
}

bp.addEventListener('click', () => { if (history.length > 1) goBackTo(history.length-2); });

// ══════════════════════════════════════════════════
//  HANDLE MARKER CLICK (any icon → smart routing)
// ══════════════════════════════════════════════════
function handleMarkerClick(targetKey) {
  const curKey = history[history.length - 1];

  // 1. Click on current node → ignore
  if (targetKey === curKey) return;

  // 2. Click on already-visited node → rewind history to that node
  const histIdx = history.indexOf(targetKey);
  if (histIdx !== -1) {
    goBackTo(histIdx);
    return;
  }

  // 3. Click on direct neighbor (in current node's `next`) → normal forward step
  const curNode = NODES[curKey];
  if (curNode.next.some(n => n.key === targetKey)) {
    goTo(targetKey);
    return;
  }

  // 4. Click on any other node → auto-route via shortest path
  const path = shortestPath(curKey, targetKey);
  if (!path || path.length < 2) return;
  // Walk the path step-by-step with small delays for visual effect
  for (let i = 1; i < path.length; i++) {
    const step = path[i];
    setTimeout(() => goTo(step), (i - 1) * 280);
  }
}

function updateNavBtns() {
  bp.disabled = history.length <= 1;
  const curNode = NODES[history[history.length-1]];
  bn.disabled = curNode.next.length === 0;
}

// Total = steps walked + minimum steps remaining to finish
function updateStepCounter() {
  const curKey = history[history.length - 1];
  const remaining = stepsToFinish(curKey);
  const total = history.length + remaining;
  document.getElementById('cn').textContent = history.length;
  // document.getElementById('tn').textContent = total;
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

// ══════════════════════════════════════════════════
//  INITIALIZATION
// ══════════════════════════════════════════════════
updateStepCounter();
bp.disabled = true;
updateNavBtns();

updateDots();
markers['rd'].setIcon(mkIcon(NODES['rd'].emoji, true, false));
setTimeout(() => showMapPopup('rd'), 500);

// Fade hint
const hint = document.getElementById('hint');
setTimeout(() => { hint.style.opacity='0'; }, 5000);
document.addEventListener('click', () => { hint.style.opacity='0'; }, {once:true});