<script>
  import { Route, Link, location } from 'svelte-navigator';
  import AssetHeader from './AssetHeader.svelte';
  import AssetEditor from './AssetEditor.svelte';

  export let assets;
  export let mediafiles;

</script>

<div class="container">
  <Route path="/assets/*id" let:params>
  <div class="list">
    {#each assets as asset}
        <div class="item" class:hidden={asset.hidden} class:selected={ asset._id == params.id }>
          <AssetHeader {asset} />
        </div>
    {/each}
  </div>
  <div class="editor">
    {#if params.id}
      {#key params.id}
        <AssetEditor {assets} assetId={params.id} {mediafiles} />
      {/key}
    {/if}    
  </div>
  </Route>    
</div>


<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    
    height: 100%;
  }
  .list {
    width: 50%;
    max-width: 400px;
    border-right: solid 1px #ccc;
  }
  .item {
    display: inline-block;
    width: 100%;
    padding: 1ex;
  }
  .item::after {
    border-bottom: solid 1px #ccc;
  }
  .item.hidden {
    opacity: .5;
  }
  .item.selected {
    background-color: #333;
    /*width: calc(100% + 1px);*/
  }
  .item:hover {
    background-color: #333;
  }
  .editor {
    flex: 1;
    padding: 1em;
    height: 100%;
    background-color: #333;
  }
</style>
