import { AuthApi } from '../../../domain/auth/auth-api';
import { ExampleApi } from '../../../domain/example/example-api';
import { ErrorResponseType, UpdateItemResponseType } from '../../../domain/example/example-types';
import { ExampleFactory } from '../../../domain/example/factories/example-factory';
import { defaultUserCredentials } from '../../../fixtures/users/system-accounts';

let createdItemId: number;

beforeAll(async () => {
  await AuthApi.loginAndGetCookie(defaultUserCredentials);
});

afterAll(async () => {
  if (createdItemId) await ExampleApi.cleanupItem(createdItemId);
});

// npx jest src/tests/example/actions/default-user-actions.spec.ts
describe('Example actions tests', () => {
  it('POST /items - create item with success', async () => {
    // covering test {ticket-id}
    const payload = ExampleFactory.createItemWithSuccess();
    const response = await ExampleApi.createItemByApi(payload);

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(payload.name);
    createdItemId = response.data.id;
  });

  it('PATCH /items/{id} - update quantity with success', async () => {
    // covering test {ticket-id}
    const response = await ExampleApi.updateItemByApi(createdItemId, ExampleFactory.updateItemQuantityWithSuccess(5));
    const body = response.data as UpdateItemResponseType;

    expect(response.status).toBe(200);
    expect(body.failures).toHaveLength(0); // a 200 with failures is a silent partial failure
    expect(body.successes).toHaveLength(1);
    expect(body.data[0].quantity).toBe(5);
  });

  it('POST /items - create item with invalid input', async () => {
    // covering test {ticket-id}
    try {
      await ExampleApi.createItemByApi(ExampleFactory.createItemWithErrors());
      fail('Request should have failed but succeeded.'); // mandatory guard against false positives
    } catch (error: any) {
      const responseData = error.response.data as ErrorResponseType;
      expect(error.response.status).toBe(400);
      expect(responseData.errors.length).toBeGreaterThan(0);
    }
  });

  it('DELETE /items/{id} - delete item with success', async () => {
    // covering test {ticket-id}
    const response = await ExampleApi.deleteItemByApi(createdItemId);

    expect(response.status).toBe(200);
    expect(await ExampleApi.itemExists(createdItemId)).toBe(false);
    createdItemId = 0;
  });
});
