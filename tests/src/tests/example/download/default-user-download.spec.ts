import { AuthApi } from '../../../domain/auth/auth-api';
import { ExampleApi } from '../../../domain/example/example-api';
import { ExportPayloadFactory } from '../../../domain/example/factories/export-payload-factory';
import { EXAMPLE_ITEMS } from '../../../fixtures/entities/example-items';
import { defaultUserCredentials } from '../../../fixtures/users/system-accounts';

beforeAll(async () => {
  await AuthApi.loginAndGetCookie(defaultUserCredentials);
});

// npx jest src/tests/example/download/default-user-download.spec.ts
describe('Example download tests', () => {
  it('POST /items/export - download items spreadsheet', async () => {
    // covering test {ticket-id}
    const response = await ExampleApi.exportItems({
      body: ExportPayloadFactory.createExportItemsWithSuccess([EXAMPLE_ITEMS.ITEM_A.id]),
      filename: 'items-export.xlsx',
    });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('spreadsheetml');
    expect((response.data as ArrayBuffer).byteLength).toBeGreaterThan(0);
  });
});
