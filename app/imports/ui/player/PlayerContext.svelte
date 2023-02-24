<script>
  // @ts-nocheck
  import {setContext} from 'svelte';
  import { writable } from 'svelte/store';

  import { Meteor } from "meteor/meteor";
  import { Channels } from '../../api/collections';

  export let slug

  let channelReady = false;
  let channel = writable(null);
  let ddpStatus = writable('initializing')

  //setContext('audioPaused', writable(true))
  setContext('audioVolume', writable(1))
  setContext('audioCurrentTime', writable(null))
  setContext('audioStatus', writable('disconnected'))

  setContext('channel', channel)
  setContext('ddpStatus',ddpStatus)

  $m: {
    channelReady = Meteor.subscribe("channel", slug).ready();
    $channel = Channels.find({slug}).fetch()[0];
  }

  $: channelReady && ddpStatus.set('ready')

</script>

<slot />