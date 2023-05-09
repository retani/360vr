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
  import { MediaFiles } from '/imports/api/collections/clientCollections';
  
  import Loading from '../Loading.svelte';
  import Workspace from './Workspace.svelte';
  import ConnectionStatusUpdater from '../common/ConnectionStatusUpdater.svelte';
  
  let channelsReady = false;
  let assetsReady = false;
  let userStatusReady = false;
  let mediaFilesReady = false;

  let channels = [];
  let assets = [];
  let userStatus = [];
  let mediafiles = [];

  $m: {
    channelsReady = Meteor.subscribe("channels.all").ready();
    assetsReady = Meteor.subscribe("assets.all").ready();
    userStatusReady = Meteor.subscribe("userStatus.all").ready();
    mediaFilesReady = Meteor.subscribe("mediafiles.all").ready();

    channels = Channels.find().fetch();
    assets = Assets.find().fetch();
    mediafiles = MediaFiles.find().fetch()
    userStatus = UserStatusCollection && UserStatusCollection.find().fetch() || [];
  }
  
  $: allReady = channelsReady && assetsReady && userStatusReady && mediaFilesReady;

</script>

<ConnectionStatusUpdater slug="admin"/>

<Loading loading={allReady}>
  <Workspace {channels} {assets} {userStatus} {mediafiles}/>
</Loading>
