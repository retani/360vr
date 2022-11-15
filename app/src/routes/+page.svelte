<script>
  // @ts-nocheck
  import Viewer from '../components/Viewer.svelte';
  import Audiostream from '../components/Audiostream.svelte';
  import PlayerContext from '../components/PlayerContext.svelte';
  import PlayerStatus from '../components/PlayerStatus.svelte';

</script>

<h1>Welcome to 360vr</h1>

<PlayerContext>
  <PlayerStatus />
  <Viewer />
  <Audiostream />
</PlayerContext>