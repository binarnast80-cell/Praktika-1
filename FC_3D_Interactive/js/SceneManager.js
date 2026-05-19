/**
 * SceneManager.js — Three.js core with warm light background
 */
import * as THREE from 'three';

export class SceneManager {
  constructor(canvas) {
    this._canvas = canvas;
    this._clock = new THREE.Clock();
    this._callbacks = [];

    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: false, powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    this.scene = new THREE.Scene();
    // Warm cream/beige background instead of dark
    this.scene.background = new THREE.Color(0xf5f0e8);
    // Light fog for depth
    this.scene.fog = new THREE.Fog(0xf5f0e8, 30, 80);

    this.camera = new THREE.PerspectiveCamera(
      50, window.innerWidth / window.innerHeight, 0.1, 500
    );
    this.camera.position.set(0, 3, 8);

    // Strong ambient for well-lit rooms
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    // Hemisphere: warm sky + cool ground
    this.scene.add(new THREE.HemisphereLight(0xffeedd, 0xd4c4a8, 0.5));

    // Directional light for shadows/definition
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 10, 10);
    this.scene.add(dir);

    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  onTick(fn) { this._callbacks.push(fn); }

  start() {
    const loop = () => {
      requestAnimationFrame(loop);
      const dt = this._clock.getDelta();
      const el = this._clock.getElapsedTime();
      for (const cb of this._callbacks) cb(dt, el);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  _onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    this.renderer.dispose();
  }
}
