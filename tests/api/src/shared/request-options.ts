import { AxiosRequestConfig } from "axios";

/**
 * Per-request overrides shared by every API class.
 *
 * API methods return the raw response for any status code, so specs can assert on 4xx/5xx
 * without try/catch. Use these helpers to control who the request is sent as.
 */

/** Sends the request without the `Authorization` header (expects 401 on protected routes). */
export const NO_AUTH: AxiosRequestConfig = {
  headers: { authorization: undefined },
};

/** Sends the request as the owner of `token`, regardless of the active session. */
export const bearer = (token: string): AxiosRequestConfig => ({
  headers: { authorization: `Bearer ${token}` },
});

/** Resolves for every HTTP status instead of throwing on 4xx/5xx. */
export function anyStatus(options?: AxiosRequestConfig): AxiosRequestConfig {
  return { ...options, validateStatus: () => true };
}
