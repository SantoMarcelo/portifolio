// Specs that read or write document files (download + upload) — safe to run concurrently.
const { baseConfig, reporters, DOCUMENT_FILES } = require('./jest.base');

module.exports = {
  ...baseConfig,
  displayName: 'document-files-tests',
  testMatch: DOCUMENT_FILES,
  maxWorkers: '50%',
  reporters: reporters('API Test Report — Document File Tests (Download/Upload)', './reports/test-document-files.html'),
};
