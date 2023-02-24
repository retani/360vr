<script>
  import { Meteor } from "meteor/meteor";
  import { Channels, Assets } from '/imports/api/collections';
  import Loading from '../Loading.svelte';
  import Table from './Table.svelte';
  
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
  
  $: allReady = channelsReady && assetsReady;

</script>

<div>
  <a href="/">Home</a>
</div>

<br>

<Loading loading={allReady}>
  <Table {channels} {assets} />
</Loading>
