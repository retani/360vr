<script>
  import { assetTypes } from '/imports/util/assetTypes.js'

  export let assets
  export let assetId
  export let mediafiles

  let asset = assets.find(a => a._id === assetId) || {}
  let originalAsset = {...asset}
  let saveButtonText = "Save"

  const handleSubmit = async () => {
    console.log(asset)
    saveButtonText = "Saving..."
    await Meteor.call('saveAsset', {
      asset:
        {
          ...asset, 
          ...selectedAssetType.constants
        }
      }
    )
    originalAsset = {...asset}
    saveButtonText = "Saved"
    setTimeout(() => saveButtonText = "Save", 1000)
    return false
  };

  $: selectedAssetType = assetTypes.find(t => t.key === asset.type)
  $: fields = Object.entries(selectedAssetType.fields).map(([key, value]) => ({key, ...value}))
  $: modified = JSON.stringify(asset) !== JSON.stringify(originalAsset)

</script>

<h1>Asset Setup</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label class="typeSelect">
    <span class="title">
      Type
    </span>
    <select bind:value={asset.type}>
      {#each assetTypes as type }
        <option value={type.key}>{type.key}</option>
      {/each}
    </select>
  </label>
  {#if asset.type && selectedAssetType.fields}
    <fieldset class="fields">
      {#each fields as field }
        <label>
          <span class="title">
            {field.key}
          </span>
          {#if field.type=="text"}
            <input type="text" bind:value={asset[field.key]} />
          {:else if field.type=="url"}
            <input type="text" bind:value={asset[field.key]} />
          {:else if field.type=="boolean"}
            <input type="checkbox" bind:checked={asset[field.key]} />
          {:else if field.type=="mediafile"}
            <select bind:value={asset[field.key]}>
              <option value="">-- None --</option>
              {#each mediafiles as mediafile}
                <option value={mediafile._id}>{mediafile.name}</option>
              {/each}
            </select>
          {/if}
        </label>
      {/each}
    </fieldset>
  {/if}

  <button type="submit" disabled={!modified} >{saveButtonText}</button>
  <!-- reset button -->
  <button type="button" disabled={!modified} on:click={() => asset = {...originalAsset}}>Reset</button>
  
</form>

<style>
  form {
    line-height: 1.5em;
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: row;
    padding: .25em;
  }
  label .title {
    width: 7em;
  }

  .typeSelect, h1 {
    margin-bottom: 1em;
  }

  select {
    border: 1px solid #ccc;
    border-radius: .25em;
    padding-left: .5em;
    padding-right: .5em;
    position: relative;
    max-width: calc(100% - 1em);
    all: revert;
  }
  .fields select {
    flex:1;
  }

  fieldset {
    margin-bottom: 1em;
  }
  button {
    background: #ccc;
    color: black;
    border-radius: .25em;
    padding: .5em;
    cursor: pointer;
  }
  button:not(:disabled):hover {
    background: #ddd;
  }
  button:disabled {
    color: #999;
    cursor: not-allowed;
  }
  input {
    border: 1px solid #ccc;
    width: 100%;
    flex:1;
    padding: 0 .25em;
  }
  input[type="checkbox"] {
    all: revert;
    padding:.25em;
  }
</style>