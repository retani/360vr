import { Meteor } from 'meteor/meteor';
import './reset.css';
import './main.css';
import App from '../imports/ui/App.svelte';


Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});