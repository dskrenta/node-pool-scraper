'use strict';

const NodeScraper = require('../src/NodeScraper');

const scraper = new NodeScraper({
  max: 1, 
  min: 1
});

async function logScript({ url, browser }) {
  try {
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

      scraper.addTarget({ url: 'http://google.com', func: logScript });

      console.log('Presearch', content);
    }
    catch (error) {
      console.error(error);
    }
  }
});

// scraper.clear();