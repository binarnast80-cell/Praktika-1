/**
 * rooms1.js — Rooms 0-4: Womb, Nursery, Kindergarten, School, Hobbies
 */
import * as THREE from 'three';
import { makeChild, makeBaby } from './CharacterBuilder.js';

const cl = (c,r) => new THREE.MeshStandardMaterial({color:c,roughness:r||0.5,metalness:0.02});
const bx = (w,h,d,c,o) => new THREE.Mesh(new THREE.BoxGeometry(w,h,d), Object.assign(cl(c), o||{}));

function walls(z, fc, wc, W=14, D=12, H=7) {
  const g = new THREE.Group(); g.position.z = z;
  g.add(bx(W,.15,D,fc)); // floor
  const bk = bx(W,H,.15,wc); bk.position.set(0,H/2,-D/2); g.add(bk);
  for (const s of [-1,1]) { const sw=bx(.15,H,D,wc,{transparent:true,opacity:.15}); sw.position.set(s*W/2,H/2,0); g.add(sw); }
  // ceiling
  const ceil = bx(W,.1,D,0xfafafa); ceil.position.y=H; g.add(ceil);
  // baseboard
  for (const s of [-1,1]) { const bb=bx(W,.2,.02,0xd7ccc8); bb.position.set(0,.1,s*D/2); g.add(bb); }
  // ceiling light fixture
  const fix = new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.08,16), cl(0xffffff));
  fix.position.set(0,H-.05,0); g.add(fix);
  g.add(new THREE.PointLight(0xfff5e0,1.8,18)); g.children[g.children.length-1].position.set(0,H-0.5,0);
  return g;
}

export function buildWomb(z) {
  const g = new THREE.Group(); g.position.z = z;
  // Warm organic sphere
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,32,32),
    new THREE.MeshStandardMaterial({color:0xd46a6a,roughness:.9,transparent:true,opacity:.2,side:THREE.BackSide}));
  sphere.position.y=3; g.add(sphere);
  // Inner membrane
  const inner = new THREE.Mesh(new THREE.SphereGeometry(3.5,24,24),
    new THREE.MeshStandardMaterial({color:0xe88888,roughness:.95,transparent:true,opacity:.08,side:THREE.BackSide}));
  inner.position.y=3; g.add(inner);
  // Warm lights
  g.add(new THREE.PointLight(0xff6666,3,12)); g.children[g.children.length-1].position.set(0,3,0);
  g.add(new THREE.PointLight(0xff9999,1.5,8)); g.children[g.children.length-1].position.set(2,4,1);
  // Embryo
  const emb = new THREE.Mesh(new THREE.SphereGeometry(.5,16,16), cl(0xffccaa,.7));
  emb.position.set(0,2.8,0); emb.scale.set(1,.8,.7); g.add(emb);
  const lm = cl(0xffccaa,.7);
  for (const [x,y,rz] of [[.3,2.6,.8],[-.25,2.5,-.6],[.15,2.3,.4],[-.2,2.2,-.3]]) {
    const l = new THREE.Mesh(new THREE.CapsuleGeometry(.06,.2,4,6),lm);
    l.position.set(x,y,.1); l.rotation.z=rz; g.add(l);
  }
  // Umbilical cord (curved tube)
  const pts=[new THREE.Vector3(0,2.5,0),new THREE.Vector3(.5,3.5,.3),new THREE.Vector3(-.3,4.5,.1),new THREE.Vector3(0,5,0)];
  const curve=new THREE.CatmullRomCurve3(pts);
  const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,20,.04,8,false),cl(0xcc7777,.8));
  g.add(tube);
  // Floating cell particles
  const pa=new Float32Array(80*3);
  for(let i=0;i<80;i++){const a=Math.random()*Math.PI*2,r=1+Math.random()*3;pa[i*3]=Math.cos(a)*r;pa[i*3+1]=2+(Math.random()-.5)*5;pa[i*3+2]=Math.sin(a)*r;}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
  g.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xff8888,size:.06,transparent:true,opacity:.4})));
  return g;
}

