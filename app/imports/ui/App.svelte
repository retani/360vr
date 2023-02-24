<script>
  import Dashboard from './Dashboard.svelte';
  import Player from './Player.svelte';
  import Admin from './admin/Admin.svelte';
  import Home from './player/Home.svelte';

  const path = window.location.pathname

</script>


<!-- router -->

{#if path === '/'}
  <Home />
{:else if path.indexOf("/dashboard") === 0}
  <Dashboard />
{:else if path.indexOf(/c/) === 0}
  <Player slug={path.split('/')[2]} />
{:else if path === "/admin"}
  <Admin />
{:else}
  <a href="/">404</a>
{/if}

