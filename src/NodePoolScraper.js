'use strict';

const EventEmitter = require('events');

const createPuppeteerPool  = require('./PuppeteerPool');

class NodePoolScraper {
  constructor({
    max, 
    min, 
    idleTimeoutMillis = 30000,
    puppeteerArgs = [],
    ...otherOptions
  }) {
    this.pool = createPuppeteerPool({
      max,
      min,
      idleTimeoutMillis,
      maxUses: 50,
      validator: () => Promise.resolve(true),
      testOnBorrow: true,
      puppeteerArgs: ['--disable-dev-shm-usage', ...puppeteerArgs],
      ...otherOptions
    });

    this.scraperEvents = new EventEmitter();

    this.main();
  }

  addTarget(payload) {
    this.scraperEvents.emit('addTarget', payload);
  }

  main() {
    this.scraperEvents.on('addTarget', ({ url, func, ...rest }) => {
      this.pool.use(async (browser) => {
        await func({ url, browser, ...rest });
      });
    });
  }

  clear() {
    this.pool.drain().then(() => {
      this.pool.clear();
      console.log('Pool cleared');
    })
  }
}

module.exports = NodePoolScraper;
