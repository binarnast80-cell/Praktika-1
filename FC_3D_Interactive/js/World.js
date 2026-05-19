/**
 * World.js — Assembles rooms + manages spinning/floating animations
 */
import * as THREE from 'three';
import { buildWomb, buildNursery, buildKindergarten, buildSchool, buildHobbies } from './rooms1.js';
import { buildUniversity, buildAdultLife, buildReveal, buildFinale } from './rooms2.js';

export class World {
  constructor(scene) {
    this._scene = scene;
    this._spinObjects = [];
    const S = 20;
    const builders = [buildWomb, buildNursery, buildKindergarten, buildSchool, buildHobbies, buildUniversity, buildAdultLife, buildReveal, buildFinale];
    builders.forEach((fn, i) => {
      const room = fn(-i * S);
      this._scene.add(room);
      // Collect animated objects
      room.traverse(obj => {
        if (obj.userData && obj.userData.spin) this._spinObjects.push(obj);
      });
    });
  }

  setPathCurve(curve) {
    const pts = curve.getPoints(400);
    this._scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xD4A843, transparent: true, opacity: 0.04 })
    ));
  }

  update(dt, elapsed) {
    for (const obj of this._spinObjects) {
      const d = obj.userData;
      const axis = d.axis || 'y';
      const speed = d.speed || 0.3;
      obj.rotation[axis] = elapsed * speed;
    }
  }
}
