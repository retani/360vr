<script>
  //import { UserStatus } from 'meteor/mizzao:user-status';

  export let channel
  export let userStatus

  $: players = userStatus.filter(p => p.channelSlug == channel.slug) || []
</script>

<a href="/c/{channel.slug}" title={channel.slug} target="_blank" rel="noreferrer">
  {channel.name}
</a>
<br/>
{players.length} players