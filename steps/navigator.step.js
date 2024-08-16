const { Given , When, Then } = require('@cucumber/cucumber');
require('dotenv').config();
const LoginPage=require('../pageObjects/login.navigator.page')
const NavigatorPage = require('../pageObjects/navigator.page')
const data = require('../data/navigator.json')

let navigatorPageInstance;
Given(/^I am on the navigator login page$/, async () => {
    await global.page.goto(data.navigatorUrl);
    await global.context.clearCookies();
    navigatorPageInstance = new NavigatorPage(global.page);  
});
 
When('I log in with a valid email and password', async() => {
    await LoginPage.login_navigator(atob(process.env.email),atob(process.env.password));
    const currentUrl = global.page.url();
    // await context.clearCookies();
    console.log(`Current page URL is: ${currentUrl}`);
});
 
When(`Create the new order`, async () => {
    await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
    await navigatorPageInstance.navigator(data.navigatorUrl);
    await global.page.waitForLoadState();
    // await global.page.waitForTimeout(8000);
    const currentUrl = global.page.url();
    console.log("navigated to navigator page")
    console.log(`Navigator page URL is: ${currentUrl}`);
    global.page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`Console error: ${msg.text()}`);
        }
    });
    await navigatorPageInstance.createOrder();
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout));
});
 
When(`Click on jobs`, async () => {
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
    await navigatorPageInstance.jobsPage();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
    await navigatorPageInstance.selectRooms();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
    // await navigatorPageInstance.changeJobStatus();
});
When(`Select the Items in the page`, async() => {
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
    await navigatorPageInstance.selectItems();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
});

Then(`Select the Labour items in the order`, async() => {
    await global.page.waitForTimeout(parseInt(process.env.small_timeout))
    await navigatorPageInstance.selectLabourItem()
});