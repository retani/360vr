<script>
  import Cell from './Cell.svelte'
  import ChannelHeader from './ChannelHeader.svelte'
  import AssetHeader from './AssetHeader.svelte'

  export let channels
  export let assets
  export let userStatus
</script>

<table>
  <thead>
    <th class="topleft">
      <span class="columnlabel">
        Channels
      </span>
      <span class="rowlabel">
        Assets
      </span>
    </th>
    {#each channels as channel}
      <th>
        <ChannelHeader {channel} {userStatus}/>
      </th>
    {/each}
  </thead>
  <tbody>
    {#each assets as asset}
      <tr>
        <th>
          <AssetHeader {asset}/>
        </th>
        {#each channels as channel}
          <td>
            <Cell {channels} {assets} {channel} {asset} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
        
</table>

<style>
  table {
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #888;
  }
  th {
    padding: 0.5em;
    background-color: #222;
  }
  table thead {
    position: sticky;
    inset-block-start: 0; /* "top" */
  }
  tr {
    height: 2rem;
  }
  td {
    height: inherit;
  }
  .topleft {
    position: relative;
  }
  .columnlabel {
    display: block;
    transform: rotate(-90deg);
    transform-origin: right bottom;
    margin-left: 1em;
    position: absolute;
    top: -1em;
    right: 0;
    padding: 5px;
  }
  .rowlabel {
    display: block;
    margin-top: 1em;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px;
    width: 100%;
    
  }
</style>