// Load our test environment variables
require('dotenv').config({
  path: './.env.test',
});

console.log(process.env, __filename);

// global-setup.js
module.exports = async (config) => {
  process.env.FOO = 'some data';
  // Or a more complicated data structure as JSON:
  process.env.BAR = JSON.stringify({ some: 'data' });
};
