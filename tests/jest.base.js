// Shared Jest settings. Do not run this config directly — use jest.contract.js,
// jest.document-files.js or jest.functional.js via the npm scripts.
//
// Why separate configs instead of one with `projects`: `maxWorkers` is a global-only
// option in Jest. Setting it inside a `projects` entry is silently ignored — no
// warning — so a "serial" project would still fan out across workers and let
// state-mutating specs corrupt each other's fixtures.

/**
 * Contract specs: schema validation only. Safe to run concurrently.
 */
const CONTRACT_TESTS = ['<rootDir>/src/tests/**/contract/**/*.spec.ts'];

/**
 * Specs that read or write document files (download + upload). Safe to run
 * concurrently — no shared mutable fixture state between these specs.
 */
const DOCUMENT_FILES = ['<rootDir>/src/tests/**/(download|upload)/**/*.spec.ts'];

/**
 * Specs that create, update or delete data (actions), plus the auth specs.
 * Specs that share fixture entities (the same ids mutated by several files)
 * must not run in parallel — run them with `--runInBand` (or maxWorkers: 1).
 */
const FUNCTIONAL_TESTS = [
  '<rootDir>/src/tests/**/actions/**/*.spec.ts',
  '<rootDir>/src/tests/auth/**/*.spec.ts',
];

/** Settings every config shares. Spread this — never the module itself. */
const baseConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: __dirname,
  testTimeout: 60000,
  // Authenticates every account once, sequentially, before any test runs.
  // Identity providers commonly reject concurrent OAuth code exchanges, so specs
  // should not log in on their own — they reuse the cookies cached here (see src/global-setup.ts
  // and src/shared/auth-session-cache.ts).
  globalSetup: '<rootDir>/src/global-setup.ts',
};

/** Builds the html-reporter pair for a run, keeping report paths distinct. */
function reporters(title, outputPath) {
  return ['default', ['./node_modules/jest-html-reporter', { pageTitle: title, outputPath, includeFailureMsg: true }]];
}

module.exports = { baseConfig, reporters, DOCUMENT_FILES, CONTRACT_TESTS, FUNCTIONAL_TESTS };
