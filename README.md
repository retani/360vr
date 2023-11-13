# 360vr 

360vr is a system to control 360° Videos on multiple devices simulatenously and connect them via live audio conference rooms.

Features:
- Sync videos on multiple clients
- Remotely start, pause and stop videos
- Supports 360° videos on VR goggles
- Auto re-sync when connection is lost
- Videos adapt to bandwidth via HLS streaming
- Connect individual clients with live audio conferences
- Audio conferences powered by janusaudio

## Demo

There is a demo instance running at [360.igst.cloud](https://360.igst.cloud)

## License

The software is MIT licenced and open source. Anybody may use it, there is no liability.

## How to use

In oder to use it, you need to set up you own 360vr server and connect it to a web domain.

Once set up, you can upload your assets: videos, images, text. Videos are automatically transcoded into several HLS versions.

In the web interface, you can set up several independent channels to play the media. Each channel generates a URL for the lients to connect to. Many clients can connect to each channel.

Clients are web browsers, typically inside VR headsets (Oculus browser, etc). Your audience needs to open the cannnel URL in the browser. You can see who is connected in the admin interface.

Once the clients are connected, you can control the video and audio conference channels in the admin interface. Clients can choose to view the videos in immersive mode at will.

## Docs

- [Server Setup](docs/server_setup.md)
- [Admin Interface](docs/admin_interface)
- [Clients Guide](docs/clients_guide.md)
