 //All fields in each object are REQUIRED... There is no minimum or maximum amount of renditions that you can have.

export const renditions = [
  {
    width: 320,
    height: 180,
    profile: 'main',
    hlsTime: '5',
    bv: '360k',
    maxrate: '400k',
    bufsize: '1000k',
    ba: '32k',
    ts_title: '180p',
    master_title: '180p'
  },  
  /*  {
    width: 480,
    height: 270,
    profile: 'main',
    hlsTime: '6',
    bv: '500k',
    maxrate: '556k',
    bufsize: '1200k',
    ba: '32k',
    ts_title: '270p',
    master_title: '270p'
  },*/
  {
    width: 640,
    height: 360,
    profile: 'main',
    hlsTime: '5',
    bv: '800k',
    maxrate: '856k',
    bufsize: '1200k',
    ba: '48k',
    ts_title: '360p',
    master_title: '360p'
  },
  {
    width: 800,
    height: 450,
    profile: 'main',
    hlsTime: '5',
    bv: '1400k',
    maxrate: '1498k',
    bufsize: '2100k',
    ba: '96k',
    ts_title: '450p',
    master_title: '450p'
  },
  {
    width: 1280,
    height: 720,
    profile: 'main',
    hlsTime: '5',
    bv: '2800k',
    maxrate: '2996k',
    bufsize: '4200k',
    ba: '128k',
    ts_title: '720p',
    master_title: '720p' 
  },
  {
    width: 1920,
    height: 1080,
    profile: 'main',
    hlsTime: '5',
    bv: '5000k',
    maxrate: '5350k',
    bufsize: '7500k',
    ba: '128k',
    ts_title: '1080p',
    master_title: '1080p'
  }
];