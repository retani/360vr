<script>
  import { Link } from 'svelte-navigator'

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
        <Link to="/admin/channels">Channels</Link>
      </span>
      <span class="rowlabel">
        <Link to="/admin/assets">Assets</Link>
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

{#if assets.length === 0}
  <div class="noassets">
    No assets available. 
    <Link to="/admin/assets" style="border-bottom: 1px dotted currentColor">Create Assets</Link>
  </div>
{/if}

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
    height: 1.5rem;
  }
  td {
    height: inherit;
  }
  .topleft {
    position: relative;
    min-width: 10em;
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
    letter-spacing: 0.1em;
  }
  .rowlabel {
    display: block;
    margin-top: 1em;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px;
    width: 100%;
    letter-spacing: 0.1em;
  }
  .noassets {
    padding: 1rem;
  }
</style>