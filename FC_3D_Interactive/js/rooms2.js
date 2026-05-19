/**
 * rooms2.js — Rooms 5-8: University, Adult Life, Reveal, Finale
 */
import * as THREE from 'three';
import { makeChild, makeAdult } from './CharacterBuilder.js';

const cl = (c,r) => new THREE.MeshStandardMaterial({color:c,roughness:r||0.5,metalness:0.02});
const bx = (w,h,d,c,o) => new THREE.Mesh(new THREE.BoxGeometry(w,h,d), Object.assign(cl(c), o||{}));

function walls(z, fc, wc, W=16, D=14, H=8) {
  const g = new THREE.Group(); g.position.z = z;
  g.add(bx(W,.15,D,fc));
  const bk=bx(W,H,.15,wc); bk.position.set(0,H/2,-D/2); g.add(bk);
  for(const s of[-1,1]){const sw=bx(.15,H,D,wc,{transparent:true,opacity:.15});sw.position.set(s*W/2,H/2,0);g.add(sw);}
  g.add(bx(W,.1,D,0xfafafa)); g.children[g.children.length-1].position.y=H;
  const fix=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.06,16),cl(0xffffff));fix.position.set(0,H-.03,0);g.add(fix);
  g.add(new THREE.PointLight(0xfff5e0,2,22)); g.children[g.children.length-1].position.set(0,H-0.5,0);
  return g;
}

export function buildUniversity(z) {
  const room = walls(z, 0xf0f0f0, 0xe0e0e0);
  // Projector screen
  room.add(bx(8,4.5,.08,0x263238,{emissive:0x1565c0,emissiveIntensity:.12}));
  room.children[room.children.length-1].position.set(0,4.5,-6.9);
  // Screen frame
  room.add(bx(8.2,.1,.06,0x9e9e9e)); room.children[room.children.length-1].position.set(0,6.8,-6.88);
  // Podium
  const pod=new THREE.Group();
  pod.add(bx(2,.15,1.2,0x5d4037)); pod.children[0].position.y=1;
  pod.add(bx(1.8,1,.06,0x4e342e)); pod.children[1].position.set(0,.5,.6);
  // Microphone
  pod.add(bx(.02,.4,.02,0x757575)); pod.children[2].position.set(0,1.3,0);
  const mic=new THREE.Mesh(new THREE.SphereGeometry(.04,8,8),cl(0x424242));mic.position.set(0,1.52,0);pod.add(mic);
  pod.position.set(0,0,-5); room.add(pod);
  // Professor
  const prof=makeAdult(1.7,0x37474f,0x263238,0x9e9e9e); prof.position.set(1,0,-4.5); room.add(prof);
  // 3 tiered rows
  for(let r=0;r<3;r++){
    const th=r*.6,tz=.5+r*3.5;
    // Tier platform
    room.add(bx(14,.2+th,2.5,0xd7ccc8)); room.children[room.children.length-1].position.set(0,(.2+th)/2,tz);
    // Desk strip
    room.add(bx(13,.6,.12,0xa1887f)); room.children[room.children.length-1].position.set(0,.5+th,tz-.8);
    // Students
    for(let s=0;s<6;s++){
      const st=makeChild(1.3,[0x42a5f5,0xef5350,0x66bb6a,0xffa726,0xab47bc,0x26c6da][s],[0x37474f,0x455a64,0x263238][r%3],[0x3e2723,0x212121,0x4a148c,0x33691e,0x880e4f,0x01579b][s]);
      st.position.set(-5+s*2,.2+th,tz+.5); room.add(st);
    }
  }
  // Side windows with blinds
  for(const x of[-7.9,7.9]){
    room.add(bx(.06,3,4,0xbbdefb,{emissive:0x88ccff,emissiveIntensity:.08}));
    room.children[room.children.length-1].position.set(x,5,0);
    // Blinds
    for(let b=0;b<6;b++){room.add(bx(.04,.06,4,0xe0e0e0));room.children[room.children.length-1].position.set(x,3.5+b*.5,0);}
  }
  // Whiteboard markers
  for(let i=0;i<3;i++){const m=bx(.04,.15,.04,[0xff5252,0x1565c0,0x2e7d32][i]);m.position.set(-3+i*.3,.3,-6.2);room.add(m);}
  return room;
}

