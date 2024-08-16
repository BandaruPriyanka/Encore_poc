const { expect } = require("playwright/test");
require("dotenv").config();
const lighthouseData = require("../data/lighthouse.json");
const utilConst = require('../utility/const');


class MoodChangePage {
    get searchInput() {
        return global.page.locator("//input[@name='search-field']");
    }

    get firstRoomDiv() {
        return global.page.locator("(//div[@class='mat-mdc-tab-body-wrapper'])[1]/child::mat-tab-body[1]/div/descendant::app-flowsheet-action-card");
    }

    jobIdElement(jobId) {
        return global.page.locator(`//span[text()=' #`+jobId+` ']`)
    }


    get moodChangeModal() {
        // return global.page.locator("//div[@id='cdk-overlay-2']/mat-bottom-sheet-container/app-room-mood-chooser/div");
        return global.page.locator("//span[text()='Comment']");
    }

    get happyIconInModal() {
        // return global.page.locator("(//icon[@class='text-green-500'])[3]");
        return global.page.locator(" //app-room-mood-chooser/div/div[1]/div[1]//icon");
    }

    get submitButton() {
        return global.page.locator("//span[text()=' Submit ']");
    }

    iconInPage(iconText) {
        // return global.page.locator(`(//icon[@class='`+iconText+`'])[2]`);
        return global.page.locator(`//app-flowsheet-detail/div[1]/div[1]//app-mood-icon/icon[@class='`+iconText+`']`)
    }

    get logButton() {
        return global.page.locator("//div[contains(text(),'Log')]");
    }

    logMsg(logmsg) {
        return global.page.locator(`//div[contains(text(),'`+logmsg+`')]`);
    }

    get neutralIconInModal() {
        return global.page.locator("//icon[@class='text-yellow-500']");
    }

    get commentBoxInput() {
        return global.page.locator("//span[text()='Comment']//following-sibling::textarea");
    }

    get bellIcon() {
        return global.page.locator("//icon[@name='bell_notification_line']");
    }

    MoodNotification(comment) {
        //app-notification[1]/div/div[1]/following-sibling::div[contains(text(),'I am in neutral mood')]
        return global.page.locator(`//app-notification[1]/div/div[1]/following-sibling::div[contains(text(),'`+comment+`')]`);
    }

    get crossButton() {
        return global.page.locator("//icon[@name='cross_line']");
    }

    get angryIconInModal() {
        return global.page.locator("//icon[@class='text-red-500']");
    }

    async searchFunction(searchText) {
        await this.searchInput.fill(searchText);
    }

    async clickOnRoom() {
        await this.firstRoomDiv.click();
    }

    async clickOnJobNo(jobId) {
        await this.jobIdElement(jobId).click();
    }

    async clickOnMoodChangeIcon() {
        await this.iconInPage(utilConst.Const.moodIconText).click();
    }

    async happyIconChecking() {
        await this.happyIconInModal.click();
        await this.submitButton.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.greenIconText)).toBeVisible();
        await global.page.reload();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.greenIconText)).toBeVisible();
        await this.logButton.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
    }

    async neutralIconChecking(jobId) {
        await this.searchFunction(jobId)
        await this.iconInPage(utilConst.Const.greenIconText).click();
        await this.neutralIconInModal.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        await this.commentBoxInput.fill(lighthouseData.neutralComment);
        await this.submitButton.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.yellowIconText)).toBeVisible();
        await global.page.reload();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.yellowIconText)).toBeVisible();
        await this.logButton.click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        expect(await this.logMsg(utilConst.Const.neutralLogMsg)).toBeVisible();
        await global.page.waitForTimeout(parseInt(process.env.large_timeout));
        await this.bellIcon.click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        expect(await this.MoodNotification(lighthouseData.neutralComment)).toBeVisible();
        await this.crossButton.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
    }

    async angryIconChecking(jobId) {
        await this.searchFunction(jobId)
        await this.iconInPage(utilConst.Const.yellowIconText).click();
        await this.angryIconInModal.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        await this.commentBoxInput.fill(lighthouseData.angryComment);
        await this.submitButton.click();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.redIconText)).toBeVisible();
        await global.page.reload();
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout));
        expect(await this.iconInPage(utilConst.Const.redIconText)).toBeVisible();
        await this.logButton.click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        expect(await this.logMsg(utilConst.Const.angryLogMsg)).toBeVisible();
        await global.page.waitForTimeout(parseInt(process.env.large_timeout));
        await this.bellIcon.click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        expect(await this.MoodNotification(lighthouseData.angryComment)).toBeVisible();
        await this.crossButton.click();
    }
}
module.exports = new MoodChangePage();