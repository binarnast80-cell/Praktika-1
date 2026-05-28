// ==========================================================================
//  LIFE PROGRESSION v20 - ANIMATION SCHEDULER ENGINE & NARRATIVE
// ==========================================================================

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
    campus: './image/campus.png'
};

// Финансовый Центр: Сопровождение человека на этапах жизни
const MAIN_STAGES = [
    { 
        key: 'rd', 
        emoji: '', 
        age: '0 лет', 
        title: 'Роддом', 
        image: CHAR.baby, 
        isBaby: true, 
        desc: 'Рождение Айданы. Первые мгновения жизни и начало заботы о её будущем образовании.', 
        fc: 'Депозит AQYL', 
        fcHighlight: 'Открыли депозит на новорождённого → государство зачислило стартовые 235 920 ₸.' 
    },
    { 
        key: 'kg', 
        emoji: '', 
        age: '3-6 лет', 
        title: 'Детство', 
        image: CHAR.kg, 
        desc: 'Первые игры, детский сад и кружки. Семья копит накопления на высшее образование Айданы.', 
        fc: 'Депозит AQYL', 
        fcHighlight: 'Депозит копится: банк начисляет %, государство добавляет премию 5–7% в год.' 
    },
    { 
        key: 'sc', 
        emoji: '', 
        age: '7-11 лет', 
        title: 'Школа', 
        image: CHAR.school, 
        desc: 'Школьные будни, новые знания и увлечения. Деньги на депозите накапливаются с каждым учебным годом.', 
        fc: 'Депозит AQYL', 
        fcHighlight: 'Госпремия на депозит начисляется каждый год — деньги растут, пока Айдана сидит на уроках.' 
    },
    { 
        key: 'co', 
        emoji: '', 
        age: '15-18 лет', 
        title: 'Колледж', 
        image: CHAR.college, 
        desc: 'Выбор будущей профессии и старт самостоятельного быта. Накопленный депозит идёт на оплату колледжа.', 
        fc: 'Образовательный кредит', 
        fcHighlight: 'Накопленный депозит идёт на оплату колледжа. Не хватает — кредит до 10 лет без залога.' 
    },
    { 
        key: 'un', 
        emoji: '', 
        age: '18-22 года', 
        title: 'Университет', 
        image: CHAR.uni, 
        desc: 'Высшее образование. При поступлении на грант накопленный депозит можно снять со всеми премиями государства.', 
        fc: 'AQYL Грант', 
        fcHighlight: 'Грант — снял депозит с процентами. Не грант — беззалоговый кредит под госгарантию.' 
    },
    { 
        key: 'fc', 
        emoji: '', 
        age: '23+ года', 
        title: 'Работа', 
        image: CHAR.work, 
        desc: 'Успешная карьера! Айдана работает в АО «Финансовый центр», помогая новым поколениям казахстанцев учиться.', 
        fc: 'АО «Финансовый центр»', 
        fcHighlight: 'С рождения до диплома — депозит, ваучер, кредит. Незаметно. Именно поэтому Айдана здесь.' 
    }
];

const BRANCHES_DATA = {
    'kg': [{ 
        id: 'br_draw', 
        title: 'Кружок рисования', 
        emoji: '', 
        image: CHAR.drawing, 
        desc: 'Развитие творческих способностей Айданы через яркие краски и детские рисунки.', 
        fc: 'Депозит AQYL', 
        fcHighlight: 'Накопления защищены от арестов и списаний — до 10 млн ₸ под госгарантией.' 
    }],
    'sc': [{ 
        id: 'br_music', 
        title: 'Занятия домброй', 
        emoji: '', 
        image: CHAR.music, 
        desc: 'Погружение в традиционную казахскую музыку и развитие музыкального слуха.', 
        fc: 'Защита вклада', 
        fcHighlight: '% по депозиту капают. Никто не тронет — защита от арестов и третьих лиц.' 
    }],
    'co': [{ 
        id: 'br_dorm', 
        title: 'Общежитие', 
        emoji: '', 
        image: CHAR.dorm, 
        desc: 'Опыт самостоятельного быта и выстраивания отношений в студенческом общежитии колледжа.', 
        fc: 'Поддержка студентов', 
        fcHighlight: 'Льготный период кредита: отсрочка 6 мес.' 
    }],
    'un': [{ 
        id: 'br_campus', 
        title: 'Студенческий кампус', 
        emoji: '', 
        image: CHAR.campus, 
        desc: 'Активная социальная, лидерская и культурная жизнь в современном городке университета.', 
        fc: 'Кампус и обучение', 
        fcHighlight: 'Кредит закрывает учёбу. После выпуска — 10 лет на погашение, без штрафов за досрочку.' 
    }]
};

