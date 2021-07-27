const puppeteer = require('puppeteer');
var videoShow = require('videoshow')

const takeScreenshot = async()=>{
  const browser = await puppeteer.launch();
  const page =await browser.newPage();
  const option={
    path: 'images/website.png',
    fullpage:true,
    omitBackground: true
  }
  await page.goto("https://www.google.com")
  await page.screenshot(option)
  await browser.close()


var images=["images/website.png"]
var videoOptions={
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
};
videoShow(images,videoOptions)
.save("slideshow.mp4")
.on('start', function(command){
    console.log("conversion started"+command)
})
.on('error',function(err,stdout,stderr){
    console.log("some error occures"+err)
})
.on('end',function(output){
    console.log("Conversion complited"+output)
})
}

takeScreenshot();
