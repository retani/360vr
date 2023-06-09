<script>
  import { navigate, Route, Link } from 'svelte-navigator'
  import Button from './Button.svelte'
  import ChannelEditor from './ChannelEditor.svelte'

  export let channels

  const onCreate = async () => {
    const id = await Meteor.callAsync("createChannel")
    console.log(id)
    if (id) {
      navigate(`/admin/channels/${id}`)
    }
  }

</script>

<div class="container">
  <Route path="/channels/*id" let:params>
    {@const currentChannel = channels.find(c => c._id == params.id)}
    <div class="list">
      {#each channels as channel}
        <Link to={`/admin/channels/${channel._id}`}>
            <div class="item" class:hidden={channel.hidden} class:selected={ channel._id == params.id }>
                {channel.name}
            </div>
        </Link>
      {/each}
      <div class="create">
        <Button on:click={onCreate}>Create Channel</Button>
      </div>
    </div>
    <div class="editor">
      {#if currentChannel}
        {#key currentChannel._id}
          <ChannelEditor {currentChannel}  />
        {/key}
      {/if}    
    </div>
  </Route>    
</div>


<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .list {
    width: 50%;
    max-width: 400px;
    border-right: solid 1px #ccc;
  }
  .item {
    display: inline-block;
    width: 100%;
    padding: 1ex;
  }
  .item::after {
    border-bottom: solid 1px #ccc;
  }
  .item.hidden {
    opacity: .5;
  }
  .item.selected {
    background-color: #333;
    /*width: calc(100% + 1px);*/
  }
  .item:hover {
    background-color: #333;
  }
  .editor {
    flex: 1;
    padding: 1em;
    height: 100%;
    background-color: #333;
  }
  .create {
    padding: 1em;
    
  }
</style>
