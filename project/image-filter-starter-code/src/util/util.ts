import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files

// function modified because it kept throwing errors
export async function deleteLocalFiles(localDirectory: string) {

    //First us the fs functionality to read list of files
    fs.readdir(localDirectory, (err, files) => {
        if (err)
            console.log(err);
        else {

    //delete files from directory
            files.forEach(file => {
                fs.unlink(localDirectory + file, err => {
                    if (err) throw err;
                });
            })

        }
    })

}