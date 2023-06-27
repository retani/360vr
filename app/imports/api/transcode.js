import {Transcoder} from 'simple-hls'
import fs from 'node:fs';
import path from 'node:path';
import { renditions } from './transcoder-renditions.js';

const sourceDir     = process.env.LOCAL_MEDIA_PATH
const outputBaseDir = process.env.LOCAL_HLS_PATH

const doneFileName = 'done'

let transcoding = false

function filterVideos(file) {
    const ext = path.extname(file);
    return ['.mp4', '.mov', '.avi', '.mkv', '.webm'].includes(ext);
}

function getDirectorySize(outputDir) {
    // get size of all files in the directory
    const files = fs.readdirSync(outputDir);
    const fileSizeInBytes = files.reduce((acc, file) => {
        const stats = fs.statSync(path.join(outputDir, file));
        return acc + stats.size;
    }, 0);
    return fileSizeInBytes
}

async function transcodeSomething (source, outputDir,{onEncodeStart=null, onEncodeDone=null, onEncodeFail=null}={}) {
    //Create a new instance of the transcoder
    //First Parameter is the path to the video that you want to transcode
    //Second Parameter is the path to the folder/directory you would like the HLS Files Saved
    //Third Parameter is an optional options object

    const doneFile = path.join(outputDir, doneFileName)

    // create output folder if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // check if the video is already transcoded
    if (fs.existsSync(doneFile)) {
        //console.log('Video already transcoded', source);
        return;
    }

    const t = new Transcoder(source, outputDir, {showLogs: false, renditions});

    try {
        console.log('Transcoding Video', source, "to", outputDir)
        if (onEncodeStart) onEncodeStart(path.parse(source).name)
        const hlsPath = await t.transcode();
        console.log('Successfully Transcoded Video', hlsPath);
        // create a file "done" to indicate that the transcoding is done
        // this is used by the web app to know when to start playing the video
        fs.writeFileSync(doneFile, '');
        const fileSizeInBytes = getDirectorySize(outputDir)
        if (onEncodeDone) onEncodeDone(path.parse(source).name, fileSizeInBytes)
        
    } catch(e){
        console.log('Something went wrong white transcoding', source, e);
        if (onEncodeFail) onEncodeFail(path.parse(source).name, e)
    }

}


const transcodeLocalVideos = async (options) => {
    if (transcoding) {
        return;
    }
    transcoding = true

    // get a list of all videos in the source directory
    const files = fs.readdirSync(sourceDir);

    const videos = files.filter(filterVideos);

    // transcode the videos one by one
    for (const video of videos) {
        const source = path.join(sourceDir, video);
        const subdir = video
        const outputDir = path.join(outputBaseDir, subdir);
        await transcodeSomething(source, outputDir, options);
    }

    transcoding = false
}

function initTranscoding({onEncodeStart=null, onEncodeDone=null, onEncodeFail=null}={}) {
    if (transcoding) {
        console.log('Already transcoding, skipping');
        return;
    }

    // get a list of all videos in the source directory
    const files = fs.readdirSync(sourceDir);

    const videos = files.filter(filterVideos);

    // check transcoded directory for each video
    for (const video of videos) {
        const source = path.join(sourceDir, video);
        const subdir = video
        const outputDir = path.join(outputBaseDir, subdir);
        // check if done file exists
        const doneFile = path.join(outputDir, doneFileName)
        if (fs.existsSync(doneFile)) {
            const fileSizeInBytes = getDirectorySize(outputDir)
            onEncodeDone(path.parse(source).name, fileSizeInBytes)
        } 
    }

}

function cancelTranscoding() {
    // note: running transcoders will continue in the background (which is stpid)
    transcoding = false
}

function removeHlsFolder(filename) {
    const subdir = filename
    const outputDir = path.join(outputBaseDir, subdir);
    if (fs.existsSync(outputDir)) {
        fs.rmdirSync(outputDir, { recursive: true });
    }
}

export {
    initTranscoding,
    transcodeLocalVideos,
    cancelTranscoding,
    removeHlsFolder
}