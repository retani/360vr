<script>
  import { Meteor } from "meteor/meteor";
  import { getContext } from 'svelte';

  const audioPaused      = getContext('audioPaused');
  const audioVolume      = getContext('audioVolume');
  const audioCurrentTime = getContext('audioCurrentTime');
  const audioStatus      = getContext('audioStatus');

  const channel          = getContext('channel');
  const ddpStatus        = getContext('ddpStatus');
  const connectionId     = getContext('connectionId');
  const browserEvents    = getContext('browserEvents');

  $: console.log('PlayerStatus', $ddpStatus, $channel);

  const endpoint = Meteor.absoluteUrl();
  export let slug = "";
</script>

{#if $ddpStatus}
  <ul>
    <li>
      server: {endpoint}
    </li>
    <li>
      slug: {slug}
    </li>
    <li>
      status: {$ddpStatus} 
    </li>
    <li>
      connectionId: {$connectionId}
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

{#if $channel && $channel._id}
  <ul>
    <li>
      channel: {$channel.name} ({$channel.slug})
    </li>
    <ol>
    {#each $channel.layers as layer}
      <li>
        asset: {layer.asset.name} ({layer.asset.url}) – {layer.state.transport}
      </li>
    {/each}
    </ol>
  </ul>
{:else}
  <ul>
    <li>
      channel: none
    </li>
  </ul>
{/if}

<ul class="events">
  {#each $browserEvents as event}
    <li>
      event: {event}
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 1ex;
  }
  .events {
    max-height: 5em;
  }
</style>