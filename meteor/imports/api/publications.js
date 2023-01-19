import { Meteor } from 'meteor/meteor';
import { Assets, Channels, Globals } from '/imports/api/collections';

Meteor.publish('channels.all', function () {
  console.log("Publishing channels");
  return Channels.find();
})

Meteor.publish('assets.all', function () {
  console.log("Publishing assets");
  return Assets.find();
})