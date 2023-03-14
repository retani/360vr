<script>
  // @ts-nocheck
  import PlayerContext from './player/PlayerContext.svelte';
  import App from './player/App.svelte';

  export let slug;
  export let preview;

</script>

<PlayerContext {slug}>
  <App {slug} {preview} />
</PlayerContext>
