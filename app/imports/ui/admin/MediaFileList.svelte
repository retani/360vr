<script>
  import { Meteor } from 'meteor/meteor';
  import Spinner from './Spinner.svelte';
  import Button from './Button.svelte';

  export let mediafiles;
  export let assets;

  $: {
    for (let m in mediafiles) {
      mediafiles[m].usedBy = assets.filter(a => a.mediafile === mediafiles[m]._id);
    }
  }

  const onDelete = async (mediafile) => {
    if (mediafile.usedBy.length > 0) {
      alert("This mediafile is used by " + mediafile.usedBy.length + " assets. Please remove it from those assets before deleting it.")
    } else {
      Meteor.call('mediafile.delete', {id: mediafile._id})
    }
  }

</script>

<table class="container">
  <thead>
    <tr>
      <th class="name">Name</th>
      <th class="size">Size</th>
      <th class="type">Type</th>
      <th class="url">URL</th>
      <th class="useCount">Used By</th>
      <th class="duration">Duration</th>
      <th class="transcoder">Video Transcoder</th>
      <th class="actions">actions</th>
    </tr>
  </thead>
  <tbody>
    {#each mediafiles as mediafile}
      <tr class="mediafile">
        <td class="name">{mediafile.name}</td>
        <td class="size">{mediafile.size}</td>
        <td class="type">{mediafile.type}</td>
        <td class="url">{mediafile.url}</td>
        <td class="useCount">
          {mediafile.usedBy.length}
        </td>
        <td class="duration">
          {#if mediafile.meta.duration}
            {mediafile.meta.duration}s
          {:else}
            —
          {/if}
        </td>
        <td class="transcoder">
          {#if mediafile.meta.transcoder}
            {#if mediafile.meta.transcoder == "transcoding"}
              <Spinner />
            {/if}
            {mediafile.meta.transcoder}
          {:else}
            —
          {/if}

          {#if mediafile.meta.transcodedSizeInBytes}
            ({Math.ceil(mediafile.meta.transcodedSizeInBytes / 1024 / 1024)} MB)
          {/if}
        </td>
        <td class="actions">
          <Button  on:click={() => onDelete(mediafile)}>
            delete
          </Button>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .container {
    width: 100%;
    border-collapse: collapse;
  }
  th,td {
    padding: 5px;
    border: 1px solid #555;
  }
  th {
    background-color: #555;
  }
</style>