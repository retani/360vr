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
    <small>
      {url}
    </small>
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
  a {
    word-break: break-all;
    display: block;
    border: 1px solid #555;
    border-radius: 5px;
    background-color: #444;
  }
</style>