export function buildAdultLife(z) {
  const room = walls(z, 0xf5f5f5, 0xeceff1);
  // === LEFT: Office area ===
  // L-shaped desk
  room.add(bx(3,.08,1.5,0x455a64)); room.children[room.children.length-1].position.set(-4,1.8,-3);
  room.add(bx(1.5,.08,2,0x455a64)); room.children[room.children.length-1].position.set(-2.25,1.8,-2);
  // Desk legs
  for(const[x,zz]of[[-5.4,-3.7],[-2.6,-3.7],[-5.4,-2.3],[-1.5,-1]]){room.add(bx(.06,1.8,.06,0x37474f));room.children[room.children.length-1].position.set(x,.9,zz);}
  // Monitor
  const mon=bx(1.4,.9,.04,0x212121,{emissive:0x2196f3,emissiveIntensity:.25}); mon.position.set(-4,2.55,-3.5); room.add(mon);
  room.add(bx(.3,.3,.04,0x424242)); room.children[room.children.length-1].position.set(-4,2.05,-3.5);
  room.add(bx(.6,.04,.3,0x616161)); room.children[room.children.length-1].position.set(-4,1.9,-3.5);
  // Office chair
  const chair=new THREE.Group();
  chair.add(bx(.8,.06,.7,0x37474f)); chair.children[0].position.y=1.2;
  chair.add(bx(.7,.8,.06,0x37474f)); chair.children[1].position.set(0,1.6,-.35);
  chair.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.2,8),cl(0x757575))); chair.children[2].position.y=.6;
  // Wheels
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const wh=new THREE.Mesh(new THREE.SphereGeometry(.04,6,6),cl(0x424242));wh.position.set(Math.cos(a)*.3,0,Math.sin(a)*.3);chair.add(wh);}
  chair.position.set(-4,0,-2.5); room.add(chair);
  // Worker
  const worker=makeAdult(1.7,0x1565c0,0x37474f,0x3e2723); worker.position.set(-3.5,0,-2); room.add(worker);
  // Coffee mug on desk
  const mug=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.12,8),cl(0xffffff)); mug.position.set(-3,1.88,-3); room.add(mug);
  // === RIGHT: Hospital area ===
  // Bed
  const bed=new THREE.Group();
  bed.add(bx(2.5,.5,1.4,0xfafafa)); bed.children[0].position.y=.35;
  bed.add(bx(2.5,.06,1.4,0xe3f2fd)); bed.children[1].position.y=.62;
  bed.add(bx(.06,.6,1.4,0xe0e0e0)); bed.children[2].position.set(-1.25,.6,0); // headboard
  bed.add(bx(.06,.4,1.4,0xe0e0e0)); bed.children[3].position.set(1.25,.5,0); // footboard
  // Pillow
  bed.add(bx(.6,.12,.4,0xffffff)); bed.children[4].position.set(-1,.68,0);
  bed.position.set(3.5,0,1); room.add(bed);
  // IV stand
  const iv=new THREE.Group();
  iv.add(bx(.03,2.5,.03,0xbdbdbd)); iv.children[0].position.y=1.25;
  iv.add(bx(.6,.03,.03,0xbdbdbd)); iv.children[1].position.y=2.5;
  const bag=new THREE.Mesh(new THREE.CapsuleGeometry(.06,.15,6,6),new THREE.MeshStandardMaterial({color:0xbbdefb,transparent:true,opacity:.7}));
  bag.position.y=2.35; iv.add(bag);
  iv.position.set(4.5,0,.3); room.add(iv);
  // === BACK: Family ===
  const dad=makeAdult(1.7,0xef5350,0x37474f,0x3e2723); dad.position.set(-1,0,4); room.add(dad);
  const mom=makeAdult(1.6,0x66bb6a,0x455a64,0x4a148c); mom.position.set(1,0,4); room.add(mom);
  const kid=makeChild(.9,0xffa726,0x5d4037,0x3e2723); kid.position.set(0,0,4.5); room.add(kid);
  // Window
  room.add(bx(4,3,.06,0xbbdefb,{emissive:0x88ccff,emissiveIntensity:.1})); room.children[room.children.length-1].position.set(0,4.5,-6.9);
  return room;
}

