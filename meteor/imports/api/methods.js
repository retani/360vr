import { Meteor } from 'meteor/meteor';
import { Assets, Channels, Globals } from '/imports/api/collections';

const initialPlayState = {
  playing: false,
  //currentTime: 0,
  //duration: 0,
  //volume: 1,
  //muted: false,
  //loop: false,
  //playbackRate: 1,
  //error: null,
}

Meteor.methods({

  // add asset to channel as layer
  loadAssetToChannel({channelId, assetId}) {
    const channel = Channels.findOne(channelId)
    const asset = Assets.findOne(assetId)

    layer = {
      _id: asset._id,
      asset,
      state: initialPlayState
    }

    console.log(`Loading asset "${asset.name}" on channel ${channel.slug}`);

    // copy asset into channel.layers if not already there
    Channels.update(channelId, {
      $addToSet: {
        layers: {
          $each: [layer]
        }
      }
    });

    return layer
  },

  // remove asset from channel
  unloadAssetFromChannel({channelId, assetId}) {
    const channel = Channels.findOne(channelId)
    const asset = Assets.findOne(assetId)

    console.log(`Unloading asset "${asset.name}" from channel ${channel.slug}`);

    // remove asset from channel.layers
    Channels.update(channelId, {
      $pull: {
        layers: {
          _id: assetId
        }
      }
    });

    return true
  },

  async startPlay({channelId, assetId}) {
    return await Meteor.call('updateLayerState', {
      channelId, 
      assetId,
      key:"playing", 
      value: true
    });
  },

  async stopPlay({channelId, assetId}) {
    await Meteor.call('updateLayerState', {
      channelId, 
      assetId,
      key:"playing", 
      value: false
    });
    // unload asset from channel
    await Meteor.call('unloadAssetFromChannel', {channelId, assetId});
  },

  async updateLayerState({channelId, assetId, key, value}) {
    const channel = Channels.findOne(channelId)

    // get and/or set asset
    let layer
    if (!channel.layers || !channel.layers.find(layer => layer._id === assetId)) {
      layer = await Meteor.call('loadAssetToChannel', {channelId, assetId});
    } else {
      layer = channel.layers.find(layer => layer._id === assetId)
    }

    const asset = layer.asset
    const state = layer.state

    console.log(`Updateing asset "${asset.name}" on channel ${channel.slug}`);

    // set asset.playing to channel.layers where asset._id === assetId
    Channels.update(channelId, {
      $set: {
        [`layers.$[layer].state.${key}`]: value
      }
    }, {
      arrayFilters: [
        { "layer._id": assetId }
      ]
    });
      
    return true

  },

});