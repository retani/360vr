<script>
  // @ts-nocheck
  import { getContext } from 'svelte';

  import PlayerStatus from '/src/components/PlayerStatus.svelte';
  import Connection from '/src/components/Connection.svelte';
  import Viewer from '/src/components/Viewer.svelte';
  import Audiostream from '/src/components/Audiostream.svelte';

  export let slug;
  export let endpoint;

  const channel = getContext('channel');

  $: videoLayer = $channel && $channel.layers && $channel.layers.find(layer => layer?.asset.type == 'video');
  $: janusLayers = $channel && $channel.layers && $channel.layers.filter(layer => layer?.asset.type == 'janusaudio') || [];
</script>

<Connection {slug} {endpoint}/>
<div class="PlayerStatus">
  <PlayerStatus {slug} {endpoint} />
</div>
{#if videoLayer}
  <Viewer asset={videoLayer.asset} state={videoLayer.state} />
{/if}
{#each janusLayers as janusLayer}
  <Audiostream asset={janusLayer.asset} state={janusLayer.state}/>
{/each}

<style>
  .PlayerStatus {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
</style>