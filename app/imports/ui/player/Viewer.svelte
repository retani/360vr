<script>
  // @ts-nocheck
  import { onMount, onDestroy, getContext } from 'svelte';
  // import threejs
  import * as THREE from 'three';
  //import { VRButton } from 'three/addons/webxr/VRButton.js';
  import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

  export let asset;
  export let state;

  const browserEvents =  getContext("browserEvents")

  $: visibilityRegainedEvents = ($browserEvents || []).filter(e => e == "visibility_visible")

  let video

  let camera, scene, renderer;

  const distance = 50;

  let mounted = false
  let metadataloaded = false
  let VRButtonElem = null
  let paused = true

  $: {
    if (metadataloaded && mounted) {
      paused = state.transport != "playing";
      console.log("paused: ", paused);
    }
  }
  
  onMount(() => {

    import('hls.js').then(Hls => {

      // url="https://tube.kh-berlin.de/videos/watch/6000af6b-13c2-4644-8315-6b6a6c6bc6c4"
      // videoSrc="https://tube.kh-berlin.de/static/streaming-playlists/hls/5db24246-3f3b-4303-b472-8d851bfe3c6f/master.m3u8"

      // transform video url to hls url if it doesn't already end with .m3u8
      if (!asset.url.endsWith('.m3u8')) {
        var videoSrc = asset.url.replace('videos/watch', 'static/streaming-playlists/hls') + '/master.m3u8'
      } else {
        var videoSrc = asset.url
      }
      

      // https://tube.kh-berlin.de/static/streaming-playlists/hls/58f28745-1a9b-47e2-9d45-f2c40b05cb6c/master.m3u8
      // https://tube.kh-berlin.de/videos/watch/8d09e932-b03b-40f1-8d6a-7a4554a4b9d7
      // https://rec.stream.intergestalt.cloud/hls/test.m3u8
      // https://tube.kh-berlin.de/static/streaming-playlists/hls/8d09e932-b03b-40f1-8d6a-7a4554a4b9d7/master.m3u8
      // 

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

    init();
    animate();
    

    // three/addons/webxr/VRButton.js
    // three/examples/jsm/webxr/VRButton
    
    //import('three/addons/webxr/VRButton.js').then(module => {
    //  const { VRButton } = module;
      VRButtonElem = VRButton.createButton(renderer)
      document.body.appendChild(VRButtonElem)
    //});

    mounted = true
  });

  onDestroy(() => {
    const session = renderer.xr.getSession()
    if (session) session.end()
    // remove VRButton
    if (VRButtonElem) VRButtonElem.remove()
  });

  //const onCanPlay = () => {
  //  if (state.playing) setTimeout(() => video.play(), 10)
  //console.log('onCanPlay')
  //}

  const onLoadedMetadata = () => {
    console.log('onLoadedMetadata')
    metadataloaded = true
    console.log('resyncing because metadata loaded')
    resync()
  }

  const resync = () => {
    let timeOffset
    if (state.transport == "paused") {
      timeOffset = state.offset
      if (video && !video.paused) video.pause()
    } else if (state.transport == "playing") {
      timeOffset = TimeSync.serverTime() - state.startedAt
      if (video && video.paused) video.play()
    }
    if (timeOffset && video) {
      const delta = Math.abs(video.currentTime - timeOffset / 1000)
      console.log('delta', delta, timeOffset, video.currentTime)
      if (delta > 0.2) {
        video.currentTime = timeOffset / 1000
      }
    }
  }

  $: {
    console.log(visibilityRegainedEvents)
    console.log('resyncing because visibility regained')
    resync()
  }

  const onVideoEvent = (event) => {
    console.log('onVideoEvent', event.type)
    if (event.type == "waiting") {
      console.log("resyncing because canplaythrough")
      resync()
    }
  }

  function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );    

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

<video 
    loop 
    muted 
    crossOrigin="anonymous" 
    playsinline 
    style="display:none" 
    bind:this={video}
    bind:paused 
    on:loadedmetadata={onLoadedMetadata}
    on:loadstart={onVideoEvent}
    on:ended={onVideoEvent}
    on:canplay={onVideoEvent}
    on:canplaythrough={onVideoEvent}
    on:stalled={onVideoEvent}
    on:error={onVideoEvent}
    on:waiting={onVideoEvent}
    on:suspend={onVideoEvent}
  >
  <!--source src="https://threejs.org/examples/textures/pano.webm">
  <source src="https://threejs.org/examples/textures/pano.mp4"-->
</video>

<style>
  video {
    width: 100%;
  }
</style>