<script>
  export let asset;
  export let state;
</script>

{#if state?.playing}
  <div class="playing">
    <div class="text">
      {asset.text}
    </div>
  </div>
{/if}

<style>
  .playing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 5vw;
    font-weight: bold;
    text-align: center;
    padding: 1em;
  }
</style>