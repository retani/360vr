<script>
  import { Meteor } from 'meteor/meteor';
  import { Link } from 'svelte-navigator';
  
  export let activeRoute;

  let status, connected;

  $m: status = Meteor.status().status;
  $m: connected = Meteor.status().connected;

  const tabs = [
    {to: "/admin", route: 'root', label: 'Launcher'},
    {to: "/admin/channels", route: 'channels', label: 'Channels'},
    {to: "/admin/assets", route: 'assets', label: 'Assets'},
    {to: "/admin/files", route: 'files', label: 'Media'},
    {to: "/admin/viewers", route: 'viewers', label: 'Connections'},
    {to: "/admin/settings", route: 'settings', label: 'Settings'}
  ]
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
    {#each tabs as tab}
      <span class="link" class:active={activeRoute === tab.route} title={tab.label}>
        <Link to={tab.to}>
          {tab.label}
        </Link>
      </span>
    {/each}
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
  .link {
    margin-left: .5em;
    padding: 2px 2px 0 4px;
    border-radius: 2px 2px 0 0;
  }
  .link.active {
    border-bottom: 1px solid currentColor;
    background-color: #555;
  }
  .link:not(.active):hover {
    border-bottom: 1px dotted currentColor;
  }
</style>