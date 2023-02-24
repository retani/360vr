import { Meteor } from 'meteor/meteor';
import { Assets, Channels, Globals } from '/imports/api/collections';

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