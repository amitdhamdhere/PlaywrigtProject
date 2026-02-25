import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from "../support/world"
import { config } from '../config/config';
import { logger } from "../utils/logger";
import { DataManager } from "../data/data-manager";

const loginData = DataManager.getStaticData<any>("login-data");

Given('the user is on the Practice Test Automation login page', async function (this: CustomWorld) {
});

When('the user enters a valid username as {string}', async function (this: CustomWorld, username: string) {
    logger.info("Entering username");
    await this.loginPage.enterUsername(loginData.validUser.username);
});

When('the user enters a valid password as {string}', async function (this: CustomWorld, password: string) {
    logger.info("Entering password");
    await this.loginPage.enterPassword(loginData.validUser.password);
});

When('the user clicks on the login button', async function (this: CustomWorld) {
    logger.info("Clicking login button");
    await this.loginPage.clickLoginButton();
});