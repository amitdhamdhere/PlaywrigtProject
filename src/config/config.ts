import dotenv from "dotenv";
import path from "path";

// Decide environment (default = qa)
const env = process.env.TEST_ENV || "qa";

// Load correct .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`)
});

// Export config object
export const config = {
  baseUrl: process.env.BASE_URL || "",
  browser: (process.env.BROWSER || "chromium") as
    | "chromium"
    | "firefox"
    | "webkit",
  headless: process.env.HEADLESS === "true",
  username: process.env.APP_USERNAME || "",
  password: process.env.APP_PASSWORD || "",
  timeout: Number(process.env.TIMEOUT || 60000)
};
