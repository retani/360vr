<script>
  import Dashboard from './Dashboard.svelte';
  import Player from './Player.svelte';
  import Admin from './admin/Admin.svelte';
  import Home from './player/Home.svelte';

  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const preview = params.has('preview')

</script>


<!-- router -->

{#if path === '/'}
  <Home />
{:else if path.indexOf("/dashboard") === 0}
  <Dashboard />
{:else if path.indexOf(/c/) === 0}
  <Player slug={path.split('/')[2]} {preview} />
{:else if path === "/admin"}
  <Admin />
{:else}
  <a href="/">404</a>
{/if}

