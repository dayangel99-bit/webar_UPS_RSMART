import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

console.log("APP INICIADA");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xe6e7e5);

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

console.log("RENDER OK");

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

  'models/8RA_UPS_RSMAT_demo.glb',

  function (gltf) {

    const model = gltf.scene;

    model.scale.set(2, 2, 2);

    model.position.set(0, -1, 0);

    scene.add(model);

    console.log("MODELO CARGADO");

    animate(model);

  },

  function (xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% cargado');

  },

  function (error) {

    console.error('ERROR GLB:', error);

  }

);

function animate(model) {

  function renderLoop() {

    requestAnimationFrame(renderLoop);

    model.rotation.y += 0.003;

    renderer.render(scene, camera);

  }

  renderLoop();

}

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});
