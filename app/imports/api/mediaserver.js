import fs from 'node:fs';
import { WebApp } from 'meteor/webapp';
import express from 'express';

const app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// create directory for media files if it does not exist (recursively)
fs.mkdirSync(LOCAL_MEDIA_PATH, { recursive: true });
fs.mkdirSync(LOCAL_HLS_PATH, { recursive: true });

console.log("Serving media files from " + LOCAL_MEDIA_PATH);

app.use("/media", express.static(LOCAL_MEDIA_PATH));
app.use("/hls", express.static(LOCAL_HLS_PATH));

WebApp.connectHandlers.use(app);