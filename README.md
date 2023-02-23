# 360vr

```mermaid

graph TD

    subgraph Services
      meteor
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
      channels
    end
    
    meteor ---- svelte
    janusaudio --- janus
    hls --- peertube

    svelte --- threejs
    hls --- threejs

    svelte --- janusaudio

    assets -.- peertube
    scenes -.- meteor
    players -.- svelte
    channels -.- players
    
    camera --- peertube
    
```

## Deploy

Prerequisites:
- a server with `docker` and  `docker compose`
- a domain name, example: `360vr.intergestalt.cloud`

1. set up DNS for subdomains
    - `360vr.intergestalt.cloud`
    - `*.360vr.intergestalt.cloud`
2. set up network for reverse proxy
    - `docker network create proxy`
3. configure variables in `.env`
    - `cd deploy`
    - `cp .env.example .env`
    - edit `.env`
4. start services
    - `cd deploy`
    - `docker compose build`
    - `docker compose up -d`
