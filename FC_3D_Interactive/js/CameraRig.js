/**
 * CameraRig.js — Unique camera angles per room: side, top-down, window, orbit
 */
import * as THREE from 'three';

export class CameraRig {
  constructor(camera, stageCount) {
    this._camera = camera;
    this._stageCount = stageCount;
    this._targetProgress = 0;
    this._currentProgress = 0;
    this._dampFactor = 2.8;
    this.ROOM_SPACING = 20;

    // Each room has unique camera position + lookAt for cinematic variety
    // [cameraPos, lookAtTarget]
    this._waypoints = [
      // 0: Womb — close-up from slightly above
      { pos: new THREE.Vector3(0, 4.5, 5), look: new THREE.Vector3(0, 2.8, 0) },
      // 1: Nursery — from the side, slight elevation
      { pos: new THREE.Vector3(7, 3.5, -20), look: new THREE.Vector3(0, 1.5, -20) },
      // 2: Kindergarten — from above corner looking down
      { pos: new THREE.Vector3(5, 6, -35), look: new THREE.Vector3(-1, 0.5, -40) },
      // 3: School — from back of class looking at blackboard
      { pos: new THREE.Vector3(0, 3, -53), look: new THREE.Vector3(0, 3, -66) },
      // 4: Hobbies — from the window/side
      { pos: new THREE.Vector3(-8, 3, -80), look: new THREE.Vector3(1, 1.5, -80) },
      // 5: University — from high corner
      { pos: new THREE.Vector3(6, 7, -93), look: new THREE.Vector3(0, 2, -100) },
      // 6: Adult — through door view
      { pos: new THREE.Vector3(0, 3, -112), look: new THREE.Vector3(0, 2, -120) },
      // 7: Reveal — orbit from side
      { pos: new THREE.Vector3(-6, 4, -137), look: new THREE.Vector3(0, 3.5, -143) },
      // 8: Finale — grand front view, slightly low
      { pos: new THREE.Vector3(0, 2, -152), look: new THREE.Vector3(0, 5, -164) },
    ];

    // Build spline through camera positions
    const pts = this._waypoints.map(w => w.pos);
    this._path = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.2);
  }

  setTargetProgress(p) {
    this._targetProgress = THREE.MathUtils.clamp(p, 0, 1);
  }

  update(dt) {
    this._currentProgress = THREE.MathUtils.lerp(
      this._currentProgress, this._targetProgress,
      1 - Math.exp(-this._dampFactor * dt)
    );

    const pos = this._path.getPointAt(this._currentProgress);
    this._camera.position.copy(pos);

    // Interpolate lookAt between waypoints
    const stageF = this._currentProgress * (this._stageCount - 1);
    const a = Math.floor(stageF);
    const b = Math.min(a + 1, this._stageCount - 1);
    const f = stageF - a;

    const lookAt = new THREE.Vector3().lerpVectors(
      this._waypoints[a].look,
      this._waypoints[b].look,
      f
    );
    this._camera.lookAt(lookAt);
  }

  getCurrentStage() {
    return Math.round(this._currentProgress * (this._stageCount - 1));
  }
  getProgress() { return this._currentProgress; }
  getPath() { return this._path; }
}
