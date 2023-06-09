<script>
  import { navigate, Link } from 'svelte-navigator';
  import { assetTypes } from '/imports/util/assetTypes.js'
  import EditorForm from './EditorForm.svelte'

  export let currentAsset
  export let mediafiles

  let originalAsset = {...currentAsset}
  let asset = {...currentAsset}

  const handleSubmit = async () => {
    console.log(asset)
    let assetToSave = {}
    for (let field of fields) {
      assetToSave[field.key] = asset[field.key]
    }
    assetToSave._id = asset._id
    assetToSave.type = asset.type
    assetToSave.hidden = asset.hidden || false
    assetToSave = {...assetToSave, ...selectedAssetType.constants}
    await Meteor.callAsync('saveAsset', {
      asset: assetToSave
      }
    )
    originalAsset = {...asset}
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

  const onReset = () => {
    asset = {...originalAsset}
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

<EditorForm {modified} {originalAsset} {onDelete} {onReset} {handleSubmit}>

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
        Hidden
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
            {#if mediafiles.length === 0}
              <div>No media files available. <Link style="border-bottom: 1px dotted currentColor" to="/admin/files">Upload media</Link></div>
            {:else}
              <select bind:value={asset[field.key]}>
                <option value="">-- None --</option>
                {#each mediafiles as mediafile}
                  <option value={mediafile._id}>{truncateFilename(mediafile.name)}</option>
                {/each}
              </select>
            {/if}
          {/if}
        </label>
      {/each}
    </fieldset>
  {/if}

</EditorForm>

<style>

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
</style>