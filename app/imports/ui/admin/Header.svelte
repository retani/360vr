<script>
  import { Meteor } from 'meteor/meteor';
  import { Link } from 'svelte-navigator';
  
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
  <Link to="/">
    <strong>
      360vr 
    </strong>
  </Link>
  <span class="links">
    <Link to="/admin">Launcher</Link>
    <Link to="/admin/viewers">Connections</Link>
    <Link to="/admin/files">Files</Link>
  </span>
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
  .links > :global(*) {
    margin-left: .5em;
  }
</style>