<script>
  import {setContext} from 'svelte';
  import { writable } from 'svelte/store';
  
  setContext('audioPaused', writable(true))
  setContext('audioVolume', writable(1))
  setContext('audioCurrentTime', writable(null))
  setContext('audioStatus', writable('disconnected'))

</script>

<slot />