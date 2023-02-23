<script>
  export let loading = false;
</script>

 {#if loading}
  <slot />
{:else}
  <div>Loading ...</div>
{/if}