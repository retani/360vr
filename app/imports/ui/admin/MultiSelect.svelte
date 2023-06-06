<script>
  import { Meteor } from "meteor/meteor";
  import Button from './Button.svelte';
  import ButtonBar from './ButtonBar.svelte';
  import { selectedAssetsChannels } from "./stores.js";

  $: amount = $selectedAssetsChannels.length

  const onClear = () => {
    $selectedAssetsChannels = [];
  }

  const onLoad = () => {
    $selectedAssetsChannels.forEach(({ assetId, channelId }) => {
      Meteor.call("loadAssetToChannel", { assetId, channelId });
    });
  }

  const onPlay = () => {
    $selectedAssetsChannels.forEach(({ assetId, channelId }) => {
      Meteor.call("startPlay", { assetId, channelId });
    });
  }

  const onPause = () => {
    $selectedAssetsChannels.forEach(({ assetId, channelId }) => {
      Meteor.call("pausePlay", { assetId, channelId });
    });
  }

  const onStop = () => {
    $selectedAssetsChannels.forEach(({ assetId, channelId }) => {
      Meteor.call("stopPlay", { assetId, channelId });
    });
  }

  const onOpen = () => {
    $selectedAssetsChannels = [];
  }

  const onClose = () => {
    $selectedAssetsChannels = false;
  }


</script>

<div class="container" data-amount={amount}>
  {#if !$selectedAssetsChannels}
    <Button on:click={onOpen}>
      enable multi-select
    </Button>
  {:else}
    <span class="amount">
      { amount } selected
    </span>
    <span class="controls">
      <ButtonBar>
        <Button on:click={onLoad}>Load</Button>
        <Button on:click={onPlay} type="play" />
        <Button on:click={onPause} type="pause" />
        <Button on:click={onStop} type="stop" />
        <Button on:click={onClear} kind="ghost">Clear</Button>
      </ButtonBar>
    </span>
    <span class="close">
      <Button on:click={onClose} >Close</Button>
    </span>
  {/if}
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    background: #333;
    color: white;
    height: 3em;
  }
  /*[data-amount="0"] > * {
    visibility: hidden;
  }*/
  .controls {
    border: 2px solid #ff0;
  }
  .amount {
    padding-right: 0.5em;
  }
  .close {
    padding-left: 0.5em;
  }
</style>