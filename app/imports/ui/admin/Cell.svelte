<script>
  import { Meteor } from "meteor/meteor";
  import Button from "./Button.svelte";
  import Playtime from "../common/Playtime.svelte";
  import { selectedAssetsChannels } from "./stores.js";

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

  $: selectedItem = $selectedAssetsChannels.find(a => a.assetId === asset._id && a.channelId === channel._id)

  const toggleSelected = () => {
    if (!!selectedItem) {
      $selectedAssetsChannels = [
        ...$selectedAssetsChannels.filter(a => a.assetId !== asset._id || a.channelId !== channel._id)
      ]
    } else {
      $selectedAssetsChannels = [
        ...$selectedAssetsChannels,
        { assetId: asset._id, channelId: channel._id }
      ]
    }
  }
    

  const onClickPlay = () => Meteor.call("startPlay", { assetId: asset._id, channelId: channel._id })
  const onClickPause = () => Meteor.call("pausePlay", { assetId: asset._id, channelId: channel._id })
  const onClickStop = () => Meteor.call("stopPlay", { assetId: asset._id, channelId: channel._id })
  const onClickLoad = () => Meteor.call("loadAssetToChannel", { assetId: asset._id, channelId: channel._id })
  
</script>

<div class="container" class:playing={state?.transport == "playing"} class:loaded={loadedAsset} class:selected={selectedItem}>

  <label class="select">
    <input type="checkbox" checked={!!selectedItem} on:click={toggleSelected} />
  </label>

  <span class="transport">
    {#if loadedAsset}
      <span class="playtime">
        <Playtime {state} />
      </span>
    {/if}

    {#if !loadedAsset}
      <div class="button">
        <Button on:click={onClickLoad}>
          Load
        </Button>
      </div>
    {/if}

    {#if loadedAsset && state.transport != "playing" }
      <Button type="play" on:click={onClickPlay} />
    {/if}
    
    {#if loadedAsset && state.transport == "playing" }
      <Button type="pause" on:click={onClickPause} />
    {/if}

    {#if loadedAsset }
      <Button type="stop" on:click={onClickStop} />
    {/if}

  </span>

</div>

<style>
  .container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .container.loaded {
    background: radial-gradient(circle, #888 0%, transparent 65%);
  }
  .container.selected {
    outline: 2px solid #ff0;
  }

  .select {
    padding-left: 0.5em;
  }

  .transport {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .select input {
    all: revert;
    height: 1.3em;
    width: 1.3em;
  }

  .playing {
    /* yellow radial gradient */
    position: relative;
  }

  .playtime {
    padding: 0 0.5em;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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