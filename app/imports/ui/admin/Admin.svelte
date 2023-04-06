<script context="module">
  let UserStatusCollection = null
  try {
    UserStatusCollection = new Mongo.Collection('user_status_sessions');
  } catch (e) {
    //console.log(e);
  }
</script>

<script>
  import { Meteor } from "meteor/meteor";
  import { Channels, Assets } from '/imports/api/collections';
  import Loading from '../Loading.svelte';
  import Workspace from './Workspace.svelte';
  import ConnectionStatusUpdater from '../common/ConnectionStatusUpdater.svelte';
  
  let channelsReady = false;
  let assetsReady = false;
  let userStatusReady = false;
  let channels = [];
  let assets = [];
  let userStatus = [];

  $m: {
    channelsReady = Meteor.subscribe("channels.all").ready();
    assetsReady = Meteor.subscribe("assets.all").ready();
    userStatusReady = Meteor.subscribe("userStatus.all").ready();

    channels = Channels.find().fetch();
    assets = Assets.find().fetch();
    userStatus = UserStatusCollection && UserStatusCollection.find().fetch() || [];
  }
  
  $: allReady = channelsReady && assetsReady && userStatusReady;

</script>

<ConnectionStatusUpdater slug="admin"/>

<Loading loading={allReady}>
  <Workspace {channels} {assets} {userStatus}/>
</Loading>
