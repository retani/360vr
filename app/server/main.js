import { Meteor } from 'meteor/meteor';
import { Assets, Channels, Globals } from '/imports/api/collections';
import { defaultChannels, defaultAssets, channelTemplate } from '/imports/api/seeds';

import '/imports/api/methods';
import '/imports/api/publications';

Meteor.startup(async () => {

  // populate globals
  if (Globals.find({"name":"show_labels"}).count() == 0) {
    Globals.insert({"name":"show_labels", "value":true})
  }

  // populate channels
  if (Channels.find().count() === 0) {
    console.log("Seeding channels");
    for (let channel of defaultChannels) {
      Channels.insert({
        ...channelTemplate,
        ...channel
      });
    }
  }

  // populate assets
  if (Assets.find().count() === 0) {
    console.log("Seeding assets");
    for (let asset of defaultAssets) {
      Assets.insert(asset);
    }
  }
});
