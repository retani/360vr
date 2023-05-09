<script>
  import { Router, Link, Route } from "svelte-navigator";
  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const preview = params.has('preview')
</script>

<Router>

  <Route path="/">
    {#await import(/* @vite-ignore */`./player/Home.svelte`) then Home}
      <svelte:component this={Home.default} {preview} />
    {/await}
  </Route>

  <Route path="/dashboard">
    {#await import(/* @vite-ignore */`./Dashboard.svelte`) then Dashboard}
      <svelte:component this={Dashboard.default} />
    {/await}
  </Route>

  <Route path="/c/:slug" let:params>
    {#await import(/* @vite-ignore */`./Player.svelte`) then Player}
      <svelte:component this={Player.default} slug={params.slug} {preview}  />
    {/await}
  </Route>

  <Route path="/admin/*">
    {#await import(/* @vite-ignore */`./admin/Admin.svelte`) then Admin}
      <svelte:component this={Admin.default} />
    {/await}
  </Route>

</Router>
