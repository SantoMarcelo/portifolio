import { AuthApi } from '../../../domain/auth/auth-api';
import { ExampleApi } from '../../../domain/example/example-api';
import { SearchItemsResponseSchema } from '../../../domain/example/example-types';
import { defaultUserCredentials } from '../../../fixtures/users/system-accounts';
import SchemaValidator from '../../../shared/schema-validator-adapter';

beforeAll(async () => {
  await AuthApi.loginAndGetCookie(defaultUserCredentials); // Authenticate once per suite
});

// npx jest src/tests/example/contract/default-user-contract.spec.ts
describe('Example contract tests', () => {
  it('POST /items/search - response matches the schema', async () => {
    // covering test {ticket-id}
    const items = await ExampleApi.searchItems({ limit: 10, offset: 0 });

    const result = SchemaValidator.validateSchema(SearchItemsResponseSchema, items);
    expect(result.success).toBe(true);
  });
});
