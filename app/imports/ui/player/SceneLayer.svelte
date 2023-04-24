<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
  import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

  export let asset
  export let state

  let camera, scene, renderer;

  onMount(() => {
    init();
    animate();
  });

  function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    scene = new THREE.Scene();

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader( dracoLoader );

    // Load a glTF resource
    loader.load(
      // resource URL
      asset.url,
      // called when the resource is loaded
      function ( gltf ) {

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened', error );

      }
    );


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    container.appendChild( renderer.domElement );

    // container.addEventListener('click', function () {
    //   video.play();
    // });

    //
    //document.body.appendChild(VRButton.createButton(renderer));
    window.addEventListener( 'resize', onWindowResize );

    const VRButtonElem = VRButton.createButton(renderer)
    document.body.appendChild(VRButtonElem)
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


  function animate() {
    renderer.setAnimationLoop(function () {
      renderer.render(scene, camera);
    });
  }


</script>

<div id="container"></div>