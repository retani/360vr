<script>
  import { Meteor } from "meteor/meteor";
  import { Events } from '/imports/api/collections';
  import Time from "svelte-time";

  export let channels
  export let userStatus
  
  let subReady = false;
  
  $: viewers = userStatus.filter(p => !p.preview).sort((a,b)=>(a.channelSlug == b.channelSlug ?1:-1)) || []

  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
  
</script>


{#if userStatus && userStatus.length > 0}

  <ul class="container">
    {#each viewers as viewer}
      <li class="viewer">
        <span class="id" title={JSON.stringify(viewer)}>
          {viewer._id}
        </span>
        <span class="ip">
          {viewer.ipAddr}
        </span>
        <span class="channel">
          {viewer.channelSlug}
        </span>
        <span class="agent" title={viewer.userAgent}>
          {viewer.userAgent}
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0px 10px;
    grid-template-areas: "id ip channel agent";
    padding: 0.25rem;
    border-bottom: 1px solid #555;
    font-size: 0.8rem;
  }
  .id {
    grid-area: id;
    max-width: 5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .agent {
    grid-area: agent;
    max-width: 5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ip {
    grid-area: ip;
  }
  .channel {
    grid-area: channel;
  }
</style>