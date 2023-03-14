<script>
  import { Meteor } from 'meteor/meteor'
  
  export let channel
  export let userStatus

  $: players = userStatus.filter(p => p.channelSlug == channel.slug) || []

  const url = Meteor.absoluteUrl() + "c/" + channel.slug
</script>

<div class="container">
  <h2>
    {channel.name}
  </h2>
  <a href={url} title={channel.slug} target="_blank" rel="noreferrer">
    <iframe src={"/c/" + channel.slug + "?preview"} title={url} />
  </a>
  <br/>
  <span class="viewers" class:active={players.length > 0}> 
    {players.length} viewers
  </span>
</div>

<style>
  .container {
    text-align: center;
    width: min-content;
    min-width: 100px;
  }
  .active {
    color: #080;
  }
  small {
    font-size: 0.8em;
  }
  h2 {
    margin-bottom: 1em;
  }
  a{
    text-decoration: none;
    border: none;
  }
  iframe {
    width: 160px;
    height: 90px;
    overflow: hidden;
    border: solid 1px #444;
  }
</style>