import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { config } from "../config/config";

export class BrowserFactory {
    static async launchBrowser(): Promise<Browser> {
        const browserType = config.browser || "chronium";
        const headless = config.headless;

        switch (browserType.toLowerCase()) {
            case "firefox": return await firefox.launch({ headless });
            case "webkit": return await webkit.launch({ headless });
            case "chromium":
            default: return await chromium.launch({ headless, args: ["--start-maximized"] });
        }
    }
}