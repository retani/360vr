<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import {getContext} from 'svelte';
  import simpleDDP from 'simpleddp';
  import ws from 'isomorphic-ws';

  const channel = getContext('channel');
  const ddpStatus = getContext('ddpStatus');

  export let slug
  export let endpoint

  onMount(async () => {
    const server = new simpleDDP({
      endpoint,
      SocketConstructor: ws,
    });

      server.on('connected', () => {
      console.log('ddp: connected');
      $ddpStatus = 'connected';
    });

    server.on('disconnected', () => {
      console.log('ddp: disconnected');
      $ddpStatus = 'disconnected';
    });

    server.on('error', (e) => {
      console.log('ddp: error', e);
      $ddpStatus = 'error';
    });

    await server.connect();

    console.log(`ddp: subscribing channel {slug}`)
    $ddpStatus = 'subscribing';

    let channelSub = server.subscribe("channel", slug);
    await channelSub.ready();

    console.log("ddp: channel subscription ready")
    $ddpStatus = 'ready';

    let userReactiveCursor = server.collection('channels')./*filter(c=>c.slug==slug).*/reactive().one();
    $channel = userReactiveCursor.data();

    userReactiveCursor.onChange((newData)=>{
      console.log('new data', newData);
      $channel = newData;
    });

  });
  
</script>

<slot />