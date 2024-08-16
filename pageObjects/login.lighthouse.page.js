class LightHouseLoginPage {
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

    get searchInput() {
        return global.page.locator("//input[@name='search-field']");
    }

    async login(email,password) {
        await this.inputEmail.fill(email);
        await this.nextButton.click();
        await this.inputPassword.fill(password);
        await this.signInButton.click();
        await this.noButton.click();
    }
 
}
module.exports = new LightHouseLoginPage();