const {Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pageObjects/login.lighthouse.page');
const LightHousePage = require('../pageObjects/lighthouse.page');
const navigatorData = require("../data/navigator.json")
const { expect } = require('playwright/test');
const lighthouseData = require('../data/lighthouse.json');
const atob = require('atob')
require("dotenv").config();
let beforeRoomCount , afterRoomCount

Given(/^I am on the lighthouse login page$/,async () => {
	await global.page.goto(process.env.lighthouseUrl);
	await global.context.clearCookies();
    await global.page.waitForTimeout(parseInt(process.env.small_timeout));
});

When(/^I am login with a valid email and password$/,async () => {
	await LoginPage.login(atob(process.env.lighthouseEmail),atob(process.env.lighthousePassword));
    await global.page.waitForTimeout(parseInt(process.env.large_timeout));
});

Then(/^I see the search input$/,async () => {
	await expect(LoginPage.searchInput).toBeVisible();
});


Then(/^I changed the location and search with invalid data$/, async () => {
	beforeRoomCount = await LightHousePage.roomsCount.textContent();
	await LightHousePage.changeLocation(lighthouseData.locationId);
	await LightHousePage.searchFunction(lighthouseData.invalidText);
	await global.page.waitForTimeout(parseInt(process.env.small_timeout)); 
	expect(await LightHousePage.noResultsPlaceholder).toBeVisible();
});

Then(/^I search with valid phrase and validate the result$/,async () => {
	await LightHousePage.searchFunction(navigatorData.second_job_no);
	await global.page.waitForTimeout(parseInt(process.env.small_timeout)); 
	expect(await LightHousePage.jobIdChecking(navigatorData.second_job_no)).toBeVisible();
});


Then(/^I change the date with the text phrase and check the search input$/,async () => {
	await LightHousePage.dateChangeChecking();
});


Then(/^I click on the cross icon previous flowsheet is restored$/, async () => {
	await LightHousePage.clickOnCrossButton();
	afterRoomCount = await LightHousePage.roomsCount.textContent();
	expect(beforeRoomCount).toEqual(afterRoomCount);
});


Then(/^I perform scrolling$/,async () => {
	await LightHousePage.scrollAction();
	await global.page.waitForTimeout(parseInt(process.env.small_timeout)); 

});


Then(/^I check search Case-insensitive$/,async () => {
	await LightHousePage.searchFunction(navigatorData.order_name.trim());
	const roomCount_lowerCase = await LightHousePage.roomsCount.textContent();
	await global.page.waitForTimeout(parseInt(process.env.small_timeout));
	await LightHousePage.clickOnCrossButton();
	await LightHousePage.searchFunction(navigatorData.order_name.toUpperCase().trim());
	const roomCount_upperCase = await LightHousePage.roomsCount.textContent();
	await global.page.waitForTimeout(parseInt(process.env.small_timeout));
	expect(roomCount_lowerCase).toEqual(roomCount_upperCase); 

});







