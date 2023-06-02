<script>
  import { useMatch } from "svelte-navigator";
  import Header from './Header.svelte';
  import Launcher from './Launcher.svelte';
  import Viewers from './Viewers.svelte';
  import Files from './Files.svelte';
  import Assets from './Assets.svelte';

  export let channels
  export let assets
  export let userStatus
  export let mediafiles

  const root = useMatch("")
  const viewers = useMatch("viewers")
  const files = useMatch("files")
  const assetsRoute = useMatch("assets")

  $: console.log("XXX", $root, $viewers, $files)
</script>

<div class="container">
  <div class="header">
    <Header />
  </div>
  <div class="main">
    <div class="tab" class:active={$root}>
      <Launcher {channels} {assets} {userStatus} />
    </div>
    <div class="tab" class:active={$viewers}>
      <Viewers {userStatus} />
    </div>
    <div class="tab" class:active={$files}>
      <Files {mediafiles}/>
    </div>  
    <div class="tab" class:active={$assetsRoute}>
      <Assets {assets}/>
    </div>
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

  .tab:not(.active) {
    display: none;
  }

</style>