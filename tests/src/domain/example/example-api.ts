import { config } from '../../config/config';
import { ExampleEndpoints } from '../../shared/endpoints';
import { buildEndpoint, createFormDataWithFile, saveFileIfEnabled } from '../../shared/helpers';
import { HttpClientAdapter } from '../../shared/http-client-adapter';
import { ExportDataRequestType } from '../../shared/types/export-data-type';
import { ApiResponse, UploadResponseType } from '../../shared/types';
import {
  CreateItemRequestType,
  CreateItemResponseType,
  SearchItemsRequestType,
  SearchItemsResponseType,
  UpdateItemRequestType,
  UpdateItemResponseType,
} from './example-types';

/**
 * Reference API class. All methods are static; every HTTP call goes through `HttpClientAdapter`
 * and every URL comes from an endpoint enum. Scope (ids, filters) is always a parameter.
 */
export class ExampleApi {
  // search* -> POST with a filter body, returns a list
  static async searchItems(params: SearchItemsRequestType): Promise<SearchItemsResponseType> {
    const response = await HttpClientAdapter.post(`${config.baseURL}${ExampleEndpoints.SEARCH_ITEMS}`, params);
    return response.data as SearchItemsResponseType;
  }

  // get* -> fetch a single value; filtering lives here, never in the spec
  static async getItemById(id: number): Promise<SearchItemsResponseType[number]> {
    const items = await this.searchItems({ ids: [id], limit: 1, offset: 0 });
    const item = items.find((candidate) => candidate.id === id);
    if (!item) throw new Error(`Item ${id} not found.`);
    return item;
  }

  static async itemExists(id: number): Promise<boolean> {
    const items = await this.searchItems({ ids: [id], limit: 1, offset: 0 });
    return items.some((candidate) => candidate.id === id);
  }

  // REST calls use the ByApi suffix and return ApiResponse<T>
  static async createItemByApi(body: CreateItemRequestType): Promise<ApiResponse<CreateItemResponseType>> {
    const response = await HttpClientAdapter.post(`${config.baseURL}${ExampleEndpoints.CREATE_ITEM}`, body);
    return { status: response.status, data: response.data as CreateItemResponseType };
  }

  static async updateItemByApi(id: number, body: UpdateItemRequestType): Promise<ApiResponse<UpdateItemResponseType>> {
    const endpoint = buildEndpoint(ExampleEndpoints.UPDATE_ITEM, { id });
    const response = await HttpClientAdapter.patch(`${config.baseURL}${endpoint}`, body);
    return { status: response.status, data: response.data as UpdateItemResponseType };
  }

  static async deleteItemByApi(id: number): Promise<ApiResponse<unknown>> {
    const endpoint = buildEndpoint(ExampleEndpoints.DELETE_ITEM, { id });
    const response = await HttpClientAdapter.delete(`${config.baseURL}${endpoint}`);
    return { status: response.status, data: response.data };
  }

  // cleanup* -> test teardown, reuses other methods and never throws
  static async cleanupItem(id: number): Promise<void> {
    try {
      if (await this.itemExists(id)) await this.deleteItemByApi(id);
    } catch {
      // teardown must not fail the suite
    }
  }

  // export* / download* -> arraybuffer + saveFileIfEnabled
  static async exportItems(request: ExportDataRequestType) {
    const response = await HttpClientAdapter.post(`${config.baseURL}${ExampleEndpoints.EXPORT_ITEMS}`, request.body, {
      responseType: 'arraybuffer',
    });
    saveFileIfEnabled(request.filename, response.data as ArrayBuffer);
    return response;
  }

  // upload* -> createFormDataWithFile + form.getHeaders()
  static async uploadItems(filePath: string): Promise<ApiResponse<UploadResponseType>> {
    const form = createFormDataWithFile(filePath);
    const response = await HttpClientAdapter.post(`${config.baseURL}${ExampleEndpoints.IMPORT_ITEMS}`, form, {
      headers: form.getHeaders(),
    });
    return { status: response.status, data: response.data as UploadResponseType };
  }
}
