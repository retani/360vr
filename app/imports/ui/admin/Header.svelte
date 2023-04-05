<script>
  import { Meteor } from 'meteor/meteor';
  
  let status, connected;

  $m: status = Meteor.status().status;
  $m: connected = Meteor.status().connected;
</script>

<div class="container">
  <span title="Connection status: {status}">
    {#if connected}
      <strong>
        ✅
      </strong>
    {:else}
      <strong>
        ⚠️
      </strong>
    {/if}
  </span>
  <strong>
    360vr 
  </strong>
  <a href="/home">Home</a>
  <a href="/dashboard">Dashboard</a>
</div>

<style>
  .container {
    width: 100%;
    height: 2em;
    background-color: #222;
    border-bottom: 1px solid #555;
    padding: 5px;
  }
  strong {
    font-weight: bold;
  }
  a {
    margin-left: .5em;
  }
</style>