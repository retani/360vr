<script>
  import { getContext } from 'svelte';

  const audioPaused      = getContext('audioPaused');
  const audioVolume      = getContext('audioVolume');
  const audioCurrentTime = getContext('audioCurrentTime');
  const audioStatus      = getContext('audioStatus');

  const channel          = getContext('channel');
  const ddpStatus        = getContext('ddpStatus');

  export let endpoint = "";
  export let slug = "";
</script>

{#if $ddpStatus}
  <ul>
    <li>
      endpoint: {endpoint}
    </li>
    <li>
      slug: {slug}
    </li>
    <li>
      status: {$ddpStatus} 
    </li>
  </ul>
{/if}

<ul>
  <li>
    audio status: {$audioStatus}
  </li>
  <li>
    audio transport: {$audioPaused ? 'paused' : 'playing'}
  </li>
  <li>
    audio volume: {$audioVolume}
  </li>
  <li>
    audio time: {Math.round($audioCurrentTime)}s
  </li>
</ul>

{#if $channel && $channel.id}
  <ul>
    <li>
      channel: {$channel.name} ({$channel.slug})
    </li>
    <ol>
    {#each $channel.layers as layer}
      <li>
        asset: {layer.asset.name} ({layer.asset.url}) – {layer.state.playing ? 'playing' : 'paused'}
      </li>
    {/each}
    </ol>
  </ul>
{:else if $ddpStatus == 'ready'}
  <ul>
    <li>
      no channel found - please check your URL
    </li>
  </ul>
{/if}

<style>
  ul {
    padding: 1ex;
  }
</style>