const { format } = require("node:path");

module.exports = {
    default: {
        paths: ['src/features/**/*.feature'],
        require: [
            'src/steps/**/*.ts',
            'src/support/hooks.ts',
            'src/support/world.ts'
        ],
        dryRun: false,
        formatOptions: {
            snippetInterface: "async-await"
        },
        requireModule: ['ts-node/register'],
        parallel: 2,
        format: [
            'rerun:@rerun.txt',
            'json:reports/cucumber-report.json'
        ],
        retry: 1
    },
    rerun: {
        paths: ['@rerun.txt'],
        require: [
            'src/steps/**/*.ts',
            'src/support/hooks.ts',
            'src/support/world.ts'
        ],
        requireModule: ['ts-node/register'],
        parallel: 2
    }
};