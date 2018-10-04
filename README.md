# node-pool-scraper
Node.js web scraping utility powered by puppeteer pool

## Install
`$ npm install --save node-pool-scraper`

## Usage

Import 
```
const NodePoolScraper = require('node-pool-scraper');
// import NodePoolScraper from 'node-pool-scraper';
```

Create new scraping pool
```
const scraper = new NodePoolScraper({
  max: 10, // max puppeteer instances
  min: 1 // min puppeteer instances
  idleTimeoutMillis: 30000, // idle timeout (default 30000)
  puppeteerArgs: [] // puppeteer args (default ['--disable-dev-shm-usage']),
  ...otherPuppeteerOptions
});
``` 

Add scrape targets
```
scraper.addTarget({
  url: 'http://google.com',
  func: async ({ url, browser }) => {
    try {
      const page = await browser.newPage();
      const status = await page.goto(url);

      if (!status.ok) {
        console.error(`Cannot open ${url}`);
        throw new Error();
      }

      const content = await page.content();

      // Add another target
      // scraper.addTarget({ url: 'http://google.com', func: anotherScript });

      console.log('Google content: ', content);
    }
    catch (error) {
      console.error(error);
    }
  }
});
```

Destroy the pool
```
scraper.clear();
```

## Example
```
const NodePoolScraper = require('node-pool-scraper');

const scraper = new NodePoolScraper({
  max: 10, 
  min: 1
});

// Add scrape target
scraper.addTarget({
  url: 'http://google.com',
  func: async ({ url, browser }) => {
    try {
      const page = await browser.newPage();
      const status = await page.goto(url);

      if (!status.ok) {
        console.error(`Cannot open ${url}`);
        throw new Error();
      }

      const content = await page.content();

      // Add another target
      // scraper.addTarget({ url: 'http://google.com', func: anotherScript });

      console.log('Google content: ', content);
    }
    catch (error) {
      console.error(error);
    }
  }
});

// Destroy the pool
scraper.clear();
```
