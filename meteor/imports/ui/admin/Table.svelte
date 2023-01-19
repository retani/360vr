<script>
  import Cell from './Cell.svelte'

  export let channels
  export let assets
</script>

<table>
  <thead>
    <th>
      Channels ➡
      <br>
      Assets ↓
    </th>
    {#each channels as channel}
      <th>
        <a href="/c/{channel.slug}" title={channel.slug} target="_blank" rel="noreferrer">
          {channel.name}
        </a>
      </th>
    {/each}
  </thead>
  <tbody>
    {#each assets as asset}
      <tr>
        <th>
          <a href="{asset.url}" title={asset.url} target="_blank" rel="noreferrer">
            {asset.name}
          </a>
          {#if asset.hasMicrophone}
            <span title="uses microphone">
              🎤
            </span>
          {/if}
          {#if asset.hasVideo}
            <span title="has video">
              🎬
            </span>
          {/if}
          {#if asset.hasAudio}
            <span title="has audio">
              🔈
            </span>
          {/if}
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
    height: 100%;
  }
  th, td {
    border: 1px solid #888;
  }
  th {
    background: #222;
    padding: 0.5em;
  }
</style>