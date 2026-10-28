// State-mutating specs (actions + auth). If several specs mutate the same fixture
// entities, lower maxWorkers to 1 so they cannot clobber each other.
const { baseConfig, reporters, FUNCTIONAL_TESTS } = require('./jest.base');

module.exports = {
  ...baseConfig,
  displayName: 'functional-tests',
  testMatch: FUNCTIONAL_TESTS,
  maxWorkers: '50%',
  reporters: reporters('API Test Report — functional', './reports/test-report-functional.html'),
};
