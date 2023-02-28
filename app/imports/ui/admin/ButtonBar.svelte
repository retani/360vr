<div class="container">
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 2em;
    /*background-color: #222;
    border-bottom: 1px solid #555;*/
    padding: 5px;
  }
  .container :global( > *:not(:first-child) ) {
    margin-left: 0.25em;
  }
</style>