<script>
  // @ts-nocheck
  import { onMount, onDestroy } from 'svelte';
  // import threejs
  import * as THREE from 'three';
  //import { VRButton } from 'three/addons/webxr/VRButton.js';
  import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

  export let asset;
  export let state;

  $: paused = !state.playing;
  
  onMount(() => {
    import('hls.js').then(Hls => {
      var video = document.getElementById('video');
      var videoSrc = asset.url;
      // https://tube.kh-berlin.de/static/streaming-playlists/hls/58f28745-1a9b-47e2-9d45-f2c40b05cb6c/master.m3u8
      // https://tube.kh-berlin.de/videos/watch/8d09e932-b03b-40f1-8d6a-7a4554a4b9d7
      // https://rec.stream.intergestalt.cloud/hls/test.m3u8
      // https://tube.kh-berlin.de/static/streaming-playlists/hls/8d09e932-b03b-40f1-8d6a-7a4554a4b9d7/master.m3u8
      // 
      console.log(Hls)
      if (Hls.isSupported()) {
        var hls = new Hls.default();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      }
      // HLS.js is not supported on platforms that do not have Media Source
      // Extensions (MSE) enabled.
      //
      // When the browser has built-in HLS support (check using `canPlayType`),
      // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
      // element through the `src` property. This is using the built-in support
      // of the plain video element, without using HLS.js.
      //
      // Note: it would be more normal to wait on the 'canplay' event below however
      // on Safari (where you are most likely to find built-in HLS support) the
      // video.src URL must be on the user-driven white-list before a 'canplay'
      // event will be emitted; the last video event that can be reliably
      // listened-for when the URL is not on the white-list is 'loadedmetadata'.
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      }
    })
  });
  
  
  let camera, scene, renderer;

  const distance = 50;

  let mounted = false

  onMount(() => {
    init();
    animate();
    

    // three/addons/webxr/VRButton.js
    // three/examples/jsm/webxr/VRButton
    
    //import('three/addons/webxr/VRButton.js').then(module => {
    //  const { VRButton } = module;
      document.body.appendChild(VRButton.createButton(renderer));
    //});

    mounted = true
  });

  onDestroy(() => {
    const session = renderer.xr.getSession()
    if (session) session.end()
  });

  function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );

    const video = document.getElementById( 'video' );
    //video.play();

    const texture = new THREE.VideoTexture( video );
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.y = - Math.PI / 2;
    scene.add( mesh );

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


<!--link type="text/css" rel="stylesheet" href="main.css"-->
<!--svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
</svelte:head-->

<div id="container"></div>

<video id="video" loop muted crossOrigin="anonymous" playsinline style="display:none" bind:paused >
  <source src="https://threejs.org/examples/textures/pano.webm">
  <source src="https://threejs.org/examples/textures/pano.mp4">
</video>

<style>
  video {
    width: 100%;
  }
</style>