MEDIASERVER_ADDRESS = process.env.MEDIASERVER_ADDRESS || "http://localhost:3000"
MEDIASERVER_PATH    = process.env.MEDIASERVER_PATH || "media/"
LOCAL_MEDIA_PATH    = process.env.LOCAL_MEDIA_PATH || "/Users/holger/Documents/Projekte/360vr/code/360vr/data/media/"
LOCAL_HLS_PATH      = process.env.LOCAL_MEDIA_PATH || "/Users/holger/Documents/Projekte/360vr/code/360vr/data/hls/"

console.log("mediaserver_address:", MEDIASERVER_ADDRESS)
console.log("mediaserver_path:", MEDIASERVER_PATH)
console.log("local_media_path:", LOCAL_MEDIA_PATH)
console.log("local_hls_path:", LOCAL_HLS_PATH)


