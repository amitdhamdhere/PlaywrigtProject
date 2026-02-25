const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "reports",
    reportPath: "reports/html",
    metadata: {
        browser: {
            name: "chromium",
            version: "latest"
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "10"
        }
    },
    customData: {
        title: "Execution Info",
        data: [
            { label: "Project", value: "Playwright Cucumber Framework" },
            { label: "Release", value: "1.0.0" }
        ]
    }
});
