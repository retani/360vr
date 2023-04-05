<script>
  import { Meteor } from "meteor/meteor";
  import { getContext } from 'svelte';
  import { microphonePermission, promptMicrophonePermission } from './permissionsStore.js';

  const audioVolume      = getContext('audioVolume');
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
    microphone permission: {$microphonePermission}
    {#if $microphonePermission != 'granted'}
      <button style="all:revert" on:click={promptMicrophonePermission}>prompt</button>
    {/if}
  </li>
</ul>

<ul>
  <li>
    audio status: {$audioStatus}
  </li>
  <li>
    audio volume: {$audioVolume}
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