// ==========================================================================
//  LIFE PROGRESSION v20 - СИНХРОНИЗИРОВАННЫЙ СКРИПТ КАРУСЕЛИ И ВЕТВЛЕНИЙ
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

const MAIN_STAGES = [
    { key: 'rd', emoji: '👶', age: '0 лет', title: 'Роддом', image: CHAR.baby, desc: 'Рождение Айданы, первые мгновения жизни и забота любящих родителей.' },
    { key: 'kg', emoji: '🧸', age: '6 лет', title: 'Детство', image: CHAR.kg, desc: 'Первые игры, детский сад, кружки и формирование ярких воспоминаний.' },
    { key: 'sc', emoji: '📚', age: '12 лет', title: 'Школа', image: CHAR.school, desc: 'Школа, новые друзья, хобби и первые шаги к пониманию своих интересов.' },
    { key: 'co', emoji: '🏛️', age: '18 лет', title: 'Колледж', image: CHAR.college, desc: 'Профессиональные дисциплины, самостоятельный быт и старт взрослой жизни.' },
    { key: 'un', emoji: '🎓', age: '21 год', title: 'Университет', image: CHAR.uni, desc: 'Высшее образование, масштабные студенческие проекты и новые амбиции.' },
    { key: 'fc', emoji: '💼', age: '23+ года', title: 'Работа', image: CHAR.work, desc: 'Официальное трудоустройство в Финансовом Центре и полная независимость.' }
];

const BRANCHES_DATA = {
    'kg': [{ id: 'br_draw', title: 'Кружок рисования', emoji: '🎨', image: CHAR.drawing, desc: 'Развитие творческого потенциала через краски и детские рисунки.' }],
    'sc': [{ id: 'br_music', title: 'Занятия домброй', emoji: '🪕', image: CHAR.music, desc: 'Погружение в традиционную музыку и развитие музыкального слуха.' }],
    'co': [{ id: 'br_dorm', title: 'Общежитие', emoji: '🏢', image: CHAR.dorm, desc: 'Опыт самостоятельного быта и выстраивания отношений в студенческой среде.' }],
    'un': [{ id: 'br_campus', title: 'Студенческий кампус', emoji: '🌿', image: CHAR.campus, desc: 'Активная социальная, лидерская и культурная жизнь в городке.' }]
};

// DOM Элементы
const viewportEl = document.getElementById('carousel-viewport');
const descriptionEl = document.getElementById('stage-description');
const branchChooserEl = document.getElementById('branch-chooser');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentStepEl = document.getElementById('current-step');
const totalStepEl = document.getElementById('total-step');
const cnEl = document.getElementById('cn');
const tnEl = document.getElementById('tn');

let currentIndex = 0;
let selectedBranchId = null; // Хранит id открытой ветки для текущего шага

function render() {
    viewportEl.innerHTML = '';
    const currentStage = MAIN_STAGES[currentIndex];

    MAIN_STAGES.forEach((stage, idx) => {
        // Создаем вертикальный стек-контейнер для этапа
        const stack = document.createElement('div');
        stack.className = 'stage-stack';

        // Рассчитываем позиции для эффекта Coverflow
        if (idx === currentIndex) {
            stack.classList.add('active');
        } else if (idx === currentIndex - 1) {
            stack.classList.add('next');
        } else if (idx === currentIndex + 1) {
            stack.classList.add('prev');
        } else {
            stack.classList.add('hidden');
        }

        // Рендерим основную карточку. Девочка идет ПОВЕРХ плашки (`stage-character`)
        const mainCard = document.createElement('div');
        mainCard.className = 'stage-card';
        mainCard.innerHTML = `
            <div class="stage-icon">${stage.emoji}</div>
            <div class="stage-info">
                <span class="stage-age">${stage.age.toUpperCase()}</span>
                <span class="stage-title">${stage.title}</span>
            </div>
            <div class="stage-character" style="background-image: url('${stage.image}')"></div>
        `;

        // Клик по боковым карточкам перекручивает карусель к ним
        mainCard.addEventListener('click', () => {
            if (idx !== currentIndex) {
                moveTo(idx);
            }
        });

        stack.appendChild(mainCard);

        // Если это активный элемент и для него включен доп. путь, рендерим его ПРЯМО ПОД основным
        if (idx === currentIndex && selectedBranchId) {
            const branchInfo = (BRANCHES_DATA[stage.key] || []).find(b => b.id === selectedBranchId);
            if (branchInfo) {
                const branchCard = document.createElement('div');
                branchCard.className = 'stage-card stage-card--branch';
                branchCard.innerHTML = `
                    <span class="card-branch-tag">Ветвление</span>
                    <div class="stage-icon">${branchInfo.emoji}</div>
                    <div class="stage-info">
                        <span class="stage-age">АЛЬТЕРНАТИВА</span>
                        <span class="stage-title">${branchInfo.title}</span>
                    </div>
                    <div class="stage-character" style="background-image: url('${branchInfo.image}')"></div>
                `;
                stack.appendChild(branchCard);
            }
        }

        viewportEl.appendChild(stack);
    });

    // Обновляем тексты и кнопки выбора
    if (selectedBranchId) {
        const activeBranch = (BRANCHES_DATA[currentStage.key] || []).find(b => b.id === selectedBranchId);
        descriptionEl.innerHTML = activeBranch ? `<strong>${activeBranch.title}:</strong> ${activeBranch.desc}` : '';
    } else {
        descriptionEl.textContent = currentStage ? currentStage.desc : '';
    }

    renderBranchButtons();
    updateControls();
}

function renderBranchButtons() {
    branchChooserEl.innerHTML = '';
    const currentStage = MAIN_STAGES[currentIndex];
    const availableBranches = BRANCHES_DATA[currentStage.key] || [];

    if (availableBranches.length === 0) {
        branchChooserEl.style.display = 'none';
        return;
    }

    branchChooserEl.style.display = 'flex';
    availableBranches.forEach(branch => {
        const btn = document.createElement('button');
        btn.className = 'branch-btn';
        if (selectedBranchId === branch.id) btn.classList.add('active');
        btn.textContent = `✨ Доп. путь: ${branch.title}`;
        
        btn.addEventListener('click', () => {
            selectedBranchId = (selectedBranchId === branch.id) ? null : branch.id;
            render();
        });
        branchChooserEl.appendChild(btn);
    });
}

function updateControls() {
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === MAIN_STAGES.length - 1);

    const stepStr = String(currentIndex + 1);
    const totalStr = String(MAIN_STAGES.length);

    if (currentStepEl) currentStepEl.textContent = stepStr;
    if (totalStepEl) totalStepEl.textContent = totalStr;
    if (cnEl) cnEl.textContent = stepStr;
    if (tnEl) tnEl.textContent = totalStr;
}

function moveTo(index) {
    if (index < 0 || index >= MAIN_STAGES.length) return;
    currentIndex = index;
    selectedBranchId = null; // Сбрасываем выбранную ветку при переходе на другой возраст
    render();
}

if (prevBtn) prevBtn.addEventListener('click', () => moveTo(currentIndex - 1));
if (nextBtn) nextBtn.addEventListener('click', () => moveTo(currentIndex + 1));

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveTo(currentIndex - 1);
    if (e.key === 'ArrowRight') moveTo(currentIndex + 1);
});

// Первый запуск
render();