<script>
  import { onMount, onDestroy } from 'svelte'
  import { getCurrentTime } from '../../util/timing.js'

  // usage <Playtime let:currentTime />
  export let currentTime = 0
  export let currentTimeFormatted = '00:00'

  export let asset
  export let state

  // start interval
  let interval = null

  onMount(() => {
    interval = setInterval(() => {
      currentTime = Math.ceil(getCurrentTime(state, asset)/1000)
    }, 500)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  $: {
    const minutes = Math.floor(currentTime / 60)
    const seconds = currentTime % 60
    currentTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

</script>

{#if $$slots.default}
  <slot {currentTime}></slot>
{:else}
  <span>
    {currentTimeFormatted}
  </span>
{/if}

<style>
  span {
    display: inline-block;
    min-width: 7ex;
    color: #af8;
    text-align: right;
    font-family: monospace;
  }
</style>