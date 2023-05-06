<script>
  import { Router, Link, Route } from "svelte-navigator";
  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const preview = params.has('preview')
</script>

<Router>

  <Route path="/">
    {#await import(`./player/Home.svelte`) then Home}
      <svelte:component this={Home.default} {preview} />
    {/await}
  </Route>

  <Route path="/dashboard">
    {#await import(`./Dashboard.svelte`) then Dashboard}
      <svelte:component this={Dashboard.default} />
    {/await}
  </Route>

  <Route path="/c/:slug" let:params>
    {#await import(`./Player.svelte`) then Player}
      <svelte:component this={Player.default} slug={params.slug} {preview}  />
    {/await}
  </Route>

  <Route path="/admin/*">
    {#await import(`./admin/Admin.svelte`) then Admin}
      <svelte:component this={Admin.default} />
    {/await}
  </Route>

</Router>
