<script>
  import { Meteor } from "meteor/meteor";
  import { Events } from '/imports/api/collections';
  import Time from "svelte-time";

  export let channels
  
  let subReady = false;
  let events = [];

  $m: {
    subReady = Meteor.subscribe("events.recent", {limit: 50}).ready();
    events = Events.find().fetch().sort((a,b) => b.createdAt - a.createdAt);
  }

  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
  
</script>


{#if subReady}
  <ul class="container">
    {#each events as event}
    {@const channelSlug = channels.find(c => c._id == event.channelId).slug}
      <li class="event">
        <div class="time">
          <Time timestamp={event.createdAt} format="H:mm:ss" />
        </div>
        <div class="type">{event.type}</div>
        <div class="channel">{channelSlug}</div>
        <div class="data">{event.data}</div>
      </li>
    {/each}
  </ul>
{:else}
  Loading...
{/if}

<style>
  .event {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    grid-template-rows: 1fr;
    grid-gap: 0px 0px;
    grid-template-areas: "time type channel data";
    padding: 0.25rem;
    border-bottom: 1px solid #555;
    font-size: 0.8rem;
  }
</style>