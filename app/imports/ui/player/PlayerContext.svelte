<script>
  // @ts-nocheck
  import {setContext} from 'svelte';
  import { writable } from 'svelte/store';

  import { Meteor } from "meteor/meteor";
  import { DDP } from 'meteor/ddp-client'
  import { Channels } from '../../api/collections';

  export let slug

  let channelReady = false;
  let channel = writable(null);
  let ddpStatus = writable('initializing')
  let connectionId = writable(null)

  //setContext('audioPaused', writable(true))
  setContext('audioVolume', writable(1))
  setContext('audioCurrentTime', writable(null))
  setContext('audioStatus', writable('disconnected'))

  setContext('channel', channel)
  setContext('ddpStatus',ddpStatus)
  setContext('connectionId', connectionId)

  const updateConnectionId = () => {
    const newId = Meteor.connection._lastSessionId
    if (newId != $connectionId) {
      connectionId.set(newId)
      Meteor.call('updateConnectionData', {connectionId: newId, slug})
    }
  }

  $m: {
    channelReady = Meteor.subscribe("channel", slug).ready();
    $channel = Channels.find({slug}).fetch()[0];
    updateConnectionId()
  }

  $m: {
    const status = Meteor.status()
    ddpStatus.set(status.status)
  }

  DDP.onReconnect(()=>{
    console.log('reconnected', Meteor.connection._lastSessionId)
    setTimeout(() => {
      updateConnectionId()
    }, 300)
  })

</script>

<slot />