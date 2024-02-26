import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Assets, Channels, Globals, Settings } from '/imports/api/collections';
import { defaultChannels, defaultAssets, channelTemplate, defaultSettings } from '/imports/api/seeds';
import { startCron }  from '/imports/api/cron';

import '/imports/api/env';
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

  // reset settings
  // remove all settings
  Settings.remove({});
  // insert default settings
  Settings.insert(defaultSettings);

  /*
  Meteor.setInterval(Meteor.bindEnvironment(() => {
    console.log(UserStatus.connections)
    UserStatus.connections.find().forEach(function(connection) {
      console.log("STATUS", connection);
    });
    Meteor.users.find().forEach(function(user) {
      console.log("USER", user);
    });
    console.log("\n\n")
  }), 1000);
  */

  require('/imports/api/mediaserver');

  startCron();

});

process.on('exit', () => {
  console.log("EXITING");
});

process.on('SIGTERM', () => {
  // catch reload
  console.log("SIGTERM");
  process.exit();
} );

process.on('uncaughtException', (err) => {
  console.log("UNCAUGHT EXCEPTION", err);
});


