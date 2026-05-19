/**
 * config.js — Scene data & storytelling configuration
 * Each LifeStage defines content + 3D camera waypoint
 */

export class LifeStage {
  /**
   * @param {object} opts
   * @param {string} opts.id
   * @param {string} opts.label      — nav dot label
   * @param {string} opts.badge      — top badge text
   * @param {string} opts.title
   * @param {string} opts.desc
   * @param {string} opts.fcText     — FC invisible role
   * @param {string} opts.age        — age display
   * @param {number} opts.color      — hex for 3D accent
   * @param {string} opts.emoji
   */
  constructor(opts) {
    Object.assign(this, opts);
  }
}

export const STAGES = [
  new LifeStage({
    id: 'intro',
    label: 'Начало',
    badge: '',
    title: 'Кто незримо стоит\nза вашей жизнью?',
    desc: '96% казахстанцев не знают о существовании организации, которая сопровождает их от первого вдоха до последнего дня.',
    fcText: '',
    age: '',
    color: 0x4a3aff,
    emoji: '✨'
  }),
  new LifeStage({
    id: 'birth',
    label: 'Рождение',
    badge: '0 лет · Роддом №1, Астана',
    title: 'Первый вдох',
    desc: 'Маленький Айдос появился на свет. Он ещё ничего не знает — но кто-то невидимый уже открыл счёт на его будущее.',
    fcText: 'Депозит на новорождённого → государство зачислило стартовые 235 920 ₸.',
    age: '0 лет',
    color: 0xff6b9d,
    emoji: '👶'
  }),
  new LifeStage({
    id: 'childhood',
    label: 'Детство',
    badge: '3–6 лет · Мкр. Сарыарка',
    title: 'Мир открывается',
    desc: 'Первые друзья, казахские сказки, мечты о космосе. А где-то тихо капают проценты на невидимый депозит.',
    fcText: 'Банк начисляет %, государство добавляет премию 5–7% в год.',
    age: '3–6',
    color: 0x42d4a8,
    emoji: '🧸'
  }),
  new LifeStage({
    id: 'school',
    label: 'Школа',
    badge: '7–14 лет · Школа №47',
    title: 'Первый звонок',
    desc: 'Математика, казахский, English. Айдос учится думать. Невидимая рука продолжает откладывать на его будущее.',
    fcText: 'Госпремия на депозит начисляется каждый год автоматически.',
    age: '7–14',
    color: 0x3a7bff,
    emoji: '📚'
  }),
  new LifeStage({
    id: 'hobbies',
    label: 'Кружки',
    badge: '10–16 лет · ДЮЦ «Жас Өркен»',
    title: 'Талант раскрывается',
    desc: 'Домбра по вечерам, казақ күресі по выходным. Каждый кюй — это характер. А депозит защищён.',
    fcText: 'Накопления защищены от арестов — до 10 млн ₸ под госгарантией.',
    age: '10–16',
    color: 0x9b59b6,
    emoji: '🎵'
  }),
  new LifeStage({
    id: 'university',
    label: 'Университет',
    badge: '18–22 · Nazarbayev University',
    title: 'Большие мечты',
    desc: 'Стажировки, хакатоны, рассветы в библиотеке. Айдос впервые задумывается: откуда деньги на учёбу?',
    fcText: 'Грант — снял депозит с процентами. Нет гранта — кредит без залога, 10 лет.',
    age: '18–22',
    color: 0x2980b9,
    emoji: '🎓'
  }),
  new LifeStage({
    id: 'adult',
    label: 'Взрослая жизнь',
    badge: '23–35 лет · Астана',
    title: 'Своими ногами',
    desc: 'Первая работа, первый поход в больницу не с мамой. Сколько невидимых нитей держали его всё это время?',
    fcText: 'Медстрахование, пенсионные накопления, инвестиционные инструменты.',
    age: '23–35',
    color: 0xe67e22,
    emoji: '🏙️'
  }),
  new LifeStage({
    id: 'reveal',
    label: 'Разоблачение',
    badge: '',
    title: 'Кто стоял за всем?',
    desc: 'Депозит с рождения. Проценты. Защита. Грант. Кредит. Медстраховка. Пенсия. Одна невидимая рука — всю жизнь.',
    fcText: '',
    age: '',
    color: 0xD4A843,
    emoji: '🔍'
  }),
  new LifeStage({
    id: 'finale',
    label: 'Финал',
    badge: 'Теперь вы знаете',
    title: 'АО «Финансовый Центр»',
    desc: 'Добрый «серый кардинал», о котором не догадываются 96% населения — но который незримо сопровождает каждого казахстанца.',
    fcText: '',
    age: '',
    color: 0xD4A843,
    emoji: '🏦'
  })
];
