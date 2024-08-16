const { expect } = require("playwright/test");
const data = require("../data/lighthouse.json")
const navigatorData = require("../data/navigator.json")
require("dotenv").config();

class LightHousePage {

    get searchInput() {
        return global.page.locator("//input[@name='search-field']");
    }

    get noResultsPlaceholder() {
        return global.page.locator("//span[text()=' No results match your filter settings ']");
    }

    get locationDiv() {
        // return global.page.locator("(//button[@type='button'])[1]/following-sibling::div");
        return global.page.locator("//app-header//button/following-sibling::div");
    }

    get searchLocation() {
        return global.page.locator("//input[@placeholder='Search location']");
    }

    get selectLocation() {
        return global.page.locator("//span[text()=' 1137-Hotel Del Coronado ']");
    }

    jobIdChecking(jobId) {
        return global.page.locator(`//span[text()=' #`+jobId+` ']`)
    }

    dateElement(date) {
        return global.page.locator(`//span[text()='`+date+`']`)
    }

    get roomsCount() {
        return global.page.locator("//div[text()=' Rooms ']/following-sibling::div");
    }

    get crossButton() {
        return global.page.locator("//icon[@name='cross_line']");
    }

    async changeLocation(locationId) {
        await this.locationDiv.click();
        await this.searchLocation.fill(locationId);
        await this.selectLocation.click();
    }


    async searchFunction(searchText) {
        await this.searchInput.fill(searchText);
    }

    async dateChangeChecking() {
        const inputValueBeforeDateChange = await this.searchInput.inputValue();
        const today = new Date();
        const nextDayDate = (today.getDate() + 1).toString().padStart(2, "0"); 
        await this.dateElement(nextDayDate).click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        const inputValueAfterDateChange = await this.searchInput.inputValue();
        expect(inputValueAfterDateChange).toEqual(inputValueBeforeDateChange);
        const todayDate = (today.getDate()).toString().padStart(2, "0");
        await this.dateElement(todayDate).click();
    }

    async clickOnCrossButton() {
        await this.crossButton.click();
    }

    async scrollAction() {
        const div = await global.page.$("//div[@class='flex']/child::div[1]");
        await global.page.evaluate(div => {
            div.scrollTop = div.scrollHeight;
        }, div);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await div.evaluate(div => {
            div.scrollTop = 0;
        });
    }

}
module.exports = new LightHousePage();