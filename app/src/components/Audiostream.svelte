<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import * as Janus from 'janus-gateway-js';

  let audioElem = null

  onMount(async () => {
 
    const janus = new Janus.Client('ws://localhost:8188', { keepalive: true, apisecret: 'secret' });
    const connection = await janus.createConnection();
    const session = await connection.createSession();
    const plugin = await session.attachPlugin('janus.plugin.audiobridge');
    plugin.on('message', (message) => { console.log("msg: ", message); }); // For debugging
    plugin.on('pc:track:remote', (message) => { 
      /* handle incoming audio, stream is in message.streams[0] */ 
      console.log("msg: ", message);
      if (message.streams && message.streams[0]) {
        console.log(audioElem);
        audioElem.srcObject = new MediaStream(message.streams[0]);
        //Janus.attachMediaStream(audioElem, message.streams[0]);
      }
    });
    const resp = await plugin.join(1234, { display: "Name", quality: 3, token: 'token' });
    const stream = await plugin.getUserMedia({ audio: true, video: false });
    const response = await plugin.offerStream(stream);
  });
</script>

<audio bind:this={audioElem} class="rounded centered" id="roomaudio" width="100%" height="100%" autoplay/>