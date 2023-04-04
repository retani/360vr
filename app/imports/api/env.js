
LOCAL_MEDIA_PATH    = process.env.LOCAL_MEDIA_PATH
LOCAL_HLS_PATH      = process.env.LOCAL_MEDIA_PATH

// exit if the environment variables are not set
if (!LOCAL_MEDIA_PATH) {
  console.error("LOCAL_MEDIA_PATH is not set")
  process.exit(1)
}

if (!LOCAL_HLS_PATH) {
  console.error("LOCAL_HLS_PATH is not set")
  process.exit(1)
}

console.log("local_media_path:", LOCAL_MEDIA_PATH)
console.log("local_hls_path:", LOCAL_HLS_PATH)