// DOM узлы
const viewportEl = document.getElementById('carousel-viewport');
const descriptionEl = document.getElementById('stage-description');
const branchChooserEl = document.getElementById('branch-chooser');
const fireworksOverlay = document.getElementById('fireworks-overlay');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentStepEl = document.getElementById('current-step');
const totalStepEl = document.getElementById('total-step');
const cnEl = document.getElementById('cn');
const tnEl = document.getElementById('tn');

// Глобальное состояние движка (Single Source of Truth)
const state = {
    currentIndex: 0,
    selectedBranchId: null,
    currentState: 'IDLE', // IDLE, CAROUSEL_TRANSITION, BRANCH_OPENING, BRANCH_CLOSING
    currentOwner: null    // CAROUSEL, BRANCH, SYSTEM
};

let activeTransitionId = null;
let bufferedTargetIndex = null;
let stageStackEls = [];
let siblingBranchCardEl = null;

// Инициализация карусели
function initCarousel() {
    viewportEl.innerHTML = '';
    stageStackEls = [];

    // 1. Создаем DOM-элементы для 6 основных этапов
    MAIN_STAGES.forEach((stage, idx) => {
        const stack = document.createElement('div');
        stack.className = 'stage-stack';

        const mainCard = document.createElement('div');
        mainCard.className = 'stage-card';
        
        const charClass = getCharacterClass(stage);

        mainCard.innerHTML = `
            <div class="stage-icon"><span class="stage-icon-label">${getIconLabel(stage)}</span></div>
            <div class="stage-info">
                <span class="stage-age">${stage.age.toUpperCase()}</span>
                <span class="stage-title">${stage.title}</span>
            </div>
            <div class="${charClass}" style="background-image: url('${stage.image}')"></div>
        `;

        mainCard.addEventListener('click', () => {
            if (idx !== state.currentIndex) {
                dispatch('MOVE_CAROUSEL', { targetIndex: idx });
            }
        });

        stack.appendChild(mainCard);
        viewportEl.appendChild(stack);
        stageStackEls.push(stack);
    });

    // 2. Создаем изолированную карточку ветвления на уровне вьюпорта (как Sibling)
    siblingBranchCardEl = document.createElement('div');
    siblingBranchCardEl.className = 'stage-card stage-card--branch';
    viewportEl.appendChild(siblingBranchCardEl);

    // Первоначальный рендер позиционирования
    repairRender();
}

// Получение CSS класса позиционирования на основе сдвига
function getPositionClass(offset) {
    if (offset === 0) return 'active';
    if (offset === -1) return 'prev-1';
    if (offset === 1) return 'next-1';
    if (offset === -2) return 'prev-2';
    if (offset === 2) return 'next-2';
    if (offset < -2) return 'far-prev';
    return 'far-next';
}

function getCharacterClass(stage) {
    if (stage.isBaby) return 'stage-character baby-fix';
    switch (stage.key) {
        case 'kg':
            return 'stage-character stage-character--small';
        case 'sc':
            return 'stage-character stage-character--medium';
        case 'co':
            return 'stage-character stage-character--medium-lg';
        case 'un':
        case 'fc':
            return 'stage-character stage-character--large';
        default:
            return 'stage-character stage-character--medium';
    }
}

function getIconLabel(stage) {
    const map = {
        rd: 'РД',
        kg: 'ДТ',
        sc: 'ШК',
        co: 'КЛ',
        un: 'УН',
        fc: 'РБ'
    };
    return map[stage.key] || stage.title.slice(0,2).toUpperCase();
}

