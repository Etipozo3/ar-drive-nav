import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { createArrow } from './arrow.js';

let scene, camera, renderer, arrow;

export function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.set(0, 1.6, 0);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene'),
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(light);

  arrow = createArrow();
  arrow.position.set(0, -0.7, -3);
  scene.add(arrow);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export function updateArrowRotation(angleRad) {
  arrow.rotation.y = angleRad;
}
