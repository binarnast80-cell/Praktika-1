/**
 * UIController.js — DOM UI management: nav dots, info card, progress, age display
 */
import { STAGES } from './config.js';

export class UIController {
  constructor() {
    // Cache DOM elements
    this._progressFill = document.getElementById('progress-fill');
    this._navDots = document.getElementById('nav-dots');
    this._ageDisplay = document.getElementById('age-display');
    this._infoCard = document.getElementById('info-card');
    this._cardBadge = document.getElementById('card-badge');
    this._cardTitle = document.getElementById('card-title');
    this._cardDesc = document.getElementById('card-desc');
    this._cardFcText = document.getElementById('card-fc-text');
    this._cardFc = document.getElementById('card-fc');
    this._scrollHint = document.getElementById('scroll-hint');
    this._loader = document.getElementById('loader');

    this._currentStage = -1;
    this._dots = [];
    this._onDotClick = null;

    this._buildNavDots();
  }

  /** Build navigation dots from stage data */
  _buildNavDots() {
    STAGES.forEach((stage, i) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.dataset.label = stage.label;
      dot.addEventListener('click', () => {
        if (this._onDotClick) this._onDotClick(i);
      });
      this._navDots.appendChild(dot);
      this._dots.push(dot);
    });
  }

  /** Set callback for dot clicks: fn(stageIndex) */
  onNavigate(fn) {
    this._onDotClick = fn;
  }

  /** Update progress bar: pct 0..100 */
  setProgress(pct) {
    this._progressFill.style.width = pct + '%';
  }

  /** Set active stage — update card, dots, age */
  setActiveStage(index) {
    if (index === this._currentStage) return;
    this._currentStage = index;

    const stage = STAGES[index];
    if (!stage) return;

    // Dots
    this._dots.forEach((d, i) => d.classList.toggle('active', i === index));

    // Age
    if (stage.age) {
      this._ageDisplay.textContent = stage.age;
      this._ageDisplay.classList.add('visible');
    } else {
      this._ageDisplay.classList.remove('visible');
    }

    // Hide scroll hint after first scroll
    if (index > 0) {
      this._scrollHint.classList.add('hidden');
    }

    // Info card — animate out then in
    this._infoCard.classList.add('hidden');
    setTimeout(() => {
      this._cardBadge.textContent = stage.badge;
      this._cardBadge.style.display = stage.badge ? 'inline-block' : 'none';
      this._cardTitle.textContent = stage.title;
      this._cardDesc.textContent = stage.desc;

      if (stage.fcText) {
        this._cardFcText.textContent = stage.fcText;
        this._cardFc.style.display = 'flex';
      } else {
        this._cardFc.style.display = 'none';
      }

      this._infoCard.classList.remove('hidden');
    }, 300);
  }

  /** Hide loader */
  hideLoader() {
    this._loader.classList.add('done');
    setTimeout(() => this._loader.remove(), 1000);
  }
}