function getBranchIconLabel(branch) {
    // Use initials from branch title (first letters of up to two words)
    const parts = branch.title.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'ALT';
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Принудительный статический рендер (Self-Healing pass)
function repairRender() {
    MAIN_STAGES.forEach((stage, idx) => {
        const stack = stageStackEls[idx];
        if (!stack) return;

        stack.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'far-prev', 'far-next');
        
        const offset = idx - state.currentIndex;
        const posClass = getPositionClass(offset);
        stack.classList.add(posClass);

        // Устанавливаем z-index статически для предотвращения конфликтов 3D-контекста
        if (offset === 0) {
            stack.style.zIndex = '30';
        } else if (offset === -1 || offset === 1) {
            stack.style.zIndex = '20';
        } else if (offset === -2 || offset === 2) {
            stack.style.zIndex = '10';
        } else {
            stack.style.zIndex = '1';
        }
    });

    // Синхронизация ветвления
    if (state.selectedBranchId) {
        updateBranchCardContent(state.selectedBranchId);
        siblingBranchCardEl.classList.add('show');
    } else {
        siblingBranchCardEl.classList.remove('show');
    }

    renderDescriptionWrap();
    renderBranchButtons();
    updateControls();
}

// Обновление контента карточки ветвления
function updateBranchCardContent(branchId) {
    const currentStage = MAIN_STAGES[state.currentIndex];
    const branchInfo = (BRANCHES_DATA[currentStage.key] || []).find(b => b.id === branchId);
    if (branchInfo) {
        siblingBranchCardEl.innerHTML = `
            <div class="stage-icon"><span class="stage-icon-label">${getBranchIconLabel(branchInfo)}</span></div>
            <div class="stage-info">
                <span class="stage-age">АЛЬТЕРНАТИВА</span>
                <span class="stage-title">${branchInfo.title}</span>
            </div>
            <div class="stage-character" style="background-image: url('${branchInfo.image}')"></div>
        `;
    }
}

// Обновление текстового блока с бейджами Фин Центра
function renderDescriptionWrap() {
    const currentStage = MAIN_STAGES[state.currentIndex];
    let text = '';
    let fcService = '';
    let fcBenefit = '';

    if (state.selectedBranchId) {
        const branchInfo = (BRANCHES_DATA[currentStage.key] || []).find(b => b.id === state.selectedBranchId);
        if (branchInfo) {
            text = branchInfo.desc;
            fcService = branchInfo.fc;
            fcBenefit = branchInfo.fcHighlight;
        }
    } else {
        if (currentStage) {
            text = currentStage.desc;
            fcService = currentStage.fc;
            fcBenefit = currentStage.fcHighlight;
        }
    }

    if (text) {
        let badgeHtml = '';
        if (fcService && fcBenefit) {
            badgeHtml = `
                <div class="desc-fc-badges">
                    <span class="desc-badge desc-badge--service">${fcService}</span>
                    <span class="desc-badge desc-badge--benefit">${fcBenefit}</span>
                </div>
            `;
        }
        descriptionEl.innerHTML = `
            <div class="desc-text">${text}</div>
            ${badgeHtml}
        `;
    } else {
        descriptionEl.innerHTML = '';
    }
}

// Диспетчер действий (Single-Flight & Latest-Wins Buffer)
function dispatch(action, payload) {
    if (state.currentState !== 'IDLE') {
        if (action === 'MOVE_CAROUSEL') {
            bufferedTargetIndex = payload.targetIndex; // Буферизируем последнее намерение
            console.log(`Transition active. Buffered target: ${payload.targetIndex}`);
        }
        return;
    }

    const transitionId = Math.random().toString(36).substr(2, 9);
    activeTransitionId = transitionId;

    switch (action) {
        case 'MOVE_CAROUSEL':
            if (state.selectedBranchId) {
                // Параллельное скрытие ветки и движение карусели
                state.currentState = 'CAROUSEL_TRANSITION';
                state.currentOwner = 'CAROUSEL';
                state.selectedBranchId = null;

                runBranchTransition(transitionId, 'hide', () => {
                    // Ничего не делаем: движение уже запущено
                });
                runCarouselTransition(transitionId, payload.targetIndex);
            } else {
                state.currentState = 'CAROUSEL_TRANSITION';
                state.currentOwner = 'CAROUSEL';
                runCarouselTransition(transitionId, payload.targetIndex);
            }
            break;

        case 'TOGGLE_BRANCH':
            if (state.selectedBranchId === payload.branchId) {
                state.currentState = 'BRANCH_CLOSING';
                state.currentOwner = 'BRANCH';
                state.selectedBranchId = null;

                runBranchTransition(transitionId, 'hide', () => {
                    finalizeSequence(transitionId);
                });
            } else {
                state.currentState = 'BRANCH_OPENING';
                state.currentOwner = 'BRANCH';
                state.selectedBranchId = payload.branchId;

                runBranchTransition(transitionId, 'show', () => {
                    finalizeSequence(transitionId);
                });
            }
            break;
    }
}

