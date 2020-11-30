import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage', async (req: Request, res: Response) => {

    //unpack the query into an object
    let imageBody = req.query;

    //check if a url was supplied
    console.log(req.query);
    console.log(imageBody);
    if (!imageBody.image_url) {
      return res.status(400).send('Please provide and image url');
    }
    //check that the url points to an image format supported by jimp
    const supportedFormats: string[] = ['.jpeg', 'jpg', '.png', '.bmp', '.tiff', '.gif'];

    //initialize checks
    let isSupported: boolean = false;
    let i: number = 0;

    for (i = 0; i < supportedFormats.length; i++) {
      if (imageBody.image_url.includes(supportedFormats[i])) {
        isSupported = true;
        break;
      }
    }
    //if the image is not supported, inform the user
    if (!isSupported) {
      return res.status(415).send('That url doesn\'t point to a supported image format.');

    }
    //break off the url from the object
    const url: string = imageBody.image_url;
    const filteredpath: string = await filterImageFromURL(url);
    console.log('print this');

    console.log(filteredpath)

    //if the request is successful, return the image
    res.status(200).sendFile(filteredpath);

    let toDelete: string[];

    //fs.readdir(filteredpath)

});
// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  console.log('Run that code');
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
}) ();