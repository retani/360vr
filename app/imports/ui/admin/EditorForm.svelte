<script>
  import Button from './Button.svelte';
  import { navigate } from 'svelte-navigator';

  export let modified
  export let onDelete
  export let onReset
  export let handleSubmit

  let saveButtonText = "Save"
  let saving = false



  const onSubmit = async () => {
    saving = true
    await handleSubmit()
    saving = false
    saveButtonText = "Saved"
    setTimeout(() => saveButtonText = "Save", 2000)
  }
</script>

<form on:submit|preventDefault={onSubmit}>

  <fieldset class="controls">
    <Button type="submit" disabled={!modified || saving} style="min-width: 5em" >{saveButtonText}</Button>
    <!-- reset button -->
    <div class="secondary">
      <Button disabled={!modified} on:click={onReset}>Reset Changes</Button>
      <Button kind="ghost" on:click={onDelete}>delete</Button>
    </div>
  </fieldset>

  <slot />

</form>

<style>
  form {
    line-height: 1.5em;
    width: 100%;
  }

  fieldset.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1em 0;
  }

  h1 {
    font-size: 1.5em;
  }
</style>