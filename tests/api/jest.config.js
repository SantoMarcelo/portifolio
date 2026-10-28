// Default config, used by a bare `npx jest <path>` — the single-spec workflow
// documented at the top of every spec file. Serial, so running one spec by hand
// behaves exactly as it always has.
//
// The full suite goes through the npm scripts instead, which split the run:
//   npm run test           -> parallel read-only, then serial stateful
//   npm run test:parallel  -> contract + download, concurrent
//   npm run test:serial    -> actions + upload + auth, one worker
const { baseConfig, reporters } = require('./jest.base');

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
  maxWorkers: 1,
  reporters: reporters('API Test Report', './reports/test-report.html'),
};
