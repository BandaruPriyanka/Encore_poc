const { Before, AfterAll, AfterStep, Status, BeforeAll,After } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const page = require('@playwright/test');
const fs = require('fs');

setDefaultTimeout(120 * 1000);
let isFeaturePassed = true;


BeforeAll({ timeout: 120 * 1000 }, async () => {
  let browser = await page.chromium.launch({ headless: true });
  global.browser = browser;
  // global.context = await browser.newContext();
  // global.page = await global.context.newPage();
});

AfterAll(async () => {
  if (global.browser) {
    await global.browser.close();
  }
});

Before(async () => {
  global.context = await browser.newContext();
  global.page = await global.context.newPage();
  if (!isFeaturePassed) {
    return 'skipped';
  }
})

After(async function ({ result }) {
  if (result.status === Status.FAILED) {
    try {
      const timestamp = Date.now();
      const folderPath = './failureScreenshots'; // Specify the folder path
      const screenshotPath = `${folderPath}/screenshot-${timestamp}.png`; // Updated path
      await global.page.screenshot({ path: screenshotPath });
      this.attach(fs.readFileSync(screenshotPath), 'image/png');
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }

  if (global.page) {
    await global.page.close();
  }

});

