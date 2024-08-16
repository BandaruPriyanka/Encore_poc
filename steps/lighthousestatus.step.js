const {Given, When, Then } = require('@cucumber/cucumber');
const {expect}=require('@playwright/test')
require("dotenv").config();
const lightLoginPage=require('../pageObjects/login.lighthouse.page')
const flowSheetStatus=require('../pageObjects/lighthouse.status.page');
const data= require('../data/navigator.json')

Given(`I am on the lighthouse page login`, async() => {
    await global.page.goto(process.env.lighthouseUrl);
    await global.context.clearCookies();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
});
When(`Login with valid email id and password`, async() => {
    await lightLoginPage.login("s-tst-lhsautomation@psav.com","vj8#dm3k7FSNWgG//")
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
});
Then(`Search the job number for details`, async() => {
    await flowSheetStatus.searchJobNumber(data.second_job_no)
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
});

Then(`Hover on the flowsheet card`, async() => {
    const areDisplayedBoth = await flowSheetStatus.isStatusGroupIconsDisplayed()
    console.log('Are Status and Group Button Icons Displayed:', areDisplayedBoth);  
    expect(areDisplayedBoth).toBeTruthy();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
    await flowSheetStatus.setStatus();
});

Then(`Reload the page and check the status is save`, async() => {
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
    await global.page.reload();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
    await flowSheetStatus.searchJobNumber(data.second_job_no)
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
    await flowSheetStatus.checkSavedStatus();
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
});

Then(`Check the selected date should equal to current date`, async() => {
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
    await flowSheetStatus.searchJobNumber(data.second_job_no)
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
    await flowSheetStatus.checkSelectedDate();
});