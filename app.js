import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xe6e7e5);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);

scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);

dirLight.position.set(5, 10, 7);

scene.add(dirLight);

const loader = new GLTFLoader();

loader.load(
  'models/8RA_UPS_RSMAT_demo.glb',

  function (gltf) {

    const model = gltf.scene;

    model.scale.set(1, 1, 1);

    model.position.set(0, -1, 0);

    scene.add(model);

  },

  undefined,

  function (error) {

    console.error(error);

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
