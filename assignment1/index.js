const express = require("express"),
      puppeteer = require('puppeteer'),      
      videoShow = require('videoshow'),
      config = require('./input.json'),
      fs = require('fs'),
      path = require('path'),
      app = express(),
      port = 3000;
      


      

app.get("/", (requset, response) => {
  response.send("In process...");

const takeScreenshot = async()=>{
  const browser = await puppeteer.launch();
  const page =await browser
  .newPage();
  const option={
    path: 'images/website.png',
    fullpage:true,
    omitBackground: true
  }
  await page.goto(config.url)
  await page.screenshot(option)
  await page.close()
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
  console.log(`http://localhost:${port}`)
})