export function buildNursery(z) {
  const room = walls(z, 0xfff8f0, 0xfce4ec);
  // Window on back wall
  const win=bx(3,2.5,.08,0xbbdefb,{emissive:0x88ccff,emissiveIntensity:.2}); win.position.set(4,3.5,-5.9); room.add(win);
  const frame1=bx(3.2,.1,.1,0xd7ccc8); frame1.position.set(4,4.8,-5.85); room.add(frame1);
  const frame2=frame1.clone(); frame2.position.y=2.25; room.add(frame2);
  // Curtains
  for(const s of [-1,1]){const c=bx(.6,2.8,.05,0xffcdd2);c.position.set(4+s*1.7,3.5,-5.8);room.add(c);}
  // 3 cribs with babies
  for (let i=-1;i<=1;i++) {
    const crib=new THREE.Group(); crib.position.set(i*3.5,0,.5);
    // Crib body
    crib.add(bx(2,.7,1.2,0xd4c4a0)); crib.children[0].position.y=.5;
    // Rails (4 per side)
    for(let r=0;r<4;r++){for(const s of[-.95,.95]){const rail=bx(.04,.5,.04,0xbcaaa4);rail.position.set(s,.95,-.5+r*.35);crib.add(rail);}}
    // Headboard
    crib.add(bx(2,.6,.06,0xbcaaa4)); crib.children[crib.children.length-1].position.set(0,.8,-.6);
    // Mattress
    crib.add(bx(1.7,.1,.95,0xe3f2fd)); crib.children[crib.children.length-1].position.y=.9;
    // Baby
    const baby=makeBaby(1.2); baby.position.y=.95; crib.add(baby);
    // Blanket
    crib.add(bx(.9,.04,.5,[0xf8bbd0,0xbbdefb,0xd1c4e9][i+1])); crib.children[crib.children.length-1].position.set(0,.98,.1);
    // Mobile above crib (spinning toy)
    const mob=new THREE.Group();
    const rod=bx(.02,.6,.02,0x9e9e9e); rod.position.y=1.8; mob.add(rod);
    for(let t=0;t<3;t++){
      const toy=new THREE.Mesh(new THREE.SphereGeometry(.08,8,8),cl([0xff5252,0x42a5f5,0xffd740][t]));
      const a=t*Math.PI*2/3; toy.position.set(Math.cos(a)*.3,1.45,Math.sin(a)*.3);
      toy.userData={spin:true,angle:a,radius:.3,speed:0.8+t*0.2};
      mob.add(toy);
    }
    crib.add(mob);
    room.add(crib);
  }
  // Wall art — stork picture
  const art=bx(1.5,1,.05,0xfff9c4); art.position.set(-5,3.5,-5.9); room.add(art);
  // Warm side light
  room.add(new THREE.PointLight(0xffeedd,1,10)); room.children[room.children.length-1].position.set(-5,4,3);
  return room;
}

