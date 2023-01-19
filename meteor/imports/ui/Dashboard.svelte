<script>
  import { Meteor } from "meteor/meteor";
  import { Channels, Assets } from '../api/collections';
  import Loading from './Loading.svelte';
  
  let channelsReady = false;
  let assetsReady = false;
  let channels = [];
  let assets = [];

  $m: {
    channelsReady = Meteor.subscribe("channels.all").ready();
    assetsReady = Meteor.subscribe("assets.all").ready();

    channels = Channels.find().fetch();
    assets = Assets.find().fetch();
  }
  // more information about $m at https://atmospherejs.com/zodern/melte#tracker-statements
</script>


<div class="container">
  <section class="section">
    <a href="/admin">Admin</a>
  </section>

  <section class="section">  

    <h2 class="header">
      Channels
    </h2>

    <Loading loading={channelsReady}>
      <ul class="list">
        {#each channels as channel}
          <li>
            <a href="/c/{channel.slug}">
              {channel.name}
            </a>
          </li>
        {/each}
      </ul>
    </Loading>

  </section>

  <section class="section">  

    <h2 class="header">
      Assets
    </h2>

    <Loading loading={assetsReady}>
      <ul class="list">
        {#each assets as asset}
          <li>
            <a href="{asset.url}">
              {asset.name}
            </a>
          </li>
        {/each}
      </ul>
    </Loading>

  </section>

</div>

<style>
  .header {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .section {
    padding: 1em;
    margin: 1em;
    border: 1px solid #ccc;
    float: left;
  }
</style>