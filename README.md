# 360vr

```mermaid

graph TD

    subgraph Server
      meteor
      db
      media
      janus
      streamer
    end

    subgraph Client
      svelte
      hls
      subgraph Interface
        threejs
        janusaudio
      end
    end

    subgraph Controller
      scenes
      assets
      players
    end

    meteor --- db
    meteor --- media
    
    meteor ---- svelte
    janusaudio --- janus
    hls --- streamer
    streamer --- media

    svelte --- threejs
    hls --- threejs

    svelte --- janusaudio

    assets -.- media
    scenes -.- meteor
    players -.- svelte
    
    camera --- streamer
    
```
