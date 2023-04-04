import {Transcoder} from 'simple-hls'
import fs from 'node:fs';
import path from 'node:path';

const sourceDir     = process.env.LOCAL_MEDIA_PATH
const outputBaseDir = process.env.LOCAL_HLS_PATH


async function transcodeSomething (source, outputDir) {
    //Create a new instance of the transcoder
    //First Parameter is the path to the video that you want to transcode
    //Second Parameter is the path to the folder/directory you would like the HLS Files Saved
    //Third Parameter is an optional options object

    const doneFile = path.join(outputDir,'done')

    // create output folder if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // check if the video is already transcoded
    if (fs.existsSync(doneFile)) {
        console.log('Video already transcoded', source);
        return;
    }

    const t = new Transcoder(source, outputDir, {showLogs: false});

    try {
        console.log('Transcoding Video', source, "to", outputDir)
        const hlsPath = await t.transcode();
        console.log('Successfully Transcoded Video', hlsPath);
        // create a file "done" to indicate that the transcoding is done
        // this is used by the web app to know when to start playing the video
        fs.writeFileSync(doneFile, '');
        
    } catch(e){
        console.log('Something went wrong');
    }
    
}


const transcodeLocalVideos = async () => {
    // get a list of all videos in the source directory
    const files = fs.readdirSync(sourceDir);

    const videos = files.filter(file => {
        const ext = path.extname(file);
        return ext === '.mp4' || ext === '.mkv' || ext === '.avi';
    });

    // transcode the videos one by one
    for (const video of videos) {
        const source = path.join(sourceDir, video);
        const subdir = video
        const outputDir = path.join(outputBaseDir, subdir);
        await transcodeSomething(source, outputDir);
    }
}

export {
    transcodeLocalVideos
}