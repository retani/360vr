<script>
  import { Meteor } from 'meteor/meteor';

  export let mediafiles;
</script>

<table class="container">
  <thead>
    <tr>
      <th class="name">Name</th>
      <th class="size">Size</th>
      <th class="type">Type</th>
      <th class="url">URL</th>
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
        <td class="transcoder">{mediafile.meta.transcoder || ""}
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