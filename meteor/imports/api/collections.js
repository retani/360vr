import { Mongo } from 'meteor/mongo';

export const Channels = new Mongo.Collection('channels');

export const Globals = new Mongo.Collection('globals');

export const Assets = new Mongo.Collection('assets');
