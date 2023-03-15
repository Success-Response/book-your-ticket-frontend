const { devices, defineConfig } = require('@playwright/test');

// Load our test environment variables
require('dotenv').config({
  path: './.env.test',
});

module.exports = defineConfig({
  // timeout per test
  timeout: 30 * 1000,
  testDir: `${__dirname}/e2e`,
  retries: 1,
  outputDir: 'test-results/',
  // Run a local dev server before starting the tests
  webServer: {
    command: 'yarn run dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // Test against mobile viewports.
  ],
  forbidOnly: !!process.env.CI,
  maxFailures: process.env.CI ? 1 : 0,
  quiet: !!process.env.CI,
  workers: process.env.CI ? 1 : 3,
});
