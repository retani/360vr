<script>
  // @ts-nocheck
  import { onMount, setContext} from 'svelte';
  import { writable } from 'svelte/store';

  import { Meteor } from "meteor/meteor";
  import { DDP } from 'meteor/ddp-client'
  import { Channels, Settings } from '../../api/collections';

  export let slug
  export let preview

  let channelReady = false;
  let channel = writable(null);
  let currentSettings = writable(null);
  let ddpStatus = writable('initializing')
  let connectionId = writable(null)
  let browserEvents = writable([])

  setContext('audioVolume', writable(1))
  setContext('audioStatus', writable('disconnected'))

  setContext('channel', channel)
  setContext('currentSettings', currentSettings)
  setContext('ddpStatus',ddpStatus)
  setContext('connectionId', connectionId)
  setContext('browserEvents', browserEvents)

  const logBrowserEvent = (data) => {
    browserEvents.set([...$browserEvents, data])
    if (!$channel) return
    Meteor.call('logBrowserEvent', {
      data, 
      channelId: $channel._id, 
      connectionId: $connectionId})
  }

  const updateConnectionId = () => {
    const newId = Meteor.connection._lastSessionId
    if (newId != $connectionId) {
      connectionId.set(newId)
      Meteor.call('updateConnectionData', {
        connectionId: newId, 
        slug,
        preview,
      })
    }
  }

  $m: {
    channelReady = Meteor.subscribe("channel", slug).ready();
    $channel = Channels.find({slug}).fetch()[0];
    updateConnectionId()
  }

  $m: {
    Meteor.subscribe("settings.current");
    $currentSettings = Settings.find().fetch()?.[0];
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

  onMount(() => {
    document.addEventListener('visibilitychange', function (event) {
        if (document.hidden) {
          logBrowserEvent('visibility_hidden')
        } else {
          logBrowserEvent('visibility_visible')
        }
    });
    window.addEventListener('focus', function (event) {
        logBrowserEvent('window_focus')
    });

    window.addEventListener('blur', function (event) {
        logBrowserEvent('window_blur')
    });
  })

</script>

<slot />