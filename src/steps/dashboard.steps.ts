import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from "../support/world"
import { AssertionManager } from '../core/assertions/assertion-manager';

Then('the user should see the login success message {string}', async function (this: CustomWorld, expectedMessage: string) {
    await AssertionManager.expectTextEquals(await this.dashboardPage.getSuccessMessage(), expectedMessage);
});