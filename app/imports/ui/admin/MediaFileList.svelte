<script>
  import { Meteor } from 'meteor/meteor';
  import Spinner from './Spinner.svelte';

  export let mediafiles;
</script>

<table class="container">
  <thead>
    <tr>
      <th class="name">Name</th>
      <th class="size">Size</th>
      <th class="type">Type</th>
      <th class="url">URL</th>
      <th class="duration">Duration</th>
      <th class="transcoder">Video Transcoder</th>
    </tr>
  </thead>
  <tbody>
    {#each mediafiles as mediafile}
      <tr class="mediafile">
        <td class="name">{mediafile.name}</td>
        <td class="size">{mediafile.size}</td>
        <td class="type">{mediafile.type}</td>
        <td class="url">{mediafile.url}</td>
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