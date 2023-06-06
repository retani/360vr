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
      <Link to="/admin/assets/{asset._id}">
        <div class="item" class:selected={ asset._id == params.id }>
          <AssetHeader {asset} />
        </div>
      </Link>
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
  }
  .list {
    width: 50%;
    max-width: 400px;
  }
  .item {
    display: inline-block;
    width: 100%;
    padding: 1ex;
    border-bottom: solid 1px #ccc;
  }
  .item.selected {
    background-color: #333;
  }
  .item:hover {
    background-color: #333;
  }
  .editor {
    flex: 1;
    padding: 1em;
    border-left: solid 1px #ccc;
    background-color: #333;
  }
</style>
