const puppeteer = require('puppeteer');

module.exports.load = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    try {
        const page = await browser.newPage();
        try {
            // Constrain loading time to 20 seconds
            await page.goto(url, {waitUntil: 'networkidle2', timeout: 20000});
            await page.waitFor(10000);
        } catch (e) {
        }

        const html = await page.content();
        // page._client.send('Page.stopLoading');

        await browser.close();
        return html;
    } catch (error) {
        
        await browser.close();
        return null;
    }
}
