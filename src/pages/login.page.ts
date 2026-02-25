import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super()
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#submit");
    }

    async enterUsername(username: string) {
        await this.fill(this.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.fill(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.click(this.loginButton);
    }
}