import { AuthApi } from '../../../domain/auth/auth-api';
import { ExampleApi } from '../../../domain/example/example-api';
import { defaultUserCredentials } from '../../../fixtures/users/system-accounts';
import { EXAMPLE_FIXTURE_PATHS } from '../../../fixtures/example-fixture-paths';

beforeAll(async () => {
  await AuthApi.loginAndGetCookie(defaultUserCredentials);
});

// npx jest src/tests/example/upload/default-user-upload.spec.ts
describe('Example upload tests', () => {
  it('POST /items/import - import items with success', async () => {
    // covering test {ticket-id}
    const response = await ExampleApi.uploadItems(EXAMPLE_FIXTURE_PATHS.importItemsWithSuccess);

    expect(response.status).toBe(200);
    expect(response.data.errors ?? []).toHaveLength(0);
  });
});
