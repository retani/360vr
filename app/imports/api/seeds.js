export const defaultChannels = [
  {
    slug: 'goggle1',
    name: 'Goggle 1',
    type: 'headset',
  },
  {
    slug: 'goggle2',
    name: 'Goggle 2',
    type: 'headset',
  },
  {
    slug: 'goggle3',
    name: 'Goggle 3',
    type: 'headset',
  }
];

export const channelTemplate = {
  layers: []
}

export const defaultAssets = [
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Holger walk 360',
    url: "https://tube.kh-berlin.de/videos/watch/5db24246-3f3b-4303-b472-8d851bfe3c6f",
    hasVideo: true,
    hasAudio: false,
  },
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Amagamma 360',
    url: "https://tube.kh-berlin.de/videos/embed/6000af6b-13c2-4644-8315-6b6a6c6bc6c4",
    hasVideo: true,
    hasAudio: false,
  },
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Live Theta 360',
    url: "https://tube.kh-berlin.de/videos/embed/b35e7700-efc1-465c-9ed8-da11460aa13d",
    hasVideo: true,
    hasAudio: false,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 1 (1001)',
    url: "wss://janus.360vr.intergestalt.cloud",
    room: 1001,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 2 (1002)',
    url: "wss://janus.360vr.intergestalt.cloud",
    room: 1002,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 3 (1003)',
    url: "wss://janus.360vr.intergestalt.cloud",
    room: 1003,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 4 (1004)',
    url: "wss://janus.360vr.intergestalt.cloud",
    room: 1004,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'text',
    name: 'Welcome Text',
    text: 'Welcome to the 360° VR Demo',
    hasImage: true,
  },
];