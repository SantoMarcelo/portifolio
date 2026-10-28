// Contract specs (schema validation) — safe to run concurrently.
const { baseConfig, reporters, CONTRACT_TESTS } = require('./jest.base');

module.exports = {
  ...baseConfig,
  displayName: 'contract-tests',
  testMatch: CONTRACT_TESTS,
  maxWorkers: '50%',
  reporters: reporters('API Test Report — contract', './reports/test-contract.html'),
};
