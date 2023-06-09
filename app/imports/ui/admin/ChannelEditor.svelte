<script>
  import { navigate } from 'svelte-navigator';
  import EditorForm from './EditorForm.svelte'
  
  export let currentChannel

  let originalChannel = {...currentChannel}
  let channel = {...currentChannel}

  const handleSubmit = async () => {
    let channelToSave = {}
    channelToSave._id = channel._id
    channelToSave.hidden = channel.hidden
    channelToSave = {...channelToSave, ...channel}
    await Meteor.callAsync('saveChannel', {
      channel: channelToSave
      }
    )
    originalChannel = {...channel}
    return false
  };

  const onDelete = async () => {
    //if (confirm("Are you sure you want to delete this channel?")) {
      Meteor.call('deleteChannel', {
        channelId: channel._id
      })
      navigate('/admin/channels')
    //}
  }

  const onReset = () => {
    channel = {...originalChannel}
  }

  $: modified = JSON.stringify(channel) !== JSON.stringify(originalChannel)
  $: url = Meteor.absoluteUrl() + "c/" + channel.slug

</script>

<EditorForm {modified} {onDelete} {onReset} {handleSubmit}>

  <fieldset>
    <label>
      <span class="title">
        Name
      </span>
      <input type="text" bind:value={channel.name} />
    </label>
    <label>
      <span class="title">
        Slug
      </span>
      <input type="text" required bind:value={channel.slug} pattern="[A-Za-z0-9\-]+"/>
    </label>
    <span class="label">
      <span class="title">
        URL
      </span>
      <a href={url}>
        {url}
      </a>
    </span>
    <label>
      <span class="title">
        Type
      </span>
        <select>
          <option value="headset">Headset</option>
        </select>
    </label>
  </fieldset>

  <fieldset>
    <label>
      <span class="title">
        Hidden
      </span>
      <input type="checkbox" bind:checked={channel.hidden} />
    </label>
  </fieldset>

</EditorForm>

<style>

  label, .label {
    display: flex;
    flex-direction: row;
    padding: .25em;
    cursor: default;
  }

  label .title, .label .title {
    width: 7em;
  }

  fieldset {
    margin-bottom: 2em;
  }

  input {
    border: 1px solid #ccc;
    width: 100%;
    flex:1;
    padding: 0 .25em;
  }
  input[type="checkbox"], input[type="radio"] {
    all: revert;
    padding:.25em;
  }
  a {
    border-bottom: 1px dotted currentColor;
  }
</style>