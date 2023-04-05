<script>
  // @ts-nocheck

  import { onMount, onDestroy } from 'svelte';
  import { getContext } from 'svelte';
  import * as Janus from 'janus-gateway-js';

  export let asset
  export let state

  let audioElem = null

  $: paused =  state ? state.transport != "playing" : true

  const audioVolume      = getContext('audioVolume');
  const audioStatus      = getContext('audioStatus');
  const connectionId     = getContext('connectionId');

  //const janusServer = 'ws://localhost:8188'
  //const janusServer = 'ws://360vr.intergestalt.cloud:8188'
  const janusServer = asset.url
  const room = asset.room
  let janus, stream, resp, response, session, connection = null

  onMount(async () => {
    try {
      $audioStatus = 'connecting'
      janus = new Janus.Client(janusServer, { keepalive: true, apisecret: asset.apisecret });
      connection = await janus.createConnection();
      $audioStatus = 'connected'
      session = await connection.createSession();
      const plugin = await session.attachPlugin('janus.plugin.audiobridge');
      plugin.on('message', (message) => { console.log("msg: ", message); }); // For debugging
      plugin.on('pc:track:remote', (message) => { 
        /* handle incoming audio, stream is in message.streams[0] */ 
        console.log("msg: ", message);
        if (message.streams && message.streams[0]) {
          console.log(audioElem);
          audioElem.srcObject = new MediaStream(message.streams[0]);
          $audioStatus = "stream attached"
          resync()
          //Janus.attachMediaStream(audioElem, message.streams[0]);
        }
      });
      resp = await plugin.join(room, { display: $connectionId, /*quality: 3, token: 'token'*/ });
      stream = await plugin.getUserMedia({ audio: true, video: false });
      response = await plugin.offerStream(stream);
    } catch (err) {
      console.error(err);
      $audioStatus = 'error'    
    }                                   
  });

  onDestroy( async () => {
    console.log("destroying audiostream layer", janus, stream, resp, response);
    if (session) {
      console.log("destroying session janus"); // currently inactive
      await session.destroy();
    }
    if (connection) {
      console.log("closing connection janus");
      connection.close();
    }
  });

  const onAudioEvent = (event) => {
    console.log("audio resyncing because: ", event.type)
    resync()
  }
  

  const resync = () => {
    if (state.transport == "paused") {
      if (audioElem && !audioElem.paused) audioElem.pause()
    } else if (state.transport == "playing") {
      if (audioElem && audioElem.paused) audioElem.play()
    }
  }

</script>

<audio 
  bind:this={audioElem} 
  bind:paused={paused}
  bind:volume={$audioVolume}
  on:loadedmetadata={onAudioEvent}
  on:loadstart={onAudioEvent}
  on:ended={onAudioEvent}
  on:canplay={onAudioEvent}
  on:canplaythrough={onAudioEvent}
  on:stalled={onAudioEvent}
  on:error={onAudioEvent}
  on:waiting={onAudioEvent}
  on:suspend={onAudioEvent}  
/>