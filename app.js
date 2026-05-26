import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

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

model.scale.set(20, 20, 20);

const box = new THREE.Box3().setFromObject(model);

const center = box.getCenter(new THREE.Vector3());

model.position.x -= center.x;
model.position.y -= center.y;
model.position.z -= center.z;

model.position.y = -1;
    scene.add(model);

    console.log("MODELO CARGADO");

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
