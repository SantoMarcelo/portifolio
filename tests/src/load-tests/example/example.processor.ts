// npx artillery run src/load-tests/example/export-example.yml
import { ExampleApi } from '../../domain/example/example-api';
import { ExportPayloadFactory } from '../../domain/example/factories/export-payload-factory';
import { AuthApi } from '../../domain/auth/auth-api';
import { defaultUserCredentials } from '../../fixtures/users/system-accounts';
import { EXAMPLE_ITEMS } from '../../fixtures/entities/example-items';

// `before` runs once, before any virtual user — a single login avoids parallel OAuth
// code exchanges, which most identity providers reject with invalid_grant.
export async function authenticate(): Promise<void> {
  await AuthApi.loginAndGetCookie(defaultUserCredentials);
}

// Artillery passes flow functions `(context, events)` — context first, events (the metrics
// EventEmitter) second. We only need `events`, so context is prefixed with `_`.
export async function exportItems(_context: any, events: any): Promise<void> {
  try {
    const start = Date.now();

    const response = await ExampleApi.exportItems({
      body: ExportPayloadFactory.createExportItemsWithSuccess([EXAMPLE_ITEMS.ITEM_A.id]),
      filename: 'example-load-test.xlsx',
    });

    if (response.status !== 200) {
      throw new Error(`Unexpected status: ${response.status}`);
    }

    events.emit('counter', 'example.success', 1);
    events.emit('histogram', 'example.latency_ms', Date.now() - start);
    events.emit('histogram', 'example.response_size_bytes', (response.data as ArrayBuffer).byteLength);
  } catch (err: any) {
    events.emit('counter', 'example.error', 1);
    events.emit('counter', `example.error.${err?.response?.status ?? 'unknown'}`, 1);
  }
}
