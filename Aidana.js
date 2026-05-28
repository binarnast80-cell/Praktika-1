(() => {
  const stages = [
    {
      id: 1,
      title: 'Рождение',
      texts: ['Открыли депозит на новорождённого → государство зачислило стартовые 235 920 ₸.'],
      platform: 'image/platform_hospital.png',
      building: 'image/роддом.png',
      idle: 'image/baby.png',
      jump: 'image/baby_jump.png',
      scale: 0.6
    },
    {
      id: 2,
      title: '3–6 лет',
      texts: ['Депозит копится: банк начисляет %, государство добавляет премию 5–7% в год.','Накопления защищены от арестов и списаний — до 10 млн ₸ под госгарантией.'],
      platform: 'image/kindergarten_platform.png',
      building: 'image/детсад.png',
      idle: 'image/child.png',
      jump: 'image/child_jump.png',
      scale: 0.7
    },
    {
      id: 3,
      title: '7–11 лет',
      texts: ['Госпремия на депозит начисляется ежегодно — деньги растут, пока ребёнок учится.','% по депозиту продолжают начисляться. Средства защищены от арестов и третьих лиц.'],
      platform: 'image/school_platform.png',
      building: 'image/школа.png',
      idle: 'image/schoolgirl.png',
      jump: 'image/school_jump.png',
      scale: 0.8
    },
    {
      id: 4,
      title: '15–18 лет',
      texts: ['Средства направляются на оплату колледжа. При нехватке — доступен кредит до 10 лет без залога.','Айдана думает о музыке, не о финансовых расходах.','Образовательный кредит позволяет начать выплаты через 6 месяцев после выпуска.'],
      platform: 'image/collage_platform.png',
      building: 'image/колледж.png',
      idle: 'image/collage.png',
      jump: 'image/collage_jump.png',
      scale: 0.9
    },
    {
      id: 5,
      title: '18–22 года',
      texts: ['Грант покрывает обучение или активируется беззалоговый кредит под госгарантию.','Кредит покрывает обучение. После выпуска доступно до 10 лет на погашение.'],
      platform: 'image/univer_platform.png',
      building: 'image/универ.png',
      idle: 'image/univer.png',
      jump: 'image/univer_jump.png',
      scale: 1.0
    },
    {
      id: 6,
      title: '23+ года',
      texts: ['Полный жизненный цикл завершён: депозит → ваучер → кредит → выпуск.'],
      platform: 'image/job_platform.png',
      building: 'image/работа.png',
      idle: 'image/job.png',
      jump: 'image/job_jump.png',
      scale: 1.1
    }
  ];

  // Прелоад ассетов
  stages.forEach(s => {
    const imgIdle = new Image(); imgIdle.src = s.idle;
    const imgJump = new Image(); imgJump.src = s.jump;
  });

  let current = 0;
  const stageSpacing = 300; 
  let cameraY = 0;
  
  const world = document.getElementById('world');
  const playerWrap = document.getElementById('player');
  const playerSprite = document.getElementById('player-sprite');
  const jumpBtn = document.getElementById('jump');
  const resetBtn = document.getElementById('reset');
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupText = document.getElementById('popup-text');
  const popupClose = document.getElementById('popup-close');

  // Рендеринг игровых уровней
  stages.forEach((s, i) => {
    const stEl = document.createElement('div');
    stEl.className = 'life-stage';
    stEl.style.bottom = (i * stageSpacing) + 'px';
    
    stEl.innerHTML = `
      <div class="building-area">
        <img class="stage-building" src="${s.building}" alt="building"/>
      </div>
      <div class="platform-wrap">
        <img class="city-platform" src="${s.platform}" alt="platform"/>
      </div>
    `;
    world.appendChild(stEl);
  });

  function updateStageUI(){
    const s = stages[current];
    playerSprite.src = s.idle;
    playerWrap.style.setProperty('--player-scale', s.scale);
    
    // Мгновенно переставляем расчетные координаты в CSS
    popup.style.setProperty('--popup-y', (current * stageSpacing) + 'px');
    jumpBtn.style.setProperty('--jump-btn-y', (current * stageSpacing) + 'px');
  }

  function showPopupForStage(){
    const s = stages[current];
    popupTitle.textContent = s.title;
    popupText.innerHTML = s.texts.map(t => `<p>${t}</p>`).join('');
    
    // Динамически перестраиваем структуру кнопок в зависимости от этапа
    if (current === stages.length - 1) {
      popupClose.style.display = 'none'; // Скрываем "Понятно" на последнем шаге
    } else {
      popupClose.style.display = 'block'; // Возвращаем для остальных шагов
    }

    popup.setAttribute('open', '');
    popup.setAttribute('aria-hidden', 'false');
    
    // Прыжок заблокирован, пока открыт попап — убираем кнопку плавно
    jumpBtn.classList.remove('is-visible');
    jumpBtn.disabled = true;
  }

  function closePopup(){
    // Если это последний этап, не позволяем закрыть окно по кнопке "Понятно"
    if (current === stages.length - 1) return;

    popup.removeAttribute('open');
    popup.setAttribute('aria-hidden', 'true');
    
    // Попап закрыт — плавно показываем кнопку прыжка под текущей платформой
    if (current < stages.length - 1) {
      jumpBtn.classList.add('is-visible');
      jumpBtn.disabled = false;
    }
  }

  let moving = false;
  function performJump(){
    const isPopupOpen = popup.getAttribute('aria-hidden') === 'false';
    if(moving || current >= stages.length - 1 || jumpBtn.disabled || isPopupOpen) return;
    
    const sFrom = stages[current];
    const nextIndex = current + 1;
    moving = true;
    
    jumpBtn.classList.remove('is-visible');
    jumpBtn.disabled = true;
    
    playerSprite.src = sFrom.jump;
    playerWrap.classList.add('is-jumping');
    
    playerWrap.style.setProperty('--player-stage-y', (nextIndex * stageSpacing) + 'px');

    if (nextIndex >= 2 && nextIndex < stages.length) {
      if (nextIndex < stages.length - 1) {
        cameraY = (nextIndex - 1) * stageSpacing;
      }
    }
    world.style.transform = `translateY(${cameraY}px)`;

    setTimeout(()=>{
      current = nextIndex;
      updateStageUI();
      playerWrap.classList.remove('is-jumping');
      moving = false;
      showPopupForStage();
    }, 800);
  }

  function resetJourney() {
    if (moving) return; 
    
    popup.removeAttribute('open');
    popup.setAttribute('aria-hidden', 'true');
    
    current = 0;
    cameraY = 0;
    
    world.style.transform = `translateY(0px)`;
    playerWrap.style.setProperty('--player-stage-y', '0px');
    
    updateStageUI();
    
    setTimeout(() => {
      showPopupForStage();
    }, 140);
  }

  jumpBtn.addEventListener('click', performJump);
  resetBtn.addEventListener('click', resetJourney);
  popupClose.addEventListener('click', closePopup);

  // Обработка клавиш
  document.addEventListener('keydown', (e)=>{
    const isPopupOpen = popup.getAttribute('aria-hidden') === 'false';
    if(e.key === 'ArrowUp' || e.code === 'Space'){
      e.preventDefault();
      if(!isPopupOpen) performJump();
    }
    if(e.key === 'Enter' && isPopupOpen) {
      e.preventDefault();
      // На последнем этапе Enter не закрывает окно
      if (current !== stages.length - 1) {
        popupClose.click();
      }
    }
  });

  function init() {
    playerWrap.style.setProperty('--player-stage-y', '0px');
    updateStageUI();
    setTimeout(()=>{
      showPopupForStage();
    }, 140);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();