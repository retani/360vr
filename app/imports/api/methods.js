import { Meteor } from 'meteor/meteor';
import { UserStatus } from 'meteor/mizzao:user-status';
import { Assets, Channels, Globals, Events } from '/imports/api/collections';
import { MediaFiles } from '/imports/api/mediafileserver';

const initialPlayState = {
  transport: "stopped",
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

    if (!channel) {
      throw new Meteor.Error('Channel not found');
    }

    if (!asset) {
      throw new Meteor.Error('Asset not found');
    }

    // resolve url for mediafile, if it has one
    if (asset.mediafile) {
      const mediafile = MediaFiles.findOne(asset.mediafile);
      if (asset.type == 'video' && mediafile.meta.transcoder == "done") {
        asset.url = `/hls/${mediafile._id}.${mediafile.ext}/index.m3u8`;
      } else {
        asset.url = `/media/${mediafile._id}.${mediafile.ext}`;
      }
    }

    layer = {
      _id: asset._id,
      asset,
      state: initialPlayState
    }

    console.log(`Loading asset "${asset.name}" on channel ${channel.slug}`, layer);

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
    // get current offset if paused
    const state = await Channels.findOne(channelId).layers.find(layer => layer._id === assetId)?.state || {}
    state.offset = state.offset || 0

    return await Meteor.call('updateLayerState', {
      channelId, 
      assetId,
      data: {
        transport: "playing",
        startedAt: state.offset ? Date.now() - state.offset : Date.now(),
        offset: state.offset
      }
    });
  },

  async pausePlay({channelId, assetId}) {
    // get current startedAt time
    const state = await Channels.findOne(channelId).layers.find(layer => layer._id === assetId)?.state

    await Meteor.call('updateLayerState', {
      channelId, 
      assetId,
      data: {
        transport: "paused",
        pausedAt: Date.now(),
        offset: Date.now() - state.startedAt
      }
    });
  },

  async stopPlay({channelId, assetId}) {
    await Meteor.call('updateLayerState', {
      channelId, 
      assetId,
      data: {
        transport: "stopped",
        stoppedAt: Date.now(),
        offset: 0
      }
    });
    // unload asset from channel
    await Meteor.call('unloadAssetFromChannel', {channelId, assetId});
  },

  async updateLayerState({channelId, assetId, data}) {
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

    // get key/value pairs to update from data and make an object for $set
    const $set = {}
    for (const [key, value] of Object.entries(data)) {
      if (state[key] !== value) {
        $set[`layers.$[layer].state.${key}`] = value
      }
    }

    // set asset.playing to channel.layers where asset._id === assetId
    Channels.update(channelId, {
      $set
    }, {
      arrayFilters: [
        { "layer._id": assetId }
      ]
    });
      
    return true

  },

  updateConnectionData({connectionId, slug, preview, updateCounter}) {
    console.log("updateConnectionData", connectionId, slug);
    UserStatus.connections.update(connectionId, {
      $set: {
        "channelSlug": slug,
        // set preview if it is not undefined
        ...preview !== undefined && { preview },
        // set route if it is not undefined
        //...route !== undefined && { route }
        // set updateCounter if it is not undefined
        ...updateCounter !== undefined && { updateCounter }
      }
    });
  },

  logBrowserEvent({channelId, connectionId, data}) {
    Events.insert({
      type: "browser",
      channelId,
      connectionId,
      data,
      createdAt: new Date()
    });
  },

  saveAsset({asset}) {
    Assets.update(asset._id, asset);
  },

  createAsset() {
    const asset = {
      name: "New Asset",
    }
    return Assets.insert(asset);
  },

  deleteAsset({assetId}) {
    Assets.remove(assetId);
  },

  saveChannel({channel}) {
    Channels.update(channel._id, channel);
  },

  createChannel() {
    const channel = {
      name: "New Channel",
      slug: "new-channel",
      layers: []
    }
    return Channels.insert(channel);
  },

  deleteChannel({channelId}) {
    Channels.remove(channelId);
  }

});