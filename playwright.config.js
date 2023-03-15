const { devices, defineConfig } = require('@playwright/test');

// // Use process.env.PORT by default and fallback to port 3000
// const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer
// respecting the correct set port
// const baseURL = 'http://localhost:3000';

// Alternatively, read from "../my.env" file.
// require('dotenv').config({ path: '.env.test' });

module.exports = defineConfig({
  globalSetup: require.resolve('./playwright.global.setup.js'),
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  // testDir: path.join(__dirname, 'e2e'),
  testDir: `${__dirname}/e2e`,
  // If a test fails, retry it additional 2 times
  retries: 1,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: 'test-results/',
  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL: 'http://localhost:3000/',
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
  // FIXME - tidy up/remove workers after CI issue is fixed
  workers: 1,
});
