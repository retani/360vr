<script>
  // @ts-nocheck
  import { env } from '$env/dynamic/public';
  import PlayerContext from '/src/components/PlayerContext.svelte';
  import App from '/src/components/App.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const slug = data.slug;
  const endpoint = env.PUBLIC_ENDPOINT

</script>

<PlayerContext>
  <App {slug} {endpoint} />
</PlayerContext>
