const Page = require("./page");

class LoginPage extends Page {
    get inputEmail() {
        return global.page.locator("//input[@type='email']");
    }

    get nextButton() {
        return global.page.locator("//input[@type='submit']");
    }

    get inputPassword() {
        return global.page.locator("//input[@type='password']");
    }

    get signInButton() {
        return global.page.locator("//input[@type='submit']");
    }

    get noButton() {
        return global.page.locator("//input[@type='button']");
    }

    get profileButton() {
        return global.page.locator("//div[@id='mectrl_headerPicture']");
    }

    async login(email,password) {
        await this.inputEmail.fill(email);
        await this.nextButton.click();
        await this.inputPassword.fill(password);
        await this.signInButton.click();
        await this.noButton.click();
        console.log("Login into Opportunity page is successful")
    }

    open(baseUrl) {
        return super.open(baseUrl);
      }
}
module.exports = new LoginPage();
