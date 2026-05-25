import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = null;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 6);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  3
);

scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(
  0xffffff,
  3
);

dirLight.position.set(5, 10, 7);

scene.add(dirLight);

const loader = new GLTFLoader();

loader.load(

  './models/8RA_UPS_RSMAT_demo.glb',

  function (gltf) {

    const model = gltf.scene;

    model.scale.set(2, 2, 2);

    model.position.set(0, -1, 0);

    scene.add(model);

    console.log("MODELO CARGADO");

  },

  function (xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% cargado');

  },

  function (error) {

    console.error('ERROR GLB:', error);

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
