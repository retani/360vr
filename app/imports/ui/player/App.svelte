<script>
  // @ts-nocheck
  import { getContext } from 'svelte';

  import PlayerStatus from './PlayerStatus.svelte';
  import Viewer from './Viewer.svelte';
  import Audiostream from './Audiostream.svelte';
  import TextLayer from '../../../TextLayer.svelte';
  import SceneLayer from './SceneLayer.svelte';

  export let slug;
  export let preview;

  const channel = getContext('channel');
  const currentSettings = getContext('currentSettings');
  
  $: textLayer = $channel && $channel.layers && $channel.layers.find(layer => layer?.asset.type == 'text');
  $: videoLayer = $channel && $channel.layers && $channel.layers.find(layer => layer?.asset.type == 'video');
  $: janusLayers = $channel && $channel.layers && $channel.layers.filter(layer => layer?.asset.type == 'janusaudio') || [];
  $: sceneLayers = $channel && $channel.layers && $channel.layers.filter(layer => layer?.asset.type == 'scene') || [];
</script>

{#if !preview && $currentSettings && $currentSettings?.debugScreen}
  <div class="PlayerStatus">
    <PlayerStatus {slug} />
  </div>
{/if}

{#if textLayer}
  <TextLayer asset={textLayer.asset} state={textLayer.state} />
{/if}

{#if videoLayer}
  <Viewer asset={videoLayer.asset} state={videoLayer.state} />
{/if}

{#if sceneLayers.length > 0}
  {#each sceneLayers as sceneLayer}
    <SceneLayer asset={sceneLayer.asset} state={sceneLayer.state} />
  {/each}
{/if}

{#if !preview}
  {#each janusLayers as janusLayer}
    <Audiostream asset={janusLayer.asset} state={janusLayer.state}/>
  {/each}
{:else}
  {#if janusLayers.length > 0}
    <div class="microphone-indicator">
      🎤
    </div>
  {/if}
{/if}

<style>
  .PlayerStatus {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }

  .microphone-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    padding: 0.5em;
  }
</style>