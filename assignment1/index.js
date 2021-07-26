const puppeteer = require('puppeteer');
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
}

takeScreenshot();