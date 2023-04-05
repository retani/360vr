<script>
  import Table from './Table.svelte';
  import Header from './Header.svelte';
  import MultiSelect from './MultiSelect.svelte';
  import EventsLog from './EventsLog.svelte';
  import Viewers from './Viewers.svelte';

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
  <div class="log">
    <!--EventsLog {channels} /-->
    <Viewers {channels} {userStatus} />
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
    grid-column: 1;
    border-top: 1px solid #555;
  }
  .log {
    grid-row: 3;
    grid-column: 2;
    border-top: 1px solid #555;
    overflow: auto;
  }
</style>