import { expect, Locator, APIResponse } from "@playwright/test";
import { logger } from "../../utils/logger";

export class AssertionManager {

  static async expectVisible(locator: Locator, timeout = 30000) {
    logger.info("Validating element visibility");
    await expect(locator).toBeVisible({ timeout });
  }

  static async expectTextEquals(locator: Locator, expected: string, timeout = 30000) {
    logger.info(`Validating text equals: ${expected}`);
    await expect(locator).toHaveText(expected, { timeout });
  }

  static async expectApiStatus(response: APIResponse, expectedStatus: number) {
    logger.info(`Validating API status: ${expectedStatus}`);
    await expect(response.status()).toBe(expectedStatus);
  }
}