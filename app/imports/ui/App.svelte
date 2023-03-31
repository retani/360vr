<script>
  import Player from './Player.svelte';
  import Home from './player/Home.svelte';

  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const preview = params.has('preview')


</script>


<!-- router -->

{#if path === '/'}

  {#await import(`./player/Home.svelte`) then Home}
    <svelte:component this={Home.default} {preview} />
  {/await}

{:else if path.indexOf("/dashboard") === 0}

  {#await import(`./Dashboard.svelte`) then Dashboard}
    <svelte:component this={Dashboard.default} />
  {/await}

{:else if path.indexOf(/c/) === 0}
  
  {#await import(`./Player.svelte`) then Player}
    <svelte:component this={Player.default} slug={path.split('/')[2]} {preview}  />
  {/await}

{:else if path === "/admin"}

  {#await import(`./admin/Admin.svelte`) then Admin}
    <svelte:component this={Admin.default} />
  {/await}

{:else}

  <a href="/">404</a>

{/if}

