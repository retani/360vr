<script>
  import { Meteor } from "meteor/meteor";
  import { Channels } from '../../api/collections';
  import Loading from '../Loading.svelte';
  import ConnectionStatusUpdater from '../common/ConnectionStatusUpdater.svelte';
  
  let channelsReady = false;
  let channels = [];


  $m: {
    channelsReady = Meteor.subscribe("channels.list").ready();
    channels = Channels.find().fetch();
  }

  // more information about $m at https://atmospherejs.com/zodern/melte#tracker-statements
</script>

<ConnectionStatusUpdater slug="home"/>

<div class="container">
  <main>

    <p>
      Choose your channel
    </p>
    
      <Loading loading={channelsReady}>
        <ul class="list">
          {#each channels as channel}
            <li class="item">
              <a class="link" href="/c/{channel.slug}">
                {channel.name}
              </a>
            </li>
          {/each}
        </ul>
      </Loading>

  </main>
  <aside>
    <p>
      <a href="/admin">Admin</a>
    </p>
  </aside>

</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  p {
    text-align: center;
  }

  main {
    flex: 1;
    font-size: 4vmin;
    padding: 1vmin;
  }

  aside {
    padding: 1em;
  }

  .list {
    clear: both;
    margin: 1em 0 0 0 ;
  }
  .item {
    display: block;
    float: left;
    margin: 1vmin;
  }

  .link {
    background-color: #555;
    padding: 2vmin;
    border-radius: 1vmin;
  }

  .link:hover {
    background-color: #777;
  }
</style>