export function buildKindergarten(z) {
  const room = walls(z, 0xfff9e6, 0xfff3e0);
  // Window
  const win=bx(4,2.5,.08,0xc8e6c9,{emissive:0x88cc88,emissiveIntensity:.15}); win.position.set(0,3.5,-5.9); room.add(win);
  // Colorful blocks
  const cols=[0xff5252,0x448aff,0x69f0ae,0xffd740,0xea80fc,0xff7043,0x26c6da];
  for(let i=0;i<15;i++){const s=.25+Math.random()*.35;const b=bx(s,s,s,cols[i%7]);b.position.set((Math.random()-.5)*9,s/2,(Math.random()-.5)*7);b.rotation.y=Math.random()*Math.PI;b.rotation.z=Math.random()*.3;room.add(b);}
  // Round table
  const ttop=new THREE.Mesh(new THREE.CylinderGeometry(1.5,.01,1.5,.12,16),cl(0x66bb6a));
  ttop.position.set(-2,1.2,1); room.add(ttop);
  for(let a=0;a<4;a++){const l=bx(.1,1.2,.1,0x8d6e63);l.position.set(-2+Math.cos(a*Math.PI/2)*1,.6,1+Math.sin(a*Math.PI/2)*1);room.add(l);}
  // 4 children around table
  for(let i=0;i<4;i++){
    const ch=makeChild(.9,[0xff8a65,0x4fc3f7,0xba68c8,0x81c784][i],[0x5d4037,0x37474f,0x4a148c,0x2e7d32][i],[0x3e2723,0x212121,0x4a148c,0x33691e][i]);
    const a=i*Math.PI/2; ch.position.set(-2+Math.cos(a)*2,0,1+Math.sin(a)*2);
    ch.rotation.y=-a+Math.PI; room.add(ch);
  }
  // Drawings on wall
  for(let i=0;i<5;i++){const d=bx(1,.8,.02,cols[i]);d.position.set(-5+i*2.5,3.5,-5.9);room.add(d);}
  // Bookshelf on side
  const shelf=new THREE.Group();
  shelf.add(bx(1.5,3,.4,0x8d6e63)); shelf.children[0].position.y=1.5;
  for(let r=0;r<3;r++){for(let b=0;b<4;b++){const bk=bx(.15,.4,.3,cols[(r*4+b)%7]);bk.position.set(-.5+b*.35,.5+r*1,.05);shelf.add(bk);}}
  shelf.position.set(6,0,0); room.add(shelf);
  // Sun light from window
  room.add(new THREE.SpotLight(0xfff9c4,1.5,15,Math.PI/4,.5)); room.children[room.children.length-1].position.set(0,6,-4);
  return room;
}

export function buildSchool(z) {
  const room = walls(z, 0xf0f0f8, 0xe8eaf6, 16, 14, 8);
  // Blackboard
  room.add(bx(8,3.5,.15,0x1b5e20,{roughness:.9})); room.children[room.children.length-1].position.set(0,3.5,-6.9);
  // Chalk writing lines
  for(let i=0;i<4;i++){room.add(bx(2+Math.random()*3,.06,.02,0xeeeeee,{emissive:0xffffff,emissiveIntensity:.3}));room.children[room.children.length-1].position.set(-1+Math.random()*2,2.5+i*.7,-6.8);}
  // Board frame
  room.add(bx(8.2,.12,.1,0x5d4037)); room.children[room.children.length-1].position.set(0,5.3,-6.85);
  room.add(bx(8.2,.12,.1,0x5d4037)); room.children[room.children.length-1].position.set(0,1.65,-6.85);
  // Teacher's desk
  room.add(bx(3,.1,1.5,0x5d4037)); room.children[room.children.length-1].position.set(0,1.6,-5);
  for(const[x,zz]of[[-1.3,-.6],[1.3,-.6],[-1.3,.6],[1.3,.6]]){room.add(bx(.08,1.6,.08,0x4e342e));room.children[room.children.length-1].position.set(x,.8,-5+zz);}
  // Teacher
  const teacher=makeChild(1.6,0x5d4037,0x37474f,0x4e342e); teacher.position.set(0,0,-4); room.add(teacher);
  // 9 desks (3x3 grid) with students
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){
    const dx=new THREE.Group();dx.add(bx(2,.08,1,0xa1887f));dx.children[0].position.y=1.4;
    for(const[lx,lz]of[[-0.8,-.4],[.8,-.4],[-.8,.4],[.8,.4]]){dx.add(bx(.06,1.4,.06,0x6d4c41));dx.children[dx.children.length-1].position.set(lx,.7,lz);}
    // Chair
    dx.add(bx(.8,.06,.6,0xa1887f)); dx.children[dx.children.length-1].position.set(0,1,.6);
    dx.position.set(-4+c*4,0,-1+r*3.5); room.add(dx);
    const st=makeChild(1.2,[0x42a5f5,0xef5350,0x66bb6a,0xffa726,0xab47bc,0x26c6da,0xec407a,0x78909c,0xffb74d][r*3+c],[0x37474f,0x455a64,0x3e2723][r],[0x3e2723,0x212121,0x5d4037][c]);
    st.position.set(-4+c*4,0,-1+r*3.5+.7); room.add(st);
  }
  // Clock on wall
  const clock=new THREE.Mesh(new THREE.CircleGeometry(.4,24),cl(0xffffff)); clock.position.set(6,5,-6.85); room.add(clock);
  const rim=new THREE.Mesh(new THREE.RingGeometry(.38,.42,24),cl(0x37474f)); rim.position.set(6,5,-6.83); room.add(rim);
  // Globe on teacher desk
  const globe=new THREE.Mesh(new THREE.SphereGeometry(.2,12,12),cl(0x42a5f5)); globe.position.set(1,1.85,-5); room.add(globe);
  globe.userData={spin:true,axis:'y',speed:.3};
  // Windows
  for(const x of[-6,6]){room.add(bx(.08,3,3,0xbbdefb,{emissive:0x88ccff,emissiveIntensity:.1}));room.children[room.children.length-1].position.set(x>0?7.95:-7.95,4,0);}
  return room;
}

