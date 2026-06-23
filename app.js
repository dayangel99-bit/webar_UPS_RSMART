import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

import { RGBELoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/RGBELoader.js';

// ESCENA

const scene = new THREE.Scene();




// CÁMARA

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);



// RENDER

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.15;

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

// HDRI ENVIRONMENT

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader()
  .load('./hdri/studio.hdr', (texture) => {

    const envMap = pmremGenerator
      .fromEquirectangular(texture)
      .texture;

    scene.environment = envMap;
    scene.environmentIntensity = 0.35;

    texture.dispose();
    pmremGenerator.dispose();

    console.log("HDRI CARGADO");

  });

// CONTROLES

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.enablePan = false;

controls.minDistance = 5;

controls.maxDistance = 15;



// AUTOROTACIÓN

let autoRotate = true;

controls.addEventListener('start', () => {

  autoRotate = false;

});



// LUCES

const hemiLight = new THREE.HemisphereLight(
  0xffffff,
  0xdfe6f5,
  0.6
);

scene.add(hemiLight);



const dirLight = new THREE.DirectionalLight(
  0xffffff,
  1.5
);

dirLight.position.set(5, 10, 7);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;

dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.radius = 12;

dirLight.shadow.blurSamples = 25;

scene.add(dirLight);



// LUZ AZUL

const blueLight = new THREE.PointLight(
  0x4f8cff,
  0.3,
  20
);

blueLight.position.set(-4, 3, 4);

scene.add(blueLight);



// LUZ TRASERA

const rimLight = new THREE.PointLight(
  0xffffff,
  0.7,
  30
);

rimLight.position.set(0, 5, -8);

scene.add(rimLight);



// LUZ FRONTAL

const frontLight = new THREE.PointLight(
  0xffffff,
  0.5,
  20
);

frontLight.position.set(0, 2, 6);

scene.add(frontLight);



// PISO / SOMBRA

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({
    opacity: 0.045
  })
);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -2.15;

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



    // ESCALA RESPONSIVE

    const isMobile = window.innerWidth < 768;

    if (isMobile) {

      model.scale.set(14, 14, 14);

    } else {

      model.scale.set(20, 20, 20);

    }



    // CENTRAR MODELO

    const box = new THREE.Box3().setFromObject(model);

    const center = box.getCenter(new THREE.Vector3());

    model.position.x -= center.x;

    model.position.y -= center.y;

    model.position.z -= center.z;



    // ALTURA

    model.position.y = -0.3;


// MATERIALES + SOMBRAS

model.traverse((node) => {

  if (node.isMesh) {

    console.log(
      node.name,
      node.material?.name
    );

    if (node.material?.name === "Material") {

      node.material.roughness = 0.25;
      node.material.metalness = 0.02;

    }

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



  if (modelo && autoRotate) {

    modelo.rotation.y += 0.003;

  }



  controls.update();

  renderer.render(scene, camera);

}

animate();



// RESPONSIVE

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});
