const {Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber')
const LoginPage = require('../pageObjects/login.page')
const CompassPage = require('../pageObjects/opportunity.page')
const { expect } = require("@playwright/test");
const data = require('../data/opportunity.json')
const atob = require('atob')
require("dotenv").config();
setDefaultTimeout(60000);

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open(process.env.baseUrl)
    await global.context.clearCookies();
});

When(/^I login with email and password$/,async () => {
	await LoginPage.login(atob(process.env.email),atob(process.env.password));
    await global.page.waitForTimeout(parseInt(process.env.large_timeout));
});


Then(/^I see the profile button$/,async () => {
    await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
	await expect(LoginPage.profileButton).toBeVisible();
});


Then(/^I click on compass$/,async () => {
    await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
	await CompassPage.clickOnCompass();
    await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
});

Then(/^I create new oppurtunity$/,async () => {
    await CompassPage.clickOnCopilot();
    await expect(CompassPage.opportunityElement).toBeVisible();
	await CompassPage.createOpportunity(data.estRevenue,data.endUserAccount,data.endUserContact,data.venue,data.centerName);
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
});

Then(/^I click on plus button to navigation$/,async () => {
	await CompassPage.clickOnPlusButton(atob(process.env.email),atob(process.env.password));
    await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
});




