# 360vr

```mermaid

graph TD

    subgraph Services
      acebase
      janus
      peertube
    end

    subgraph App
      svelte
      hls
      subgraph Interface
        threejs
        janusaudio
      end
    end

    subgraph Admin
      scenes
      assets
      players
      groups
    end
    
    acebase ---- svelte
    janusaudio --- janus
    hls --- peertube

    svelte --- threejs
    hls --- threejs

    svelte --- janusaudio

    assets -.- peertube
    scenes -.- acebase
    players -.- svelte
    groups -.- players
    
    camera --- peertube
    
```
