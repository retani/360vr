export const defaultChannels = [
  {
    slug: 'channel1',
    name: 'Channel 1',
    type: 'headset',
  },
];

export const channelTemplate = {
  layers: []
}

export const defaultAssets = [
  {
    type: 'text',
    name: 'Welcome Text',
    text: 'Welcome to the 360° VR Demo',
    hasImage: true,
  },
]

export const defaultSettings = {
  debugScreen: false,
}

const exampleAssets = [
  /*{
    type: 'scene', // audio, video, image
    //locationType: 'url', // url, file
    name: 'night glb',
    url: "/media/night.glb",
    hasVideo: true,
    hasAudio: false,
  },*/
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Mary (local HLS)',
    url: "/hls/mary.mp4/index.m3u8",
    hasVideo: true,
    hasAudio: true,
  },
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Streeet (local HLS)',
    url: "/hls/street.mp4/index.m3u8",
    hasVideo: true,
    hasAudio: true,
  },
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: 'Earth (local HLS)',
    url: "/hls/earth.mp4/index.m3u8",
    hasVideo: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 1 (1001)',
    url: "wss://janus.360.igst.cloud",
    room: 1001,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 2 (1002)',
    url: "wss://janus.360.igst.cloud",
    room: 1002,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 3 (1003)',
    url: "wss://janus.360.igst.cloud",
    room: 1003,
    apisecret: "secret",
    hasMicrophone: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 4 (1004)',
    url: "wss://janus.360.igst.cloud",
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