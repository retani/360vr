<script>
  import { navigate } from 'svelte-navigator';
  import { assetTypes } from '/imports/util/assetTypes.js'
  import Button from './Button.svelte'

  export let currentAsset
  export let mediafiles

  let originalAsset = {...currentAsset}
  let asset = {...currentAsset}
  let saveButtonText = "Save"

  const handleSubmit = async () => {
    console.log(asset)
    saveButtonText = "Saving..."
    let assetToSave = {}
    for (let field of fields) {
      assetToSave[field.key] = asset[field.key]
    }
    assetToSave._id = asset._id
    assetToSave.type = asset.type
    assetToSave.hidden = asset.hidden
    assetToSave = {...assetToSave, ...selectedAssetType.constants}
    await Meteor.callAsync('saveAsset', {
      asset: assetToSave
      }
    )
    originalAsset = {...asset}
    saveButtonText = "Saved"
    setTimeout(() => saveButtonText = "Save", 1000)
    return false
  };

  const onDelete = async () => {
    //if (confirm("Are you sure you want to delete this asset?")) {
      Meteor.call('deleteAsset', {
        assetId: asset._id
      })
      navigate('/admin/assets')
    //}
  }

  const truncateFilename = (n) => {
    const len = 30
    var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
    var filename = n.replace('.' + ext,'');
    if(filename.length <= len) {
        return n;
    }
    filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
    return filename + '.' + ext;
  }

  $: selectedAssetType = assetTypes.find(t => t.key === asset.type)
  $: fields = selectedAssetType && Object.entries(selectedAssetType.fields).map(([key, value]) => ({key, ...value}))
  $: modified = JSON.stringify(asset) !== JSON.stringify(originalAsset)

</script>

<form on:submit|preventDefault={handleSubmit}>

  <fieldset class="controls">
    <Button type="submit" disabled={!modified} style="min-width: 5em" >{saveButtonText}</Button>
    <!-- reset button -->
    <div class="secondary">
      <Button disabled={!modified} on:click={() => asset = {...originalAsset}}>Reset Changes</Button>
      <Button kind="ghost" on:click={onDelete}>delete</Button>
    </div>
  </fieldset>

  <h1>
    {#if originalAsset.name === undefined}
    New Asset
    {:else}
    {originalAsset.name}
    {/if}
  </h1>

  <fieldset class="type">
    <label class="typeSelect">
      <span class="title">
        Type
      </span>
      <div>
        {#each assetTypes as type (type.key)}
          <label>
            <input type="radio" bind:group={asset.type} value={type.key}>
            {type.key}
          </label>
        {/each}
      </div>
    </label>
  </fieldset>

  <fieldset class="meta">
    <label>
      <span class="title">
        Hide
      </span>
      <input type="checkbox" bind:checked={asset.hidden} />
    </label>
  </fieldset>

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
                <option value={mediafile._id}>{truncateFilename(mediafile.name)}</option>
              {/each}
            </select>
          {/if}
        </label>
      {/each}
    </fieldset>
  {/if}

</form>

<style>
  form {
    line-height: 1.5em;
    width: 100%;
  }

  fieldset.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  label {
    display: flex;
    flex-direction: row;
    padding: .25em;
    cursor: default;
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
    margin-bottom: 2em;
  }

  input {
    border: 1px solid #ccc;
    width: 100%;
    flex:1;
    padding: 0 .25em;
  }
  input[type="checkbox"], input[type="radio"] {
    all: revert;
    padding:.25em;
  }

  h1 {
    font-size: 1.5em;
  }
</style>