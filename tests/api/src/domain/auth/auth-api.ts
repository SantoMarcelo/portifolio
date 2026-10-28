import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { AuthEndpoints } from "../../shared/endpoints";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import {
  SessionCache,
  readSessionCache,
  sessionKey,
} from "../../shared/auth-session-cache";
import { UserCredentials } from "../../fixtures/users/system-accounts";
import { anyStatus, NO_AUTH } from "../../shared/request-options";
import {
  LoginRequest,
  LoginResponseType,
  RegisterRequest,
  UserType,
} from "./auth-types";

/**
 * Logs in through `POST /auth/login` and uses the returned JWT as a Bearer token.
 *
 * Specs never log in through the UI: they call `loginAndGetToken` once per suite and every
 * request made by `HttpClientAdapter` carries `Authorization: Bearer <token>` from then on.
 */
export class AuthApi {
  /**
   * Tokens keyed by user, lazily loaded from the globalSetup cache. Each Jest
   * worker keeps its own copy — it is a read-through cache, never written back
   * to disk from a worker, so concurrent workers cannot corrupt the file.
   */
  private static sessions: SessionCache | undefined;

  /** Calls the login endpoint and makes the returned token the active one. */
  static async performLogin(userCredentials: UserCredentials): Promise<string> {
    if (!userCredentials.userName || !userCredentials.password) {
      throw new Error(
        "Missing login credentials: set DEFAULT_USER_USERNAME/PASSWORD and ADMIN_USER_USERNAME/PASSWORD in tests/.env (copy .env.example)",
      );
    }

    try {
      const response = await HttpClientAdapter.post<LoginResponseType>(
        `${config.baseURL}${AuthEndpoints.LOGIN}`,
        { email: userCredentials.userName, password: userCredentials.password },
        { headers: { authorization: undefined } },
      );

      config.token = response.data.token;
      return response.data.token;
    } catch (error: any) {
      throw new Error(
        `Failed to login as ${userCredentials.userName}: ${error.message}`,
      );
    }
  }

  /**
   * Activates the session for `userCredentials` and returns its token.
   *
   * Sessions are pre-authenticated once by the Jest globalSetup, so switching
   * users mid-spec is an in-memory swap rather than a fresh login round trip.
   * Falls back to a live login when the account is missing from the cache (a
   * spec run outside Jest, or an account that failed to pre-authenticate).
   */
  static async loginAndGetToken(
    userCredentials: UserCredentials,
  ): Promise<string> {
    const key = sessionKey(userCredentials);

    if (!this.sessions) {
      this.sessions = readSessionCache();
    }

    const cachedToken = this.sessions[key];
    if (cachedToken) {
      config.token = cachedToken;
      return cachedToken;
    }

    const token = await this.performLogin(userCredentials);
    this.sessions[key] = token;
    return token;
  }

  /**
   * Discards the cached token for a user and logs in again.
   * Use when a token is rejected mid-run (expired or invalidated).
   */
  static async refreshSession(
    userCredentials: UserCredentials,
  ): Promise<string> {
    const token = await this.performLogin(userCredentials);

    if (!this.sessions) {
      this.sessions = readSessionCache();
    }
    this.sessions[sessionKey(userCredentials)] = token;

    return token;
  }

  /** `POST /auth/register` — public. Returns the raw response for any status. */
  static register(
    body: RegisterRequest | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<LoginResponseType>(
      `${config.baseURL}${AuthEndpoints.REGISTER}`,
      body,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }

  /** `POST /auth/login` — raw response (does not touch the active session, unlike `performLogin`). */
  static login(body: LoginRequest | object, options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<LoginResponseType>(
      `${config.baseURL}${AuthEndpoints.LOGIN}`,
      body,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }

  /** `POST /auth/logout` — uses the active session unless `options` overrides it. */
  static logout(options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<void>(
      `${config.baseURL}${AuthEndpoints.LOGOUT}`,
      undefined,
      anyStatus(options),
    );
  }

  /** `GET /auth/me` — profile of the token owner. */
  static me(options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<UserType>(
      `${config.baseURL}${AuthEndpoints.ME}`,
      anyStatus(options),
    );
  }
}
