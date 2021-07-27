//var http = require('http');
const express = require("express");
const puppeteer = require('puppeteer');
var videoShow = require('videoshow'),
    fs = require('fs'),
    path = require('path');

const app = express();
const port = 3000;

app.get("/", (requset, response) => {
  response.send("Send POST requset to start the process");



const takeScreenshot = async()=>{
  const browser = await puppeteer.launch();
  const page =await browser
  .newPage();
  const option={
    path: 'images/website.png',
    fullpage:true,
    omitBackground: true
  }
  await page.goto("https://www.google.com")
  await page.screenshot(option)
  await browser.close()


var images=["images/website.png"]
let videoOptions={
    loop:10,
    fps: 25,
    transition: true,
    transitionDuration: 1,
    videoBitrate: 1024,
    videoCodec:"libx264",
    size: "640x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
    path: "video/video.mp4"
};
videoShow(images,videoOptions)
.save(videoOptions.path)
.on('start', function(command){
    console.log("conversion started\t"+command)
})
.on('error',function(err,stdout,stderr){
    console.log("some error occures\t"+err)
})
.on('end',function(output){
    console.log("Conversion complited\t"+ output)
})
}

var filePath = path.join(__dirname, 'video.mp4');
fs.writeFileSync(path.resolve(__dirname, 'output.json'), JSON.stringify({file: filePath}));
//console.log("File Path\t"+filePath);
takeScreenshot();
});
// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})