/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/**
 * Endpoint enums.
 *
 * One enum per domain/feature, values are paths relative to `config.baseURL`.
 * Never hardcode URL strings elsewhere — reference these enums. Path parameters use the
 * `{param}` syntax and are resolved with `buildEndpoint()` from `helpers.ts`.
 */

// Example (replace with your own domains)
export enum ExampleEndpoints {
  SEARCH_ITEMS = '/items/search',
  CREATE_ITEM = '/items',
  UPDATE_ITEM = '/items/{id}',
  DELETE_ITEM = '/items/{id}',
  EXPORT_ITEMS = '/items/export',
  IMPORT_ITEMS = '/items/import',
}
