<script>
  // @ts-nocheck
  import PlayerContext from './player/PlayerContext.svelte';
  import App from './player/App.svelte';

  export let slug;
  export let preview;

</script>

<svelte:head>
  {#if preview}
    <title>360vr player for {slug} (preview)</title>
  {:else}
    <title>360vr player for {slug}</title>
  {/if}
  
</svelte:head>

<PlayerContext {slug} {preview} >
  <App {slug} {preview} />
</PlayerContext>
