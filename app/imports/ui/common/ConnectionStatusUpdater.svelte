<script>
  // @ts-nocheck
  import { Meteor } from "meteor/meteor";
  import { DDP } from 'meteor/ddp-client'

  export let slug
  export let preview

  let connectionId
  let updateCounter = 0
  let lastData = {}

  const updateConnectionId = async () => {
    connectionId = Meteor.connection._lastSessionId
    const newData = {
      connectionId,
      slug,
      preview,
    }
    if (JSON.stringify(newData) != JSON.stringify(lastData)) {
      lastData = newData
      updateCounter++
      await Meteor.call('updateConnectionData', {...newData, updateCounter})
    }
  }
  $m: {
    const status = Meteor.status()
    updateConnectionId()
  }

  
  DDP.onReconnect(()=>{
    console.log('reconnected', Meteor.connection._lastSessionId)
    setTimeout(() => {
      updateConnectionId()
    }, 300)
  })

</script>

<slot />