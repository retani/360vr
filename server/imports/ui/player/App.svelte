<script>
  // @ts-nocheck
  import { getContext } from 'svelte';

  import PlayerStatus from './PlayerStatus.svelte';
  import Viewer from './Viewer.svelte';
  import Audiostream from './Audiostream.svelte';

  export let slug;

  const channel = getContext('channel');

  $: videoLayer = $channel && $channel.layers && $channel.layers.find(layer => layer?.asset.type == 'video');
  $: janusLayers = $channel && $channel.layers && $channel.layers.filter(layer => layer?.asset.type == 'janusaudio') || [];
</script>

<div class="PlayerStatus">
  <PlayerStatus {slug} />
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