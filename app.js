import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 3);

dirLight.position.set(5, 10, 7);

scene.add(dirLight);

const loader = new GLTFLoader();

loader.load(
  'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',

  (gltf) => {

    const model = gltf.scene;

    model.scale.set(1.5, 1.5, 1.5);

    model.position.set(0, -1, 0);

    scene.add(model);

    console.log("MODELO CARGADO");

  },

  undefined,

  (error) => {

    console.error("ERROR:", error);

  }
);

function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

}

animate();

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});
