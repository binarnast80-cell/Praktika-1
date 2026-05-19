/**
 * CharacterBuilder.js — Detailed human figures with hair, eyes, clothes, arms, legs
 */
import * as THREE from 'three';

const skin = c => new THREE.MeshStandardMaterial({ color: c || 0xffccaa, roughness: 0.7, metalness: 0 });
const cloth = (c, r) => new THREE.MeshStandardMaterial({ color: c, roughness: r || 0.6, metalness: 0.02 });

export function makeChild(height, shirtColor, pantsColor, hairColor) {
  const g = new THREE.Group();
  const sc = height / 1.4; // scale factor

  // Legs
  for (const s of [-0.12, 0.12]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.08*sc, 0.3*sc, 6, 8), cloth(pantsColor || 0x37474f));
    leg.position.set(s*sc, 0.22*sc, 0); g.add(leg);
    // Shoes
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.1*sc, 0.06*sc, 0.14*sc), cloth(0x4e342e));
    shoe.position.set(s*sc, 0.04*sc, 0.02*sc); g.add(shoe);
  }

  // Body/torso
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.16*sc, 0.25*sc, 6, 10), cloth(shirtColor || 0x42a5f5));
  torso.position.y = 0.55*sc; g.add(torso);

  // Buttons (3 dots on torso)
  for (let i = 0; i < 3; i++) {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.015*sc, 6, 6), cloth(0xffffff));
    btn.position.set(0, (0.45 + i*0.08)*sc, 0.16*sc); g.add(btn);
  }

  // Arms
  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.05*sc, 0.22*sc, 5, 6), cloth(shirtColor || 0x42a5f5));
    arm.position.set(s*0.22*sc, 0.5*sc, 0);
    arm.rotation.z = s * 0.2; g.add(arm);
    // Hand
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.04*sc, 6, 6), skin());
    hand.position.set(s*0.26*sc, 0.34*sc, 0); g.add(hand);
  }

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14*sc, 12, 12), skin());
  head.position.y = 0.82*sc; g.add(head);

  // Hair
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.145*sc, 12, 8, 0, Math.PI*2, 0, Math.PI*0.55),
    cloth(hairColor || 0x3e2723));
  hair.position.y = 0.84*sc; g.add(hair);

  // Eyes
  for (const s of [-0.045, 0.045]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.02*sc, 6, 6), cloth(0x212121));
    eye.position.set(s*sc, 0.82*sc, 0.13*sc); g.add(eye);
    // White
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.025*sc, 6, 6), cloth(0xffffff));
    white.position.set(s*sc, 0.82*sc, 0.125*sc); g.add(white);
  }

  // Mouth (small red sphere)
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.015*sc, 6, 4), cloth(0xd4726a));
  mouth.position.set(0, 0.77*sc, 0.13*sc); mouth.scale.set(1.5, 0.6, 0.5); g.add(mouth);

  return g;
}

export function makeAdult(height, shirtColor, pantsColor, hairColor) {
  const g = makeChild(height, shirtColor, pantsColor, hairColor);
  // Adults are just taller children in this style — proportions handle it
  return g;
}

export function makeBaby(scale) {
  const g = new THREE.Group();
  const s = scale || 0.5;
  // Body (rounder)
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.2*s, 10, 10), skin());
  body.scale.set(1, 0.8, 0.8); body.position.y = 0.15*s; g.add(body);
  // Head (big)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18*s, 10, 10), skin());
  head.position.y = 0.38*s; g.add(head);
  // Eyes
  for (const x of [-0.06, 0.06]) {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.02*s, 5, 5), cloth(0x212121)));
    g.children[g.children.length-1].position.set(x*s, 0.4*s, 0.16*s);
  }
  // Tiny arms
  for (const x of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.03*s, 0.1*s, 4, 4), skin());
    arm.position.set(x*0.2*s, 0.15*s, 0); arm.rotation.z = x*0.5; g.add(arm);
  }
  // Blanket
  const bl = new THREE.Mesh(new THREE.BoxGeometry(0.4*s, 0.04*s, 0.3*s),
    cloth(0xbbdefb)); bl.position.y = 0.08*s; g.add(bl);
  return g;
}
