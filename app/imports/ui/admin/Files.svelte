<script>
  import Upload from './Upload.svelte';
  import MediaFileList from './MediaFileList.svelte';

  export let mediafiles;
  export let assets;
</script>

<div class="container">
  <div class="upload">
    <Upload />
  </div>
  <div class="mediafiles">
    <MediaFileList {mediafiles} {assets} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .upload {
  }
  .mediafiles {
    flex: 1;
    overflow: auto;
  }
</style>