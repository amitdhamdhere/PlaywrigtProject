import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, chromium } from '@playwright/test';
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { BrowserFactory } from "../core/browser-factory";
import { config } from "../config/config";
import { logger } from "../utils/logger";
import { CustomWorld } from "./world";
import fs from "fs";

setDefaultTimeout(config.timeout);

let browser: Browser;

BeforeAll(async function () {
  logger.info("Launching browser...");
  browser = await BrowserFactory.launchBrowser();
});

Before(async function (this: CustomWorld, scenario) {
  logger.info(`Starting Scenario: ${scenario.pickle.name}`);

  this.browserContext = await browser.newContext({
    viewport: null,
    recordVideo: {
      dir: 'reports/video',
      size: {
        width: 1280,
        height: 720
      }
    }
  });

  await this.browserContext.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  this.page = await this.browserContext.newPage();
  await this.page.goto(config.baseUrl);

  // Dependency Injection
  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  const isFailed = scenario.result?.status === Status.FAILED;

  if (isFailed) {
    // Take a screenshot only on failure
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    // Attach screenshot to report
    await this.attach(screenshot, 'image/png');

    logger.error(`Scenario FAILED: ${scenario.pickle.name}`);
  } else {
    logger.info(`Scenario PASSED: ${scenario.pickle.name}`);
  }

  const video = this.page.video();

  if (isFailed) {
    await this.browserContext.tracing.stop({
      path: `reports/trace-${scenario.pickle.name.replace(/\s+/g, "_")}-${Date.now()}.zip`
    });
    logger.info("Trace saved (failure)");
  } else {
    await this.browserContext.tracing.stop();
  }

  if (this.page) {
    await this.page.close();
  }

  if (this.browserContext) {
    await this.browserContext.close();
  }

  if (video) {
    const videoPath = await video.path();

    if (isFailed) {
      logger.info(`Attaching video: ${videoPath}`);

      const videoBuffer = fs.readFileSync(videoPath);
      await this.attach(videoBuffer, "video/webm");

    } else {
      logger.info("Deleting video (scenario passed)");
      fs.unlinkSync(videoPath);
    }
  }
});

AfterAll(async function () {
  logger.info("Closing browser...");
  await browser.close();
  logger.info("Browser closed");

  logger.info("============================================");
  logger.info("Test Execution Completed");
  logger.info("============================================");
});