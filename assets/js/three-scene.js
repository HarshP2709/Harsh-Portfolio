/* ============================================================
   THREE-SCENE.JS — Three.js 3D Scenes  (FIXED)
   Hero Background Particles + Floating Sphere
   ============================================================ */

'use strict';

/* Guard: bail early if Three.js failed to load */
if (typeof THREE === 'undefined') {
  console.warn('Three.js not loaded — 3D scenes skipped.');
} else {

/* ── Hero Background Canvas ─────────────────────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  let W = window.innerWidth, H = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W, H);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.set(0, 0, 4);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const dLight = new THREE.DirectionalLight(0x7c3aed, 1.1);
  dLight.position.set(2, 2, 2);
  scene.add(dLight);
  const dLight2 = new THREE.DirectionalLight(0x00e5ff, 0.5);
  dLight2.position.set(-2, -2, 1);
  scene.add(dLight2);

  // Particle field
  const COUNT   = window.innerWidth < 768 ? 600 : 1600;
  const pos     = new Float32Array(COUNT * 3);
  const colArr  = new Float32Array(COUNT * 3);
  const palette = [
    new THREE.Color('#7c3aed'),
    new THREE.Color('#00e5ff'),
    new THREE.Color('#ff4d9d'),
    new THREE.Color('#ffffff'),
  ];

  for (let i = 0; i < COUNT; i++) {
    const r   = Math.random() * 12 + 2;
    const th  = Math.random() * Math.PI * 2;
    const ph  = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = r * Math.cos(ph);
    const c        = palette[i % palette.length];
    colArr[i * 3]     = c.r;
    colArr[i * 3 + 1] = c.g;
    colArr[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));

  const pMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.5 });
  const particles = new THREE.Points(geo, pMat);
  scene.add(particles);

  // Wireframe torus rings
  const t1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.014, 6, 80),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.15 })
  );
  t1.rotation.x = Math.PI / 3;
  scene.add(t1);

  const t2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.2, 0.010, 6, 80),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.08 })
  );
  t2.rotation.x = -Math.PI / 5;
  t2.rotation.z =  Math.PI / 4;
  scene.add(t2);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  let active  = true;

  function animate() {
    if (!active) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    particles.rotation.y = t * 0.025;
    particles.rotation.x = t * 0.008;
    t1.rotation.y = t * 0.10;
    t2.rotation.y = t * 0.07;
    t2.rotation.z = t * 0.04;

    camera.position.x += (mx * 0.25 - camera.position.x) * 0.03;
    camera.position.y += (-my * 0.25 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    active = !document.hidden;
    if (active) { clock.start(); animate(); }
  });
})();

/* ── Hero Sphere Canvas ──────────────────────────────────────── */
(function initHeroSphere() {
  const canvas    = document.getElementById('sphereCanvas');
  if (!canvas) return;
  const container = canvas.parentElement;
  if (!container) return;

  function getSize() {
    return {
      w: container.offsetWidth  || 480,
      h: container.offsetHeight || 480,
    };
  }

  const { w, h } = getSize();

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(w, h);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 3;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const p1 = new THREE.PointLight(0x7c3aed, 3.5, 8);
  p1.position.set(2, 2, 2);
  scene.add(p1);

  const p2 = new THREE.PointLight(0x00e5ff, 2.5, 8);
  p2.position.set(-2, -1, 2);
  scene.add(p2);

  const p3 = new THREE.PointLight(0xff4d9d, 1.8, 6);
  p3.position.set(0, 3, -2);
  scene.add(p3);

  // Icosahedron sphere
  const sGeo = new THREE.IcosahedronGeometry(1, 10);
  const sMat = new THREE.MeshPhongMaterial({
    color: 0x7c3aed,
    emissive: 0x150830,
    shininess: 100,
    specular: 0x00e5ff,
    transparent: true,
    opacity: 0.92,
  });
  const sphere = new THREE.Mesh(sGeo, sMat);
  scene.add(sphere);

  // Wireframe overlay
  const wGeo = new THREE.IcosahedronGeometry(1.02, 3);
  const wMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.1 });
  const wire = new THREE.Mesh(wGeo, wMat);
  scene.add(wire);

  // Orbiting rings
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.3, 0.007, 4, 120),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.5 })
  );
  ring1.rotation.x = Math.PI / 2;
  scene.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, 0.005, 4, 100),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.25 })
  );
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  // Orbiting dots
  const dotA = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff4d9d })
  );
  const pivotA = new THREE.Object3D();
  pivotA.rotation.x = Math.PI / 5;
  pivotA.add(dotA);
  dotA.position.set(1.6, 0, 0);
  scene.add(pivotA);

  const dotB = new THREE.Mesh(
    new THREE.SphereGeometry(0.040, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff })
  );
  const pivotB = new THREE.Object3D();
  pivotB.rotation.x = -Math.PI / 4;
  pivotB.rotation.z =  Math.PI / 3;
  pivotB.add(dotB);
  dotB.position.set(-1.75, 0, 0);
  scene.add(pivotB);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  });

  const clock  = new THREE.Clock();
  let   active = true;
  let   tRotX  = 0, tRotY = 0;

  function animate() {
    if (!active) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    tRotY = mx * 0.55;
    tRotX = my * 0.35;

    sphere.rotation.y += (tRotY - sphere.rotation.y) * 0.05 + 0.004;
    sphere.rotation.x += (tRotX - sphere.rotation.x) * 0.05;

    wire.rotation.y = sphere.rotation.y + 0.3;
    wire.rotation.x = sphere.rotation.x + 0.1;

    ring1.rotation.z = t * 0.35;
    ring2.rotation.y = t * 0.22;

    pivotA.rotation.y =  t * 1.1;
    pivotB.rotation.y = -t * 0.75;

    // Float up/down
    const fy = Math.sin(t * 0.7) * 0.07;
    sphere.position.y = fy;
    wire.position.y   = fy;
    ring1.position.y  = fy * 0.5;
    ring2.position.y  = fy * 0.3;

    // Pulse lights
    p1.intensity = 3.5 + Math.sin(t * 1.4) * 0.7;
    p2.intensity = 2.5 + Math.cos(t * 1.1) * 0.5;

    renderer.render(scene, camera);
  }

  animate();

  // Resize observer — re-size canvas when container changes
  const ro = new ResizeObserver(() => {
    const { w: nw, h: nh } = getSize();
    if (nw > 0 && nh > 0) {
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
  });
  ro.observe(container);

  document.addEventListener('visibilitychange', () => {
    active = !document.hidden;
    if (active) { clock.start(); animate(); }
  });
})();

} // end THREE guard

console.log('%c Three.js Scenes ✓', 'color:#00e5ff;font-weight:bold;font-family:monospace');
