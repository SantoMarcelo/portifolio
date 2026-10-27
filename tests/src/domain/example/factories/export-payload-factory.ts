/**
 * Payload factory for download/export tests. Always named `ExportPayloadFactory`, regardless of domain.
 */
export class ExportPayloadFactory {
  static createExportItemsWithSuccess(ids: number[]) {
    return { ids, limit: 1000, offset: 0 };
  }
}
