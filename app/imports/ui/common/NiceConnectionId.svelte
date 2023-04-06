<script>
  import ehg, { getHash } from 'emoji-hash-gen';

  export let connectionId = null;
</script>

{#if connectionId}
  <div class="id">
    {getHash(connectionId, {length: 3, base: Object.keys(ehg.table).length})}
  </div>
{/if}


<style>
  .id {
    grid-area: id;
    display: inline-flex;
    white-space: nowrap;
    border: 1px solid #555;
    border-radius: 1em;
    background-color: #333;
    padding: 0 0.25em;
  }
  .id:hover {
    filter: grayscale(0%);
    cursor: default;
  }
</style>