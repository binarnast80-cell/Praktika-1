/**
 * app.js — Entry point. Wires SceneManager, CameraRig, World, UIController together.
 */
import { SceneManager } from './SceneManager.js';
import { CameraRig } from './CameraRig.js';
import { World } from './World.js';
import { UIController } from './UIController.js';
import { STAGES } from './config.js';

class App {
  constructor() {
    // 1. Scene
    const canvas = document.getElementById('webgl-canvas');
    this._sceneManager = new SceneManager(canvas);

    // 2. Camera rig
    this._cameraRig = new CameraRig(this._sceneManager.camera, STAGES.length);

    // 3. World
    this._world = new World(this._sceneManager.scene);
    this._world.setPathCurve(this._cameraRig.getPath());

    // 4. UI
    this._ui = new UIController();
    this._ui.onNavigate((idx) => this._navigateToStage(idx));

    // 5. Scroll binding
    this._bindScroll();

    // 6. Tick
    this._sceneManager.onTick((dt, elapsed) => this._tick(dt, elapsed));

    // 7. Start
    this._sceneManager.start();
    this._ui.setActiveStage(0);

    // Hide loader after short delay
    setTimeout(() => this._ui.hideLoader(), 800);
  }

  /** Bind scroll events to camera progress */
  _bindScroll() {
    const scrollSpacer = document.getElementById('scroll-spacer');
    const maxScroll = () => scrollSpacer.offsetHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
      const progress = window.scrollY / maxScroll();
      this._cameraRig.setTargetProgress(progress);
    }, { passive: true });
  }

  /** Navigate to specific stage via dot click */
  _navigateToStage(index) {
    const scrollSpacer = document.getElementById('scroll-spacer');
    const maxScroll = scrollSpacer.offsetHeight - window.innerHeight;
    const targetScroll = (index / (STAGES.length - 1)) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  /** Per-frame update */
  _tick(dt, elapsed) {
    this._cameraRig.update(dt);
    this._world.update(dt, elapsed);

    // Update UI based on camera position
    const progress = this._cameraRig.getProgress();
    this._ui.setProgress(progress * 100);

    const stageIdx = this._cameraRig.getCurrentStage();
    this._ui.setActiveStage(stageIdx);
  }
}

// Launch
window.addEventListener('DOMContentLoaded', () => new App());
