import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
import fs from 'fs';
import { config } from '../config/config';

export class HttpClientAdapter {
  // mTLS is optional: the agent only loads the files that are configured (see config.certs).
  private static httpsAgent = new https.Agent({
    ...(config.certs.key && { key: fs.readFileSync(config.certs.key) }),
    ...(config.certs.cert && { cert: fs.readFileSync(config.certs.cert) }),
    ...(config.certs.ca && { ca: fs.readFileSync(config.certs.ca) }),
  });

  static async request<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const headers = {
      accept: 'application/json, text/plain, */*',
      cookie: config.cookie,
      ...options.headers,
    };

    try {
      const response = await axios.request<T>({ ...options, headers, httpsAgent: this.httpsAgent });
      return response;
    } catch (error: any) {
      if (error.response) {
        const { method, url } = error.config ?? {};
        const path = url ? new URL(url).pathname : 'unknown';
        console.error(`[${method?.toUpperCase()} ${error.response.status}] ${path}`);
        console.error(JSON.stringify(error.response.data));
      } else {
        console.error('Request Error:', error.message);
      }
      throw error;
    }
  }

  static get<T>(endpoint: string, options?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'GET',
      url: endpoint,
      ...options,
    });
  }

  static post<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'POST',
      url: endpoint,
      data,
      ...options,
    });
  }

  static put<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'PUT',
      url: endpoint,
      data,
      ...options,
    });
  }

  static patch<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'PATCH',
      url: endpoint,
      data,
      ...options,
    });
  }

  static delete<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'DELETE',
      url: endpoint,
      data,
      ...options,
    });
  }
}
