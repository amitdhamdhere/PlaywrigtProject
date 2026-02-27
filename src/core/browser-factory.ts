import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { config } from "../config/config";

export class BrowserFactory {
    static async launchBrowser(): Promise<Browser> {
        const browserType = (config.browser || "chromium").toLowerCase();

        // Detect CI / Docker environment
        const isCI = process.env.CI === "true";
        const isDocker = process.env.DOCKER === "true";

        // Headless logic:
        // - Always headless in CI or Docker
        // - Otherwise use config value
        const headless = isCI || isDocker || config.headless;

        const launchOptions = {
            headless,
            args: headless ? [] : ["--start-maximized"]
        };

        switch (browserType) {
            case "firefox":
                return await firefox.launch({ headless });

            case "webkit":
                return await webkit.launch({ headless });

            case "chromium":
            default:
                return await chromium.launch(launchOptions);
        }
    }
}