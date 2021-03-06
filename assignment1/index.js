const express = require("express");
const puppeteer = require("puppeteer");
const videoShow = require("videoshow");
const bParser=require("body-parser").json();
const app = express();

    //8080 - address of the port on which the host server is listening for requests.
const nPort = 8080;
const path = require("path");
   
    // video options
const videoOptions = {
        fps: 25,
        loop: 10,
        transition: false,
        videoBitrate: 1024,
        videoCodec: "libx264",
        size: "640x?",
        format: "mp4",
        pixelFormat: "yuv420p",
        name: "video.mp4"
    };

    // screenshot the website
const option={
      screenshotName: "website.png",
      path: "website.png", 
      fullPage: true, 
      omitBackground: true
    };

// asynchronous methods - make screenshot and convert to MP4 
const converting = async(req,res)=>{
  console.log("Process started");

  // get url from post request
  const url = req.body.url; 

  // used the launch() method to create a browser instance
  const browser = await puppeteer.launch(); 

  // used the newPage() method on the browser object to get the page object
  const page = await browser.newPage(); 

  // call the goto() method on the page object to load that page
  await page.goto(url); 

  // meke screenshot
  await page.screenshot(option);

  // call the close() method on page to close the website
  await page.close();

  // call the close() method to close the browser
  await browser.close(); 

  // convert screenshot to MP4
  videoShow([option.screenshotName], videoOptions) 
    
  // save the output as "video.mp4"
  .save(videoOptions.name) 
    .on('start', function(command){
      console.log("Conversion started\t"+command)
    })
    .on("error", function (err) {
      console.error("Some error occures:\t ", err);
    })
    .on('end',function(output){
      console.log("Conversion complited\t"+ output)
    });

  //  path.join([...paths]) -> Returns: <string> use for saving the path
  const filePath = path.join(__dirname, videoOptions.name); 
  
  // send the result
  res.send({ file: filePath }); 
}

// representation of the specified resource
// res: From Server to Client
// req : From Client to Server
app.get("/", (req, res) => {
  res.send("Get Request Called");
});

//  submits data to be processed to the identified resource.
app.post("/",bParser,async(req, res) => {
  try {
    // asynchronous methods - line 34
    converting(req,res);
  } catch (error) {
    console.log("Some error occures: " + error.message);
  };
});

//  bind and listen the connections on the specified host and port
app.listen(nPort, () => {
  console.log(`http://localhost:${nPort}`);
});