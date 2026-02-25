import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    private readonly successText: Locator;

    constructor(page: Page) {
        this.successText = page.locator("h1");
    }

    async getSuccessMessage(): Promise<Locator> {
        return this.successText;
    }
}