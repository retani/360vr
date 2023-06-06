<script>
  import Table from './Table.svelte';
  import MultiSelect from './MultiSelect.svelte';

  export let channels
  export let assets
  export let userStatus
</script>

<div class="container">
  <div class="table">
    <Table {channels} assets={assets.filter(a => !a.hidden)} {userStatus}/>
  </div>
  <div class="scenes">
    <MultiSelect />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
  }
  .table {
    flex: 1;
    overflow: auto;
  }
  .scenes {
    border-top: 1px solid #555;
  }
</style>