<script>
  import { Route, Link, location } from 'svelte-navigator';

  export let asset;
</script>

<Link to="/admin/assets/{asset._id}">

<div class="container">
  <span class="type" title={asset.type}>
    {#if asset.type == "video"}
      V
    {:else if asset.type == "janusaudio"}
      C
    {:else if asset.type == "image"}
      I
    {:else if asset.type == "text"}
      T
    {:else if asset.type == "scene"}
      S
    {/if}
  </span>

  <span class="modalities">
    {#if asset.hasImage || asset.hasVideo}
      <span title="has image">
        👁️
      </span>
    {/if}
    {#if asset.hasAudio}
      <span title="has audio">
        👂
      </span>
    {/if}
    {#if asset.hasMicrophone}
      <span title="uses microphone">
        👄
      </span>
    {/if}
    {#if asset.hasTime}
      <span class="time" title="is time based media">
        ⏱️
      </span>
    {/if}
  </span>

  <span class="name">
    {asset.name}
  </span>

</div>
</Link>
<style>
  .container {
    display: flex;
  }
  .modalities {
    min-width: 50px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 0.8em;
    border-right: 1px solid #555;
    position: relative;
  }
  .type {
    min-width: 20px;
    text-align: left;
    border-right: 1px solid #555;
    font-weight: bold;
  }
  .name {
    flex: 1;
    text-align: left;
    padding-left: 5px;
    white-space: nowrap;
  }
  .time {
    position: absolute;
    left:1.1em;
    bottom:-0.25em;
  }
</style>