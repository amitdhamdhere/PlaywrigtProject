import { Locator } from "@playwright/test";

export class BasePage {
    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }
}