// jest.config.js
const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading
// next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

// Any custom config you want to pass to Jest
const customJestConfig = {
  // Automatically clear mock calls, instances, contexts
  // and results before every test
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/tests'],

  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
};

// createJestConfig is exported in this way to ensure that next/jest can
// load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
