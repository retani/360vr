<script>
  // @ts-nocheck
  import PlayerContext from './player/PlayerContext.svelte';
  import App from './player/App.svelte';

  export let slug;

</script>

<PlayerContext {slug}>
  <App {slug} />
</PlayerContext>
