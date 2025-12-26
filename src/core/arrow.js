import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

export function createArrow() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  );
  body.rotation.x = Math.PI / 2;

  const head = new THREE.Mesh(
    new THREE.ConeGeometry(0.15, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  );
  head.position.z = -0.65;
  head.rotation.x = Math.PI / 2;

  group.add(body);
  group.add(head);

  return group;
}
