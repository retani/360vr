import { Meteor } from 'meteor/meteor';
import { UserStatus } from 'meteor/mizzao:user-status';
import { Assets, Channels, Globals, Events, Files, Settings } from '/imports/api/collections';

// all channels
Meteor.publish('channels.all', function () {
  console.log("Publishing channels");
  return Channels.find();
})

// get one channel by slug
Meteor.publish('channel', function (slug) {
  console.log("Publishing channel " + slug);
  return Channels.find({slug});
})

// list of channels with features for players
Meteor.publish('channels.list', function () {
  console.log("Publishing channel list");
  return Channels.find({}, {fields: {slug: 1, name: 1}});
})

// all assets
Meteor.publish('assets.all', function () {
  console.log("Publishing assets");
  return Assets.find();
})

// UserStatus
Meteor.publish('userStatus.all', function () {
  return UserStatus.connections.find();
});

// recent events
Meteor.publish('events.recent', function ({limit = 10}) {
  return Events.find({}, {sort: {createdAt: -1}, limit});
});

// files
Meteor.publish('files.all', function () {
  return filesCollection.find().cursor;
});

// current settings
Meteor.publish('settings.current', function () {
  return Settings.find({}, {limit: 1});
});