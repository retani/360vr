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

## How to enable microphone permissions

### Oculus Browser

- ![Oculus Browser Permissions - Page](./docs/oculus-browser-permissions-1.jpg)
- ![Oculus Browser Permissions - App](./docs/oculus-browser-permissions-2.jpg)
- ![Oculus Browser Permissions - App](./docs/oculus-browser-permissions-3.jpg)

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
    - edit `.env
4. configure janus
    - set public ip in `nat_1_1_mapping` in `janus/etc/janus/janus.jcfg.live`, see https://towardsaws.com/setting-up-janus-webrtc-on-aws-a8aa8914b0c6`
5. start services
    - `cd deploy`
    - `docker compose build`
    - `docker compose up -d`

### optional: use coturn

In order to be independent from google you can setup your own TURN server:

```
docker run -d --network=host \
           -e DETECT_EXTERNAL_IP=yes \
           -e DETECT_RELAY_IP=yes \
           coturn/coturn \
           -n --log-file=stdout
```

and adjust 2 lines in `janus/etc/janus/janus.jcfg.live`

### add media

copy media into `./data/media`

#### HLS

HLS versions will be generated on restart

## Development

requirements:
- `meteorjs`

```bash
cd app
cp .env.example .env
# edit .env
meteor npm install
npm run dev
```

notes:
- LOCAL_MEDIA_PATH and LOCAL_HLS_PATH need to be absolute paths
