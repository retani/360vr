import { Channels } from './collections.js';

function checkForEndedAssets() {
  // finc channels that have layers with assets that are playing and have a duration
  const channels = Channels.find({
    "layers": {
      $elemMatch: {
        "state.transport": "playing",
        /*"asset.duration": {
          $gt: 0
        }*/
      }
    }
  }, {
    fields: {
      "layers": 1
    }
  }).fetch()

  // put all playing layers in one array
  const layers = channels.reduce((acc, channel) => {
    return acc.concat(channel.layers)
  }, []).filter(layer => layer.state.transport === "playing" /*&& layer.asset.duration > 0*/)

  //console.log("Playing LAYERS durations: ", layers.map(layer => layer.asset.duration));
}

function startCron() {
  Meteor.setInterval(Meteor.bindEnvironment(() => {
    checkForEndedAssets();
  }), 1000);
}

export {
  startCron
}