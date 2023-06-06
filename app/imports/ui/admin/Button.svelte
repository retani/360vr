<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import Play from "svelte-icons-pack/fa/FaSolidPlay";
  import Pause from "svelte-icons-pack/fa/FaSolidPause";
  import Stop from "svelte-icons-pack/fa/FaSolidStop";
  
  export let type = null
  export let title = null
  export let kind = "primary" // primary, ghost
  export let disabled = false

  const icon = {
    play: Play,
    pause: Pause,
    stop: Stop
  }[type]
  
</script>

<button on:click class={kind} {disabled}>
  {#if icon}
    <Icon src={icon} size="1em" {title} />
  {/if}
  <slot />
</button>

<style>
  button {
    all: revert;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    cursor: pointer;
  }
  button:not[disabled]:hover {
    filter: brightness(1.25);
  }
  button:active {
    filter: brightness(0.75);
  }
  button[disabled] {
    cursor: default;
    pointer-events: none;
  }
  .ghost {
    background: transparent;
    border: none;
    color: white;
  }
</style>