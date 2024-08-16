const {expect}=require('@playwright/test')

class FlowSheetStatus {
    get searchInput() {
        return global.page.locator("//input[@name='search-field']");
    }
    get flowsheetCard() {
        return global.page.locator("(//app-flowsheet-action-card[@class='e2e_flowsheet_action_card ng-star-inserted'])[1]");
    }
    get statusButtonIcon() {
        return global.page.locator("(//app-button-card[@class='e2e_flowsheet_action_status_button'])[1]/descendant::icon");
    }
    get groupButtonIcon() {
        return global.page.locator("(//app-button-card[@class='e2e_flowsheet_action_group-button'])[1]/descendant::icon");
    }
    get setStatusSection() {
        return global.page.locator("(//app-flowsheet-action-card[@class='e2e_flowsheet_action_card ng-star-inserted'])[1]//app-flowsheet-action-timeline[@class='w-4/5 e2e_flowsheet_action_timeline']");
    }
    get statusSetRefreshComplete() {
        return global.page.locator("//app-select-status-sheet//li[.//span[text()='Set Refresh - Complete']]");
    }
    get redIcon() {
        return global.page.locator("//icon[@class='e2e_flowsheet_action_timeline_event_icon text-red-500']");
    }
    get greenIcon() {
        return global.page.locator("(//app-flowsheet-action-timeline[@class='w-4/5 e2e_flowsheet_action_timeline']//icon[@class='e2e_flowsheet_action_timeline_event_icon text-green-500'])[1]").first();
    }
    get selectedDate(){
        return global.page.locator("div.e2e_date_selector_option.bg-encore-accent-blue.text-white")
    }
    async searchJobNumber(jobNumber) {
        await this.searchInput.fill(jobNumber);
    }
    async hoverOnFlowsheetCard() {
        await this.flowsheetCard.hover();
    }
    async isStatusGroupIconsDisplayed() {
        await this.hoverOnFlowsheetCard();
        const isStatusButtonIconVisible = await this.statusButtonIcon.isVisible();
        const isGroupButtonIconVisible = await this.groupButtonIcon.isVisible();
        return isStatusButtonIconVisible && isGroupButtonIconVisible;
    }
    async setStatus() {
        
        const flowsheetCard = page.locator("(//app-flowsheet-action-card)[1]");
        const stage1 = flowsheetCard.locator(".e2e_flowsheet_action_timeline_event_icon.text-red-500");
        const specificStage = flowsheetCard.locator('e2e_flowsheet_action_timeline_event_icon text-green-500').first();

        // await expect(specificStage).toBeVisible();

            await this.setStatusSection.click();
            await global.page.waitForTimeout(parseInt(process.env.small_timeout));
            // await this.statusSetRefreshComplete.click();
            const statusOption = await this.statusSetRefreshComplete.isVisible();

        if (statusOption) {
             await this.statusSetRefreshComplete.click();
             console.log("----------status selected successfully----------");
         } else {
            const cancelAlertButton = global.page.locator("//span[text()=' Close ']");
            await cancelAlertButton.click();
            console.log("----------alert cancelled as option was not available----------");
          }
            await global.page.waitForTimeout(3000); 
            const flowsheetCard1 = page.locator("(//app-flowsheet-action-card)[1]");
            const specificStage1 = flowsheetCard1.locator('icon.e2e_flowsheet_action_timeline_event_icon.text-green-500').nth(0)
            const count = await specificStage1.count();
            // console.log(`Number of matching elements: ${count}`);
            
            await expect(specificStage1).toBeVisible();

        return this.greenIcon;
    }
    async checkSavedStatus(){
            await global.page.waitForTimeout(parseInt(process.env.medium_min_timeout))
            const flowsheetCard1 = page.locator("(//app-flowsheet-action-card)[1]");
            const specificStage1 = flowsheetCard1.locator('icon.e2e_flowsheet_action_timeline_event_icon.text-green-500').nth(0);
            const count = await specificStage1.count();
            // console.log(`Number of matching elements: ${count}`);
    
            await expect(specificStage1).toBeVisible();
   }
   async checkSelectedDate(){
    const dateText = await this.getDayNumber();
    const dateNumber = parseInt(dateText.trim(), 10);
    const systemDate = new Date().getDate();

    console.log(`Selected Date: ${dateNumber}`);
    console.log(`System Date: ${systemDate}`);

    if (dateNumber !== systemDate) {
        throw new Error(`The selected date (${dateNumber}) does not match the system's current date (${systemDate})!`);
    } else {
        console.log("The selected date matches the system's current date.");
    }
}

    async getDayNumber() {
    const spans = await this.selectedDate.locator('span').elementHandles();
    for (let span of spans) {
        const text = await span.textContent();
        if (this.isNumeric(text.trim())) {
            return text;
        }
    }
    }

    isNumeric(value) {
    return /^\d+$/.test(value);
    }
}
module.exports = new FlowSheetStatus();