<script>
  export let asset;
</script>

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
    {#if asset.hasMicrophone}
      <span title="uses microphone">
        🎤
      </span>
    {/if}
    {#if asset.hasVideo}
      <span title="has video">
        🎞️
      </span>
    {/if}
    {#if asset.hasAudio}
      <span title="has audio">
        🔈
      </span>
    {/if}
    {#if asset.hasImage}
      <span title="has image">
        🖼️
      </span>
    {/if}
  </span>

  <span class="name">
    <!--a href="{asset.url}" title={asset.url} target="_blank" rel="noreferrer"-->
      {asset.name}
    <!--/a-->
  </span>
</div>

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
</style>