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
  import { Channels, Assets, Settings } from '/imports/api/collections';
  import { MediaFiles } from '/imports/api/collections/clientCollections';
  
  import Loading from '../Loading.svelte';
  import Workspace from './Workspace.svelte';
  import ConnectionStatusUpdater from '../common/ConnectionStatusUpdater.svelte';
  
  let channelsReady = false;
  let assetsReady = false;
  let userStatusReady = false;
  let mediaFilesReady = false;
  let settingsReady = false;

  let channels = [];
  let assets = [];
  let userStatus = [];
  let mediafiles = [];
  let settings = [];

  $m: {
    channelsReady = Meteor.subscribe("channels.all").ready();
    assetsReady = Meteor.subscribe("assets.all").ready();
    userStatusReady = Meteor.subscribe("userStatus.all").ready();
    mediaFilesReady = Meteor.subscribe("mediafiles.all").ready();
    settingsReady = Meteor.subscribe("settings.current").ready();

    channels = Channels.find().fetch();
    assets = Assets.find().fetch();
    mediafiles = MediaFiles.find().fetch()
    userStatus = UserStatusCollection && UserStatusCollection.find().fetch() || [];
    settings = Settings.find().fetch();
  }
  
  $: allReady = channelsReady && assetsReady && userStatusReady && mediaFilesReady && settingsReady;

</script>

<ConnectionStatusUpdater slug="admin"/>

<Loading loading={allReady}>
  <Workspace {channels} {assets} {userStatus} {mediafiles} {settings}/>
</Loading>
