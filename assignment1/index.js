const puppeteer = require('puppeteer')

const takeScreenshot = async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options={
        path: 'images/website.png',
        fullPage:true,
        omitBackground:true
    }
    await page.goto("https://www.google.com")
    await page.screenshot(options)

    await browser.close()
}

takeScreenshot();