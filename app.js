import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0xe2e5e8, 10, 25);

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

renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);



// LUCES

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

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

scene.add(dirLight);



// LUZ AZUL

const blueLight = new THREE.PointLight(
  0x4f8cff,
  2,
  20
);

blueLight.position.set(-4, 3, 4);

scene.add(blueLight);



// PISO

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({
    opacity: 0.18
  })
);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -2.7;

floor.receiveShadow = true;

scene.add(floor);



// LOADER

const loader = new GLTFLoader();

let modelo;

loader.load(

  './models/8RA_UPS_RSMAT_demo.glb',

  function (gltf) {

    const model = gltf.scene;

    modelo = model;

    model.scale.set(20, 20, 20);

    const box = new THREE.Box3().setFromObject(model);

    const center = box.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    model.position.y = -0.3;



    // SOMBRAS

    model.traverse((node) => {

      if (node.isMesh) {

        node.castShadow = true;
        node.receiveShadow = true;

      }

    });



    scene.add(model);

    console.log("MODELO CARGADO");

  },

  undefined,

  function (error) {

    console.error(error);

  }

);



// ANIMACIÓN

function animate() {

  requestAnimationFrame(animate);

  if (modelo) {

    modelo.rotation.y += 0.003;

  }

  renderer.render(scene, camera);

}

animate();



// RESPONSIVE

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});
