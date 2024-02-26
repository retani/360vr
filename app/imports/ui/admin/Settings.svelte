<script>
  export let settings

  $: currentSettings = settings[0] || {} 

  function toggleDebugScreen() {
    Meteor.call('updateSettings', currentSettings._id, {debugScreen: !currentSettings.debugScreen})
  }

</script>

<dl class="container">
  <dt>
    Show debug screen
  </dt>
  <dd on:click={toggleDebugScreen}>
    {#if (currentSettings.debugScreen)}
      shown
    {:else}
      hidden
    {/if}
  </dd>
</dl>

<style>
  .container {
    padding: 1em;
  }
  dt {
    display: inline-block;
    width: 200px;
  }
  dd {
    display: inline-block;
    background-color: #333;
    user-select: none;
    padding: 0 .5em;
  }
  dd:hover {
    background-color: #555;
    cursor: pointer;
  }
</style>