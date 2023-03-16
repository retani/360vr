<script>
  // @ts-nocheck

  import { onMount, onDestroy } from 'svelte';
  import { getContext } from 'svelte';
  import * as Janus from 'janus-gateway-js';

  export let asset
  export let state

  let audioElem = null

  $: paused =  state ? state.playing != "playing" : true

  const audioVolume      = getContext('audioVolume');
  const audioCurrentTime = getContext('audioCurrentTime');
  const audioStatus      = getContext('audioStatus');

  //const janusServer = 'ws://localhost:8188'
  //const janusServer = 'ws://360vr.intergestalt.cloud:8188'
  const janusServer = asset.url
  const room = asset.room
  let janus = null

  onMount(async () => {
    try {
      $audioStatus = 'connecting'
      janus = new Janus.Client(janusServer, { keepalive: true, apisecret: asset.apisecret });
      const connection = await janus.createConnection();
      $audioStatus = 'connected'
      const session = await connection.createSession();
      const plugin = await session.attachPlugin('janus.plugin.audiobridge');
      plugin.on('message', (message) => { console.log("msg: ", message); }); // For debugging
      plugin.on('pc:track:remote', (message) => { 
        /* handle incoming audio, stream is in message.streams[0] */ 
        console.log("msg: ", message);
        if (message.streams && message.streams[0]) {
          console.log(audioElem);
          audioElem.srcObject = new MediaStream(message.streams[0]);
          $audioStatus = "stream attached"
          if (!paused) audioElem.play();
          //Janus.attachMediaStream(audioElem, message.streams[0]);
        }
      });
      const resp = await plugin.join(room, { display: "Name", quality: 3, token: 'token' });
      const stream = await plugin.getUserMedia({ audio: true, video: false });
      const response = await plugin.offerStream(stream);
    } catch (err) {
      console.error(err);
      $audioStatus = 'error'    
    }                                   
  });

  onDestroy(() => {
    if (janus && janus.destroy) {
      console.log("destroying janus"); // currently inactive
      janus.destroy();
    }
  });
</script>

<audio 
  bind:this={audioElem} 
  bind:paused={paused}
  bind:volume={$audioVolume}
  bind:currentTime={$audioCurrentTime}
/>