// Выполнение перехода карусели
function runCarouselTransition(transitionId, targetIndex) {
    state.currentIndex = targetIndex;

    if (state.currentIndex === 5) {
        triggerFireworks();
    }

    MAIN_STAGES.forEach((stage, idx) => {
        const stack = stageStackEls[idx];
        if (!stack) return;

        const offset = idx - state.currentIndex;
        const targetClass = getPositionClass(offset);

        // Синхронно обновляем позиционные классы для плавного Cover Flow перехода
        stack.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'far-prev', 'far-next');
        stack.classList.add(targetClass);

        // z-index обновляется мгновенно для правильного 3D-наложения во время движения
        if (offset === 0) {
            stack.style.zIndex = '30';
        } else if (offset === -1 || offset === 1) {
            stack.style.zIndex = '20';
        } else if (offset === -2 || offset === 2) {
            stack.style.zIndex = '10';
        } else {
            stack.style.zIndex = '1';
        }
    });

    renderDescriptionWrap();
    renderBranchButtons();
    updateControls();

    const activeStack = stageStackEls[targetIndex];
    waitForTransition(activeStack, 'transform', 700, () => {
        if (activeTransitionId !== transitionId) return;
        finalizeSequence(transitionId);
    });
}

// Выполнение перехода ветвления
function runBranchTransition(transitionId, action, callback) {
    if (action === 'show') {
        updateBranchCardContent(state.selectedBranchId);
        
        // Синхронно добавляем класс для плавного появления
        siblingBranchCardEl.classList.add('show');

        waitForTransition(siblingBranchCardEl, 'transform', 500, () => {
            if (activeTransitionId !== transitionId) return;
            callback();
        });
    } else {
        // Синхронно убираем класс для плавного исчезновения
        siblingBranchCardEl.classList.remove('show');

        waitForTransition(siblingBranchCardEl, 'transform', 400, () => {
            if (activeTransitionId !== transitionId) return;
            callback();
        });
    }

    renderDescriptionWrap();
}

// Синхронизатор переходов по событию transitionend с аварийным таймаутом
function waitForTransition(element, propertyName, duration, callback) {
    let resolved = false;
    const handleTransitionEnd = (e) => {
        if (e.target !== element) return;
        if (e.propertyName !== propertyName) return;
        if (resolved) return;

        resolved = true;
        element.removeEventListener('transitionend', handleTransitionEnd);
        callback();
    };
    element.addEventListener('transitionend', handleTransitionEnd);

    setTimeout(() => {
        if (!resolved) {
            resolved = true;
            element.removeEventListener('transitionend', handleTransitionEnd);
            callback();
        }
    }, duration + 100);
}

// Завершение текущего цикла переходов
function finalizeSequence(transitionId) {
    if (activeTransitionId !== transitionId) return;
    verifyAndSelfHeal();
}