export function buildHobbies(z) {
  const room = walls(z, 0xfff0f4, 0xfce4ec);
  // LEFT SIDE: Music area
  // Dombra on wall
  const domG=new THREE.Group();
  const domBody=new THREE.Mesh(new THREE.SphereGeometry(.45,16,16),cl(0x8d6e63)); domBody.scale.set(.55,.75,.2); domG.add(domBody);
  const neck=bx(.08,1.3,.06,0x6d4c41); neck.position.y=.9; domG.add(neck);
  const headstock=bx(.15,.15,.06,0x5d4037); headstock.position.y=1.55; domG.add(headstock);
  for(const dx of[-.02,.02]){const s=bx(.005,1.8,.005,0xffd54f);s.position.set(dx,.5,0);domG.add(s);}
  domG.position.set(-4,2.5,-5.5); domG.rotation.z=.15; room.add(domG);
  // Music stand
  room.add(bx(.8,.6,.02,0xfafafa)); room.children[room.children.length-1].position.set(-3,2.5,-3);
  room.add(bx(.04,1.8,.04,0x9e9e9e)); room.children[room.children.length-1].position.set(-3,1.2,-3);
  // Musician child
  const mus=makeChild(1.3,0x7b1fa2,0x4a148c,0x3e2723); mus.position.set(-3,0,-2); mus.rotation.y=Math.PI; room.add(mus);
  // RIGHT SIDE: Wrestling
  room.add(bx(5,.06,4,0x1565c0)); room.children[room.children.length-1].position.set(2,.03,0);
  // Wrestlers
  const w1=makeChild(1.4,0xe53935,0xb71c1c,0x212121); w1.position.set(1,0,0); w1.rotation.y=.5; room.add(w1);
  const w2=makeChild(1.4,0x1565c0,0x0d47a1,0x3e2723); w2.position.set(3,0,.5); w2.rotation.y=-.5; room.add(w2);
  // Trophy shelf
  const ts=new THREE.Group(); ts.add(bx(2,.08,.4,0x5d4037)); ts.children[0].position.y=2;
  ts.add(bx(2,.08,.4,0x5d4037)); ts.children[1].position.y=3;
  for(let i=0;i<3;i++){
    const cup=new THREE.Mesh(new THREE.CylinderGeometry(.06,.1,.3,8),new THREE.MeshStandardMaterial({color:0xffd700,metalness:.8,roughness:.2}));
    cup.position.set(-.5+i*.5,2.2,0); ts.add(cup);
  }
  ts.position.set(5,0,-4); room.add(ts);
  // Punching bag
  const bag=new THREE.Mesh(new THREE.CylinderGeometry(.2,.25,.8,12),cl(0xd32f2f));
  bag.position.set(5,2.5,2); room.add(bag);
  room.add(bx(.02,1.5,.02,0x757575)); room.children[room.children.length-1].position.set(5,3.5,2);
  // Spotlight
  room.add(new THREE.SpotLight(0xfff9c4,1.5,12,Math.PI/5,.3)); room.children[room.children.length-1].position.set(0,6.5,0);
  return room;
}
