const fs = require('node:fs/promises')
const data = require("../data/navigator.json")
const { generateRandString } = require('../utility/generateString');
const utilConst = require('../utility/const');
const { expect } = require('playwright/test');

class CompassPage {

    get copilotButton() {
        return global.page.locator("//div[@id='Microsoft.Copilot.Pane']/parent::div/div[2]//button");
    }

    get opportunityElement() {
        return global.page.locator("//span[text()='Opportunities']");
    }

    get newButton() {
        return global.page.locator("//span[text()='New']");
    }

    inputAttribute(attributeValue) {
        return global.page.locator(`//label[text()='`+ attributeValue +`']/../following-sibling::div/descendant::input`);
    }

    buttonAttribute(attributeValue) {
        return global.page.locator(`//label[text()='`+ attributeValue +`']/../following-sibling::div/descendant::button[@role='combobox']`)
    }

    get selectNewOption() {
        return global.page.locator("//div[text()='New']");
    }

    get selectAtendees() {
        return global.page.locator("//div[text()='101-250']");
    }

    get selectCategory() {
        return global.page.locator("//div[text()='Main Show']");
    }

    get selectEndUserAccount() {
        //span[text()='Tommy']/parent::span[text()=' Hilfiger']/following::span[text()='287']
        return global.page.locator("//span[text()='287']");
    }

    get selectEndUserContact() {
        return global.page.locator("//span[text()='Angelina Wood']");
    }

    get deleteVenue() {
        return global.page.locator("//div[text()='PSAV Corporate Headquarters']/../following-sibling::button");
    }

    get selectVenue() {
        return global.page.locator("//span[text()='Hotel Del Coronado, Curio Collection by Hilton']");
    }

    get saveButton() {
        return global.page.locator("//span[text()='Save']");
    }

    get ignoreAndSaveButton() {
        return global.page.locator("//button[text()='Ignore and save']");
    }

    get ordersButton() {
        return global.page.locator("//li[text()='Orders']");
    }

    get selectCenter() {
        return global.page.locator("//span[text()='Hotel del Coronado']");
    }

    async clickOnCompass() {
        // await global.page.frameLocator("iframe#AppLandingPage").locator("//div[text()='Compass']").click();
          const log=await global.page.content();
        console.log("page content is", log);
        await global.page.frameLocator('iframe#AppLandingPage')
                .locator('//div[text()="Compass"]')
                .waitFor({ state: 'visible', timeout: 30000 })
                .then(() => console.log("Element found and visible"))
                .catch(err => console.error("Element not found:", err));
        await global.page.frameLocator("iframe#AppLandingPage").locator("//div[text()='Compass']").click({ timeout: 30000 });
       
    }

    async clickOnCopilot() {
        await this.copilotButton.click();
    }

    async createOpportunity(revenue,endUserAccount,endUserContact,venue,centerName) {
        await this.opportunityElement.click();
        await this.newButton.click();
        const eventName = await generateRandString(8);
        await this.inputAttribute(utilConst.Const.EventName).fill(eventName);
        //date
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0"); 
        const startDay = today.getDate().toString().padStart(2, "0"); 
        const startDate = `${month}/${startDay}/${year}`;
        console.log("START DATE -->> " + startDate);
        const endMonth = (today.getMonth() + 1).toString().padStart(2, "0");
        const endDay = (today.getDate() + 8).toString().padStart(2, "0"); 
        const endDate = `${endMonth}/${endDay}/${year}`;
        console.log("END DATE -->> " + endDate);
        await this.inputAttribute(utilConst.Const.EventStartDate).fill(startDate);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.inputAttribute(utilConst.Const.EventEndDate).click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.inputAttribute(utilConst.Const.EventEndDate).fill(endDate);
        await this.buttonAttribute(utilConst.Const.NewOrExisting).click();
        await this.selectNewOption.click();
        await this.inputAttribute(utilConst.Const.EstRevenue).click();
        await this.inputAttribute(utilConst.Const.EstRevenue).fill(revenue);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.buttonAttribute(utilConst.Const.NoOfAttendees).click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.selectAtendees.click();
        await this.buttonAttribute(utilConst.Const.ShowCategory).click();
        await this.selectCategory.click();
        await this.inputAttribute(utilConst.Const.EndUserAccount).scrollIntoViewIfNeeded();
        await this.inputAttribute(utilConst.Const.EndUserAccount).click();
        await this.inputAttribute(utilConst.Const.EndUserAccount).fill(endUserAccount);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.selectEndUserAccount.click();
        await this.inputAttribute(utilConst.Const.EndUserContact).click();
        await this.inputAttribute(utilConst.Const.EndUserContact).fill(endUserContact);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.selectEndUserContact.click();
        await this.deleteVenue.click();
        await this.inputAttribute(utilConst.Const.Venue).click();
        await this.inputAttribute(utilConst.Const.Venue).fill(venue);
        await global.page.waitForTimeout(parseInt(process.env.small_timeout));
        await this.selectVenue.click();
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        try {
            await this.ignoreAndSaveButton.click();
        }catch(error) {
            console.log("Element is not there in the DOM");
        }finally {
            await global.page.waitForTimeout(parseInt(process.env.large_timeout));
            // console.log(await global.page.locator("//h1[@id='formHeaderTitle_5']").textContent() , "--++");
            await this.ordersButton.click();
            await global.page.waitForTimeout(parseInt(process.env.small_timeout));
            await this.inputAttribute(utilConst.Const.GLCenter).click();
            await this.inputAttribute(utilConst.Const.GLCenter).fill(centerName);
            await global.page.waitForTimeout(parseInt(process.env.small_timeout));
            await this.selectCenter.click();
            await this.saveButton.click();
            await global.page.waitForTimeout(parseInt(process.env.large_timeout));
        }   
    }

    async clickOnPlusButton(mail,password){
        const pagePromise = global.context.waitForEvent('page');
        // await global.page.frameLocator("iframe#WebResource_OrdersSubGrid").locator("//div[@id='divToolbarOrders']/div/div[4]/div/img[@class='po-toolbar-control-image-enabled']").click();
        await global.page.frameLocator("iframe#WebResource_OrdersSubGrid")
            .locator("//div[@id='divToolbarOrders']/div/div[4]/div/img[@class='po-toolbar-control-image-enabled']")
            .waitFor({ state: 'visible', timeout: 30000 })
            .then(() => console.log("Element found and visible"))
            .catch(err => console.error("Element not found:", err));
        await global.page.frameLocator("iframe#WebResource_OrdersSubGrid").locator("//div[@id='divToolbarOrders']/div/div[4]/div/img[@class='po-toolbar-control-image-enabled']").click({ timeout : 30000 });
        const newPage = await pagePromise;
        await newPage.locator("//input[@id='userNameInput']").fill(mail);
        await newPage.locator("//input[@id='passwordInput']").fill(password);
        await newPage.locator("//span[@id='submitButton']").click();
        // await newPage.waitForLoadState();
        await newPage.waitForTimeout(parseInt(process.env.large_timeout));
        const navigationUrl = await newPage.url();
        console.log("Navigator URL : ",navigationUrl);
        data.navigatorUrl = navigationUrl;
        await fs.writeFile("./data/navigator.json",JSON.stringify(data));
        expect(data.navigatorUrl).toEqual(navigationUrl);
        await newPage.close();
    }

}
module.exports = new CompassPage();
