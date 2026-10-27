import { config } from '../../config/config';
import authenticator from 'authenticator';
import { HttpClientAdapter } from '../../shared/http-client-adapter';
import { SessionCache, readSessionCache, sessionKey } from '../../shared/auth-session-cache';
import { UserCredentials } from '../../fixtures/users/system-accounts';

/**
 * Multi-step login: corp JWT (user + password + TOTP) -> OAuth2 token -> auth code -> session cookies.
 *
 * Every endpoint, client id and header name comes from the environment (see `.env.example`).
 * The flow is a reference implementation: adapt the payloads and cookie names in this file to the
 * identity provider of your project, and keep the public API (`loginAndGetCookie`, `refreshSession`)
 * stable so the specs do not change.
 */
export class AuthApi {
  /**
   * Cookies keyed by user, lazily loaded from the globalSetup cache. Each Jest
   * worker keeps its own copy — it is a read-through cache, never written back
   * to disk from a worker, so concurrent workers cannot corrupt the file.
   */
  private static sessions: SessionCache | undefined;

  /** Names of the cookies that must come back from the session endpoint, e.g. `sessionid,connect.sid`. */
  private static get sessionCookieNames(): string[] {
    return (process.env.AUTH_SESSION_COOKIES ?? 'sessionid')
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean);
  }

  static async getCorpJwt(userCredentials: UserCredentials) {
    const secretToken = authenticator.generateToken(userCredentials.secret);
    const payload = {
      secondFactor: { secCode: secretToken, deviceId: 1 },
      appCredentials: { appIdKey: process.env.AUTH_APP_ID },
      account: {
        accountName: userCredentials.userName,
        password: userCredentials.password,
      },
      generateJwt: true,
      oauthAuthorizeRequest: {
        clientId: process.env.AUTH_CLIENT_ID,
        responseType: 'code',
        scope: 'openid',
      },
    };

    const response = await HttpClientAdapter.post<{ corpJwt: string }>(process.env.AUTH_LOGIN_ENDPOINT!, payload, {
      headers: { cookie: undefined },
    });

    return response.data.corpJwt;
  }

  static async getAuthToken(corpJwt: string) {
    const response = await HttpClientAdapter.post<{
      id_token: string;
      access_token: string;
    }>(
      process.env.AUTH_OAUTH_TOKEN_ENDPOINT!,
      {
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
        grant_type: process.env.AUTH_GRANT_TYPE,
        assertion: corpJwt,
        scope: 'openid',
      },
      {
        headers: { cookie: undefined },
      }
    );

    return {
      id_token: response.data.id_token,
      access_token: response.data.access_token,
    };
  }

  static async getAuthCode(corpJwt: string): Promise<string> {
    try {
      const response = await HttpClientAdapter.get<{ code: string }>(process.env.AUTH_OAUTH_AUTHCODE_ENDPOINT!, {
        params: {
          client_id: process.env.AUTH_CLIENT_ID,
          redirect_uri: `${process.env.BASE_URL}/__login`,
          response_type: 'code',
          scope: 'openid',
        },
        headers: {
          [process.env.AUTH_JWT_HEADER ?? 'X-Corp-Auth-Jwt']: corpJwt,
          Accept: 'application/json',
          cookie: undefined,
        },
        maxRedirects: 0,
        validateStatus: () => true,
      });

      // The code can come back in a redirect, in the body, or in the final URL.
      if ((response.status === 302 || response.status === 301) && response.headers.location) {
        const authCode = new URL(response.headers.location).searchParams.get('code');
        if (authCode) return authCode;
      }

      if (response.status === 200 && response.data?.code) {
        return response.data.code;
      }

      const finalUrl = response.request?.res?.responseUrl;
      if (finalUrl) {
        const authCode = new URL(finalUrl).searchParams.get('code');
        if (authCode) return authCode;
      }

      throw new Error('Auth code not found in the identity provider response');
    } catch (error: any) {
      throw new Error(`Failed to get auth code: ${error.message}`);
    }
  }

  static async getSessionCookies(
    authCode: string,
    id_token: string,
    access_token: string
  ): Promise<Record<string, string>> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        accept: '*/*',
        cookie: `oidc-token=${id_token}; oidc-token-access=${access_token}`,
        origin: process.env.BASE_URL,
        referer: `${process.env.BASE_URL}/`,
      };

      const response = await HttpClientAdapter.post(config.authLoginURL, { input: { authCode } }, { headers });
      const setCookies = response.headers['set-cookie'] || [];
      const found: Record<string, string> = {};

      setCookies.forEach((cookie) => {
        const [nameValue] = cookie.split(';');
        const eqIndex = nameValue.indexOf('=');
        found[nameValue.slice(0, eqIndex).trim().toLowerCase()] = nameValue.slice(eqIndex + 1);
      });

      const missing = this.sessionCookieNames.filter((name) => !found[name.toLowerCase()]);
      if (missing.length > 0) {
        throw new Error(`Failed to extract required cookies from login response. Missing: ${missing.join(', ')}.`);
      }

      return Object.fromEntries(this.sessionCookieNames.map((name) => [name, found[name.toLowerCase()]]));
    } catch (error: any) {
      console.error('--- Login Error ---');
      console.error('Status:', error.response?.status);
      console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
      throw new Error(`Failed to set session: ${error.message}`);
    }
  }

  /**
   * Runs the full flow (corp JWT -> OAuth2 -> 2FA -> session cookie).
   *
   * Must not be called concurrently: many identity providers reject parallel OAuth
   * code exchanges with `invalid_grant`. Prefer `loginAndGetCookie`, which reuses
   * the session cached by globalSetup.
   */
  static async performLogin(userCredentials: UserCredentials): Promise<string> {
    try {
      const corpJwt = await this.getCorpJwt(userCredentials);
      const { id_token, access_token } = await this.getAuthToken(corpJwt);
      const authCode = await this.getAuthCode(corpJwt);
      const sessionCookies = await this.getSessionCookies(authCode, id_token, access_token);

      const cookieString = [
        ...Object.entries(sessionCookies).map(([name, value]) => `${name}=${value}`),
        `oidc-token-local=${id_token}`,
        `oidc-token=${access_token}`,
      ].join('; ');

      config.cookie = cookieString;
      return cookieString;
    } catch (error: any) {
      console.error('❌ Error in the authentication process:', error);
      throw new Error(`Failed to login and get cookie: ${error.message}`);
    }
  }

  /**
   * Activates the session for `userCredentials` and returns its cookie.
   *
   * Sessions are pre-authenticated once by the Jest globalSetup, so switching
   * users mid-spec is an in-memory swap rather than a fresh login round trip.
   * Falls back to a live login when the account is missing from the cache (a
   * spec run outside Jest, or an account that failed to pre-authenticate).
   */
  static async loginAndGetCookie(userCredentials: UserCredentials): Promise<string> {
    const key = sessionKey(userCredentials);

    if (!this.sessions) {
      this.sessions = readSessionCache();
    }

    const cachedCookie = this.sessions[key];
    if (cachedCookie) {
      config.cookie = cachedCookie;
      return cachedCookie;
    }

    const cookieString = await this.performLogin(userCredentials);
    this.sessions[key] = cookieString;
    return cookieString;
  }

  /**
   * Discards the cached session for a user and logs in again.
   * Use when a session is rejected mid-run (an expired or invalidated cookie).
   */
  static async refreshSession(userCredentials: UserCredentials): Promise<string> {
    const cookieString = await this.performLogin(userCredentials);

    if (!this.sessions) {
      this.sessions = readSessionCache();
    }
    this.sessions[sessionKey(userCredentials)] = cookieString;

    return cookieString;
  }
}
