'use strict';

const NodePoolScraper = require('../src/NodePoolScraper');

const scraper = new NodePoolScraper({
  max: 1, 
  min: 1,
  headless: false
});

async function logScript({ url, browser, anotherValue }) {
  try {
    console.log(anotherValue);

    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const content = await page.content();

    console.log('other', content);
  }
  catch (error) {
    console.error(error);
  }
}

scraper.addTarget({
  url: 'http://engine.presearch.org',
  func: async ({ url, browser }) => {
    try {
      const page = await browser.newPage();
      const status = await page.goto(url);

      if (!status.ok) {
        console.error(`Cannot open ${url}`);
        throw new Error();
      }

      const content = await page.content();

      scraper.addTarget({ url: 'http://google.com', func: logScript, anotherValue: true });

      console.log('Presearch', content);
    }
    catch (error) {
      console.error(error);
    }
  }
});

// scraper.clear();