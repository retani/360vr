<script>
  
  import Header from './Header.svelte';
  import Launcher from './Launcher.svelte';
  import Viewers from './Viewers.svelte';
  import Files from './Files.svelte';
  import Assets from './Assets.svelte';
  import Channels from './Channels.svelte';
  import { useMatch } from "svelte-navigator";

  export let channels
  export let assets
  export let userStatus
  export let mediafiles

  $: channels = channels.sort((a, b) => a.name.localeCompare(b.name))
  $: assets = assets.sort((a, b) => a.name.localeCompare(b.name))

  const root = useMatch("")
  const viewers = useMatch("viewers")
  const files = useMatch("files")
  const assetsRoute = useMatch("assets/*")
  const channelsRoute = useMatch("channels/*")

  let activeRoute = null

  $: {
    if ($root) activeRoute = "root"
    else if ($viewers) activeRoute = "viewers"
    else if ($files) activeRoute = "files"
    else if ($assetsRoute) activeRoute = "assets"
    else if ($channelsRoute) activeRoute = "channels"
  }

</script>

<div class="container">
  <div class="header">
    <Header {activeRoute}/>
  </div>
  <div class="main">
    <div class="tab" class:active={$root}>
      <Launcher {channels} {assets} {userStatus} />
    </div>
    <div class="tab" class:active={$channelsRoute}>
      <Channels {channels} {assets}  />
    </div>    
    <div class="tab" class:active={$viewers}>
      <Viewers {userStatus} />
    </div>
    <div class="tab" class:active={$files}>
      <Files {mediafiles} {assets} />
    </div>  
    <div class="tab" class:active={$assetsRoute}>
      <Assets {assets} {mediafiles}/>
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

  .tab {
    height: 100%;
  }

  .tab:not(.active) {
    display: none;
  }

</style>