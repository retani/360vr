<script>
  import Time from "svelte-time";
  import DeviceDetector from "device-detector-js";
  import NiceConnectionId from '../common/NiceConnectionId.svelte';

  export let userStatus
  
  const deviceDetector = new DeviceDetector();

  let subReady = false;
  
  $: viewers = userStatus.filter(p => !p.preview && p.channelSlug).sort((a,b)=>(a.channelSlug == b.channelSlug ?1:-1)) || []

  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
  
</script>


{#if userStatus && userStatus.length > 0}

  <ul class="container">
    {#each viewers as viewer}
    {@const device = deviceDetector.parse(viewer.userAgent)}
      <li class="viewer">
        <span class="id" title={JSON.stringify(viewer)}>
          <NiceConnectionId connectionId={viewer._id}/>
        </span>
        <span class="ip">
          {viewer.ipAddr}
        </span>
        <span class="channel">
          {viewer.channelSlug || "-"}
        </span>
        <span class="updateCounter">
          {viewer.updateCounter || "-"}
        </span>
        <span class="agent" title={JSON.stringify(device)}>
          {device?.client?.name} {device?.client?.version} {device?.os?.name}
        </span>
      </li>
    {/each}
    </ul>
{:else}
  none
{/if}

<style>
  .viewer {
    display: grid;
    grid-template-columns: 4.2em 8em 1fr 1em 2fr;
    grid-template-rows: 1fr;
    grid-gap: 0px 10px;
    grid-template-areas: "id ip channel updateCounter agent";
    padding: 0.25rem;
    border-bottom: 1px solid #555;
    font-size: 0.8rem;
  }
  .id {
    grid-area: id;
  }
  .agent {
    grid-area: agent;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ip {
    grid-area: ip;
    font-family: monospace;
  }
  .channel {
    grid-area: channel;
  }
  .updateCounter {
    grid-area: updateCounter;
  }
</style>