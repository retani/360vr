# 360vr

```mermaid

graph TD

    subgraph Containers
      acebase
      janus
      peertube
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
