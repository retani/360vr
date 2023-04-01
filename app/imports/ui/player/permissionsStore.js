import { writable } from 'svelte/store';

function createPermissionStore(property) {
  const store = writable(null);
  
  navigator.permissions
    .query({ name: property })
    .then((permissionStatus) => {
      store.set(permissionStatus.state);
      console.log(`${property} permission status is ${permissionStatus.state}`);
      permissionStatus.onchange = () => {
        store.set(permissionStatus.state);
        console.log(
          `${property} permission status has changed to ${permissionStatus.state}`
        );
      };
    });

  return store;
}

export function promptMicrophonePermission() {
  // ask user for microphone  permission
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // got permission
      console.log('got microphone permission');
    })
    .catch((err) => {
      // no permission
      console.log('no microphone permission');
    }
  );
  
}

// https://developer.mozilla.org/en-US/docs/Web/API/Permissions

export const microphonePermission = createPermissionStore('microphone');
