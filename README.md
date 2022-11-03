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
        audio
      end
    end

    subgraph Controller
      scenes
      assets
      players
    end

    meteor --- db
    meteor --- media
    
    meteor --- svelte
    audio --- janus
    hls --- streamer

    svelte --- threejs
    hls --- threejs

    svelte --- audio

    assets -.- media
    scenes -.- meteor
    players -.- svelte
    
```
