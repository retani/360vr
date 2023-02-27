<script>
  import { Meteor } from "meteor/meteor";

  export let asset
  export let channel
  export let assets
  export let channels

  let loadedAsset = null
  let state = null

  // copy asset to channel to prevent reactive updates during play
  $: {
    const layer = channel.layers && channel.layers.find(a => a._id === asset._id)
    loadedAsset = layer?.asset
    state = layer?.state
  }

  const onClickPlay = () => Meteor.call("startPlay", { assetId: asset._id, channelId: channel._id })
  const onClickPause = () => Meteor.call("pausePlay", { assetId: asset._id, channelId: channel._id })
  const onClickStop = () => Meteor.call("stopPlay", { assetId: asset._id, channelId: channel._id })
  const onClickLoad = () => Meteor.call("loadAssetToChannel", { assetId: asset._id, channelId: channel._id })
  
</script>

<div class="container" class:playing={state?.playing} class:loaded={loadedAsset}>
  {#if !loadedAsset}
    <div class="button">
      <button on:click={onClickLoad}>
        Load
      </button>
    </div>
  {/if}

  {#if loadedAsset && !state.playing}
    <button class="icon" on:click={onClickStop}>
      ⏹️
    </button>
  {/if}

  {#if loadedAsset && !state.playing }
    <button class="icon" on:click={onClickPlay}>
      ▶️
    </button>
  {/if}
  
  {#if loadedAsset && state.playing}
    <button class="icon" on:click={onClickPause}>
      ⏸️
    </button>
  {/if}

</div>

<style>
  .container {
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  .container.loaded {
    background: radial-gradient(circle, #888 0%, transparent 65%);
  }

  .button button {
    border: revert;
    padding: 0.2em;
  }

  button {
    margin: 2px;
  }

  .icon {
    transform: scale(1.25);
  }

  .playing {
    /* yellow radial gradient */
    position: relative;
  }

  /* background gradient animation */
  .playing::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #ff0 0%, #ff0 10%, transparent 85%);
    animation: pulse 1s infinite;
    animation-direction: alternate;
    z-index: -1;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
</style>