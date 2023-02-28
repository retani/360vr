<script>
  import Table from './Table.svelte';
  import Header from './Header.svelte';
  import MultiSelect from './MultiSelect.svelte';

  export let channels
  export let assets
  export let userStatus
</script>

<div class="container">
  <div class="header">
    <Header />
  </div>
  <div class="table">
    <Table {channels} {assets} {userStatus}/>
  </div>
  <div class="scenes">
    <MultiSelect />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-rows: min-content 7fr 3fr;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
  }
  .header {
    grid-row: 1;
    grid-column: 1 / 3;
  }
  .table {
    grid-row: 2;
    grid-column: 1 / 3;
    overflow: auto;
  }
  .scenes {
    grid-row: 3;
    grid-column: 1 / 3;
    border-top: 1px solid #555;
  }
</style>