export function buildReveal(z) {
  const g=new THREE.Group(); g.position.z=z;
  g.add(bx(18,.15,16,0xf0e8d8));
  g.add(bx(18,9,.15,0xe8e0d0)); g.children[1].position.set(0,4.5,-8);
  // Golden convergence lines
  const lm=new THREE.LineBasicMaterial({color:0xD4A843,transparent:true,opacity:.5});
  const origins=[[-7,7],[-4,1],[0,8],[4,1],[7,7],[-6,3],[6,3],[-2,6],[2,6]];
  origins.forEach(([x,y])=>{
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,y,-7.5),new THREE.Vector3(0,4,-4)]),lm));
  });
  // Central golden sphere (glowing)
  const core=new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32),
    new THREE.MeshStandardMaterial({color:0xD4A843,emissive:0xD4A843,emissiveIntensity:.6,metalness:.7,roughness:.15}));
  core.position.set(0,4,-4); core.userData={spin:true,axis:'y',speed:.2}; g.add(core);
  // Outer ring
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.2,.06,8,48),
    new THREE.MeshStandardMaterial({color:0xD4A843,emissive:0xD4A843,emissiveIntensity:.3,metalness:.5}));
  ring.position.set(0,4,-4); ring.rotation.x=Math.PI/3; ring.userData={spin:true,axis:'z',speed:.15}; g.add(ring);
  const ring2=ring.clone(); ring2.rotation.x=-Math.PI/4; ring2.rotation.z=Math.PI/3; ring2.userData={spin:true,axis:'x',speed:.1}; g.add(ring2);
  // Particles
  const pa=new Float32Array(120*3);
  for(let i=0;i<120;i++){const a=Math.random()*Math.PI*2,r=2+Math.random()*5;pa[i*3]=Math.cos(a)*r;pa[i*3+1]=2+Math.random()*5;pa[i*3+2]=-4+Math.sin(a)*r;}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
  g.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xD4A843,size:.08,transparent:true,opacity:.5})));
  g.add(new THREE.PointLight(0xD4A843,4,25)); g.children[g.children.length-1].position.set(0,4,-4);
  g.add(new THREE.PointLight(0xffeedd,1,15)); g.children[g.children.length-1].position.set(0,7,2);
  return g;
}

export function buildFinale(z) {
  const g=new THREE.Group(); g.position.z=z;
  // Grand marble floor
  g.add(bx(22,.2,18,0xe8dcc8,{metalness:.15,roughness:.35}));
  // FC Golden Tower
  const tower=new THREE.Group();
  // Main body
  tower.add(bx(5,12,5,0xD4A843,{metalness:.5,roughness:.2,emissive:0xD4A843,emissiveIntensity:.1}));
  tower.children[0].position.y=6;
  // Crown
  tower.add(bx(5.5,1,5.5,0xc49530,{metalness:.6,roughness:.15})); tower.children[1].position.y=12.2;
  // Windows (grid)
  for(let r=0;r<6;r++)for(let c=0;c<4;c++){
    const w=bx(.5,.35,.04,0xfff9c4,{emissive:0xfff9c4,emissiveIntensity:.6});
    w.position.set(-1.2+c*.8,1.5+r*1.7,2.55); tower.add(w);
  }
  // Entrance
  tower.add(bx(2,3,.1,0x5d4037)); tower.children[tower.children.length-1].position.set(0,1.5,2.55);
  // Entrance columns
  for(const s of[-1.5,1.5]){
    const col=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,3.5,12),
      new THREE.MeshStandardMaterial({color:0xc49530,metalness:.6,roughness:.2}));
    col.position.set(s,1.75,2.8); tower.add(col);
  }
  tower.position.set(0,0,-5); g.add(tower);
  // Red carpet
  g.add(bx(2,.04,8,0xc62828)); g.children[g.children.length-1].position.set(0,.12,0);
  // People approaching on carpet
  for(let i=0;i<8;i++){
    const h=makeAdult(1.5+Math.random()*.2,[0x42a5f5,0xef5350,0x66bb6a,0xffa726,0xab47bc,0x26c6da,0xec407a,0x78909c][i],[0x37474f,0x263238,0x455a64][i%3],[0x3e2723,0x212121,0x4a148c,0x880e4f][i%4]);
    h.position.set(-1+Math.random()*2,0,2+i*1.2); h.rotation.y=Math.PI; g.add(h);
  }
  // Grand lighting
  g.add(new THREE.PointLight(0xD4A843,5,30)); g.children[g.children.length-1].position.set(0,15,-5);
  g.add(new THREE.PointLight(0xffffff,1.5,20)); g.children[g.children.length-1].position.set(0,8,6);
  g.add(new THREE.SpotLight(0xffd700,2,25,Math.PI/6,.3)); g.children[g.children.length-1].position.set(0,14,0);
  return g;
}
