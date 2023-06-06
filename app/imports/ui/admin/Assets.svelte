<script>
  import { Route, navigate } from 'svelte-navigator';
  import AssetHeader from './AssetHeader.svelte';
  import AssetEditor from './AssetEditor.svelte';
  import Button from './Button.svelte';

  export let assets;
  export let mediafiles;

  const onCreate = async () => {
    const id = await Meteor.callAsync("createAsset")
    console.log(id)
    if (id) {
      navigate(`/admin/assets/${id}`)
    }
  }

</script>

<div class="container">
  <Route path="/assets/*id" let:params>
    {@const currentAsset = assets.find(a => a._id == params.id)}
    <div class="list">
      {#each assets as asset}
          <div class="item" class:hidden={asset.hidden} class:selected={ asset._id == params.id }>
            <AssetHeader {asset} />
          </div>
      {/each}
      <div class="create">
        <Button on:click={onCreate}>Create Asset</Button>
      </div>
    </div>
    <div class="editor">
      {#if currentAsset}
        {#key currentAsset._id}
          <AssetEditor {currentAsset} {mediafiles} />
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
  .create {
    padding: 1em;
    
  }
</style>