// Проверка целостности DOM и обработка буфера
function verifyAndSelfHeal() {
    let hasMismatch = false;

    MAIN_STAGES.forEach((stage, idx) => {
        const stack = stageStackEls[idx];
        const offset = idx - state.currentIndex;
        const expectedClass = getPositionClass(offset);

        if (!stack.classList.contains(expectedClass)) {
            hasMismatch = true;
        }

        let expectedZ = '1';
        if (offset === 0) expectedZ = '30';
        else if (offset === -1 || offset === 1) expectedZ = '20';
        else if (offset === -2 || offset === 2) expectedZ = '10';

        if (stack.style.zIndex !== expectedZ) {
            hasMismatch = true;
        }
    });

    const shouldShowBranch = !!state.selectedBranchId;
    if (siblingBranchCardEl.classList.contains('show') !== shouldShowBranch) {
        hasMismatch = true;
    }

    if (hasMismatch) {
        console.warn("DOM integrity mismatch detected. Self-healing...");
        repairRender();
    }

    state.currentState = 'IDLE';
    state.currentOwner = null;

    // Выполняем буферизированный переход
    if (bufferedTargetIndex !== null) {
        const target = bufferedTargetIndex;
        bufferedTargetIndex = null;
        dispatch('MOVE_CAROUSEL', { targetIndex: target });
    }
}

// Рендер кнопок ветвлений
function renderBranchButtons() {
    branchChooserEl.innerHTML = '';
    const currentStage = MAIN_STAGES[state.currentIndex];
    const availableBranches = BRANCHES_DATA[currentStage.key] || [];

    if (availableBranches.length === 0) {
        branchChooserEl.style.opacity = '0';
        return;
    }

    branchChooserEl.style.opacity = '1';
    availableBranches.forEach(branch => {
        const btn = document.createElement('button');
        btn.className = 'branch-btn';
        if (state.selectedBranchId === branch.id) btn.classList.add('active');
        
        btn.innerHTML = `<span class="branch-title">${branch.title}</span>`;
        
        btn.addEventListener('click', () => {
            dispatch('TOGGLE_BRANCH', { branchId: branch.id });
        });
        branchChooserEl.appendChild(btn);
    });
}

// Рендер элементов управления и шагов
function updateControls() {
    if (prevBtn) prevBtn.disabled = (state.currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (state.currentIndex === MAIN_STAGES.length - 1);

    const stepStr = String(state.currentIndex + 1);
    const totalStr = String(MAIN_STAGES.length);

    if (currentStepEl) currentStepEl.textContent = stepStr;
    if (totalStepEl) totalStepEl.textContent = totalStr;
    if (cnEl) cnEl.textContent = stepStr;
    if (tnEl) tnEl.textContent = totalStr;
}

// Публичный API перехода (совместимость с внешними кнопками и событиями)
function moveTo(index) {
    if (index < 0 || index >= MAIN_STAGES.length) return;
    dispatch('MOVE_CAROUSEL', { targetIndex: index });
}

// Салюты при завершении пути
function triggerFireworks() {
  fireworksOverlay.replaceChildren();
  fireworksOverlay.classList.add('fireworks-overlay--active');
  fireworksOverlay.setAttribute('aria-hidden', 'false');

    const palette = ['#f0cc6a', '#d4a84b', '#a3d7cc', '#f2c6c6', '#9fbbe6'];
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle ' + (Math.random() > 0.6 ? 'burst' : 'pop');
        // visual particle (dot or small rectangle)
        const size = 6 + Math.round(Math.random() * 10);
        particle.style.width = size + 'px';
        particle.style.height = (size + (Math.random() > 0.7 ? 2 : 0)) + 'px';
        particle.style.borderRadius = (Math.random() > 0.6 ? '2px' : '50%');
        particle.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];

        const angle = (i / 60) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const distance = 180 + Math.random() * 320;
        particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--ty', -Math.sin(angle) * distance + 'px');
        particle.style.setProperty('--distance', -(200 + Math.random() * 400));
        particle.style.setProperty('--particle-delay', String(Math.random() * 0.25));
        particle.style.setProperty('--particle-left', String(Math.random() * 100));
        fireworksOverlay.appendChild(particle);
        setTimeout(() => particle.remove(), 1600);
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

// Слушатели событий
if (prevBtn) prevBtn.addEventListener('click', () => moveTo(state.currentIndex - 1));
if (nextBtn) nextBtn.addEventListener('click', () => moveTo(state.currentIndex + 1));

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveTo(state.currentIndex - 1);
    if (e.key === 'ArrowRight') moveTo(state.currentIndex + 1);
});

// Запуск движка
initCarousel();