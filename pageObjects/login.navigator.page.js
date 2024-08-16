const Page = require("./page");
require('dotenv').config();

class NavigatorLoginPage extends Page {
    get inputEmailId() {
        return global.page.locator("#userNameInput")
    }
    get inputPassword() {
        return global.page.locator("#passwordInput")
    }
    get signInBtn() {
        return global.page.locator("#submitButton")
    }
    async login_navigator(email_id, password) {
        await this.inputEmailId.fill(email_id);
        await this.inputPassword.fill(password);
        await this.signInBtn.click();
    }
    // open() {
    //     return super.open();
    // }
}
module.exports = new NavigatorLoginPage();