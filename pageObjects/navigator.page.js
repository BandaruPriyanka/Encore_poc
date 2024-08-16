const Page=require("./page");
require('dotenv').config();
const{expect}=require('@playwright/test')
const data=require('../data/navigator.json')
const fs=require('node:fs/promises')
class NavigatorPage extends Page {
    constructor(page) {
        super();
        if (!page) {
            throw new Error("Page object is undefined");  
        }
        this.page = page;
    }
    get createOrderBtn(){
        return global.page.locator("//button[contains(text(), 'Create Order')]")
    }
    get clickOnjobsBtn(){
        return global.page.locator("//a[normalize-space()='Jobs']")
        
    }
    get selectRoomType(){
        return global.page.locator("(//div[@id='slickGridContainer-oeJobGrid']//div[@class='ui-widget-content slick-row even']/div)[14]")
    }
    get clickOnRoomDropDown(){
        return global.page.locator("select.editor-combobox")
    }
    get selectFirstRoom(){
        return global.page.locator("(//div[@class='slick-cell l7 r7 true'])[1]")
    }
    get firstRoomDropDown(){
        return global.page.locator("select.editor-combobox")
    }
    get saveBtn(){
        return global.page.locator("//button[normalize-space(text())='Save']")
    }
    get orderNumber(){
        return global.page.locator("//div[@id='orderJobCommon']//label[@class='orderTickerDisplayValue me-3']")
    }
    get orderName(){
        return global.page.locator("//div[@id='orderJobCommon']//label[@class='orderTickerDisplayValue fw-bold']")
    }
    get changeStatus(){
        return global.page.locator("//div[text()='Sales']/following-sibling::div[text()='Quote']")
    }
    get statusDropDown(){
        return global.page.locator("//div[@id='slickGridContainer-oeJobGrid']//div[@class='slick-pane slick-pane-top slick-pane-left']//select[@class='orderInput h-auto ng-untouched ng-pristine ng-valid']")
    }
    get itemsBtn(){
        return global.page.locator("//a[normalize-space(text())='Items']")
    }
    get clickPackageIcon(){
        return global.page.locator("//div[@id='jobProductContainer']//button/span[contains(@class, 'glyphicon-gift')]")
    }
    get selectPackageName(){
        return global.page.locator("//div[@id='slickGridContainer-oePackagesGrid']//div[@class='grid-canvas grid-canvas-top grid-canvas-left']//div[contains(@class,'ui-widget-content slick-row ')][2]")
    }
    get selectedItemName(){
        return global.page.locator("(//div[@id='slickGridContainer-oeOrderLinesGrid']//div[@class='grid-canvas grid-canvas-top grid-canvas-left']//following::div)[3]")
    }
    get clickOnItemIcon(){
        return global.page.locator("//div[@id='jobProductContainer']//button/span[contains(@class, 'glyphicon glyphicon-th-list')]")
    }
    get cancelItemsIcon(){
        return global.page.locator("//app-job-product-item//span[@class='glyphicon glyphicon-remove oeSideBarGridSearchIcon']")
    }
    get clickOnSearchIcon(){
        return global.page.locator("//app-job-product-item//span[@class='glyphicon glyphicon-search oeSideBarGridSearchIcon']")
    }
    get checkboxLabourtItems(){
        return global.page.locator("//label[text()='Labor Items']")
    }
    get laboutItem(){
        return global.page.locator("//app-job-products//app-job-product-item//div[text()='3-Hole Punch Labor']")
    }
    get addToPackageBtn(){
        return global.page.locator("//button[text()=' Add to package ']")
    }
    get labourItemName(){
        return global.page.locator("//app-job-items//div[@class='ui-widget-content slick-row even']//div[text()='3-Hole Punch Labor']")
    }
    navigator(navigatorUrl) {
        return super.navigator(navigatorUrl);
    }
    async createOrder(){
        await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
        await this.createOrderBtn.click();
        const currentUrl = this.page.url();
        console.log(`Order Page URL is: ${currentUrl}`);
    }
    async jobsPage(){
        await this.clickOnjobsBtn.click();
        const currentUrl = this.page.url();
        console.log(`Jobs Page URL is: ${currentUrl}`);
    console.log("-------------------jobs page end---------------------")
    }
    async selectRooms(){
        await this.selectRoomType.click();
        await this.clickOnRoomDropDown.click();
        await this.clickOnRoomDropDown.selectOption({ label: 'Babcock A' });
 
        await this.changeStatus.click();
        await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
        await this.statusDropDown.selectOption({ label: 'Tentative' });
        console.log("----------selected job status----------")
 
        await this.saveBtn.click()
        await global.page.waitForTimeout(parseInt(process.env.small_max_timeout));
        const firstJobNumberElement = await page.locator('span.job-number').nth(0);
        const firstJobNumber = await firstJobNumberElement.textContent();
        console.log('First Job Number:', firstJobNumber);
        data.first_job_no= firstJobNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
 
        const secondJobNumberElement = await page.locator('span.job-number').nth(1);
         const secondJobNumber = await secondJobNumberElement.textContent();
        console.log('Second Job Number:', secondJobNumber);
 
        data.second_job_no= secondJobNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
       
        const orderNumber= await this.orderNumber.textContent()
        console.log('Order Number:', orderNumber);
        data.order_no= orderNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
 
        const order_name=await this.orderName.textContent()
        data.order_name=order_name;
        console.log('Order Name:', order_name);
        fs.writeFile("./data/navigator.json", JSON.stringify(data));
    }
    async selectItems(){
        await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
        await this.itemsBtn.click();
        await this.clickPackageIcon.click();
        await this.selectPackageName.dblclick();
        const textContent = await this.selectedItemName.textContent()
        console.log("Item Name:", textContent);
        data.item_name= textContent;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
        const itemName = data.item_name;
        expect(textContent).toBe(itemName);
        await this.saveBtn.click()
        await global.page.waitForTimeout(parseInt(process.env.small_max_timeout))
    }
    async selectLabourItem(){
        await this.clickOnItemIcon.click()
        await this.clickOnSearchIcon.click();
        await global.page.waitForTimeout(parseInt(process.env.small_timeout))
        await this.checkboxLabourtItems.click();
        await global.page.waitForTimeout(1000);
        await this.laboutItem.dblclick()
        await global.page.waitForTimeout(parseInt(process.env.small_timeout))
        await this.addToPackageBtn.click()

        const ItemName=await this.labourItemName.textContent();
        console.log("Selected Labour Item Name : ", ItemName);
        data.labour_item_name=ItemName;
        console.log(ItemName)
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
        await this.saveBtn.click()
        await global.page.waitForTimeout(parseInt(process.env.medium_timeout))
    }
}
module.exports =NavigatorPage;