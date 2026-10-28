import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { TestUtilsEndpoints } from "../../shared/endpoints";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import { anyStatus, NO_AUTH } from "../../shared/request-options";
import { IssuedTokenType } from "./test-utils-types";

/**
 * Helpers exposed by the backend for automation (disabled in production).
 * `reset` wipes ALL data — never run it while other specs are executing in parallel.
 */
export class TestUtilsApi {
  private static url(endpoint: TestUtilsEndpoints) {
    return `${config.serverURL}${endpoint}`;
  }

  /** Wipes the database and re-creates the seed users and products. */
  static reset(options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<{ message: string }>(
      this.url(TestUtilsEndpoints.RESET),
      undefined,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }

  /** Idempotent: restores seed users and products without deleting other data. */
  static seed(options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<{ message: string }>(
      this.url(TestUtilsEndpoints.SEED),
      undefined,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }

  /** Issues a token for an existing user. `expiresInSeconds` <= 0 yields an already expired token. */
  static issueToken(
    body: { email?: string; expiresInSeconds?: number } = {},
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<IssuedTokenType>(
      this.url(TestUtilsEndpoints.TOKEN),
      body,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }

  static issueExpiredToken(
    body: { email?: string } = {},
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<IssuedTokenType>(
      this.url(TestUtilsEndpoints.EXPIRED_TOKEN),
      body,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }
}
