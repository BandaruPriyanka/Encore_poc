const {Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pageObjects/login.lighthouse.page');
const MoodChangePage = require("../pageObjects/lighthouse.moodchange.page");
const lighthouseData = require('../data/lighthouse.json');
const navigatorData = require("../data/navigator.json")
const { expect } = require('playwright/test');
const utilConst = require('../utility/const');


// Given(/^I am on the lighthouse login page$/,async () => {
// 	await global.page.goto(process.env.lighthouseUrl);
//     await global.page.waitForTimeout(parseInt(process.env.small_timeout));
// });

// When(/^I am login with a valid email and password$/, async () => {
// 	await LoginPage.login("s-tst-lhsautomation@psav.com","vj8#dm3k7FSNWgG//");
//     await global.page.waitForTimeout(parseInt(process.env.large_timeout));
// });


Then(/^I search for the room$/,async () => {
	await MoodChangePage.searchFunction(navigatorData.second_job_no);
});


Then(/^I click on the room see the mood change icon$/,async () => {
    await MoodChangePage.clickOnJobNo(navigatorData.second_job_no);
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
    // expect(await MoodChangePage.moodChangeIcon).toBeVisible();
    expect(await MoodChangePage.iconInPage(utilConst.Const.moodIconText)).toBeVisible();
});


Then(/^I click on the mood change icon mood modal is displayed$/,async () => {
	await MoodChangePage.clickOnMoodChangeIcon();
    await global.page.waitForTimeout(parseInt(process.env.small_max_timeout));
    expect(await MoodChangePage.moodChangeModal).toBeVisible();
});


Then(/^I click on happy icon and check the validations$/,async () => {
	await MoodChangePage.happyIconChecking();
    expect(await MoodChangePage.logMsg(utilConst.Const.happyLogMsg)).toBeVisible();
});


Then(/^I click on neutral icon and check the validations$/,async () => {
	await MoodChangePage.neutralIconChecking(navigatorData.second_job_no);
});

Then(/^I click on angry icon and check the validations$/,async () => {
	await MoodChangePage.angryIconChecking(navigatorData.second_job_no);
});



