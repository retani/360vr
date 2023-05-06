<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Header from './Header.svelte';
  import Launcher from './Launcher.svelte';
  import Viewers from './Viewers.svelte';
  //import Files from './Files.svelte';

  export let channels
  export let assets
  export let userStatus
</script>

<div class="container">
  <div class="header">
    <Header />
  </div>
  <div class="main">
    <Route path="/">
      <Launcher {channels} {assets} {userStatus} />
    </Route>
    <Route path="/viewers">
      <Viewers {userStatus} />
    </Route>
    <!--Route path="/files">
      <Files />
    </Route-->
    </div>  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .header {
    
  }
  .main {
    flex: 1;
  }

</style>