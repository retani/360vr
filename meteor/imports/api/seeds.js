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

export const defaultAssets = [
  {
    type: 'video', // audio, video, image
    //locationType: 'url', // url, file
    name: '360 Video URL m3u8',
    url: "https://tube.kh-berlin.de/static/streaming-playlists/hls/5db24246-3f3b-4303-b472-8d851bfe3c6f/master.m3u8",
    hasVideo: true,
    hasAudio: true,
  },
  {
    type: 'janusaudio',
    name: 'Audio Conference 1',
    url: "wss://360vr.intergestalt.cloud",
    hasMicrophone: true,
    hasAudio: true,
  }

];