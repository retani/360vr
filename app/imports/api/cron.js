import { Channels } from './collections';
import { transcodeLocalVideos, initTranscoding }  from '/imports/api/transcode';
import { MediaFiles } from '/imports/api/mediafileserver';

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

function onEncodeStart(id) {
  MediaFiles.update({_id: id}, {$set: {"meta.transcoder": "transcoding"}});
}

function onEncodeDone(id, sizeInBytes) {
  console.log("onEncodeDone", id, sizeInBytes);
  MediaFiles.update({_id: id}, {$set: {"meta.transcoder": "done"}});
  if (sizeInBytes) {
    MediaFiles.update({_id: id}, {$set: {"meta.transcodedSizeInBytes": sizeInBytes}});
  }
}

function onEncodeFail(id) {
  MediaFiles.update({_id: id}, {$set: {"meta.transcoder": "failed"}});
}

function manageTranscoding() {
  transcodeLocalVideos({
    onEncodeStart,
    onEncodeDone,
    onEncodeFail
  });
}

async function startCron() {
  Meteor.setInterval(Meteor.bindEnvironment(() => {
    checkForEndedAssets();
  }), 1000);

  await initTranscoding({
    onEncodeDone,
  })

  Meteor.setInterval(Meteor.bindEnvironment(() => {
    manageTranscoding();
  }), 5000);
  
}

export {
  startCron
}