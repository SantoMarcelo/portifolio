import dotenv from 'dotenv';
import { AuthApi } from './domain/auth/auth-api';
import { SessionCache, sessionKey, writeSessionCache } from './shared/auth-session-cache';
import { adminUserCredentials, defaultUserCredentials, UserCredentials } from './fixtures/users/system-accounts';

dotenv.config();

/**
 * Every account the suite authenticates with. Adding a credential here makes it
 * available to `AuthApi.loginAndGetCookie` without any extra wiring.
 */
const ACCOUNTS: UserCredentials[] = [defaultUserCredentials, adminUserCredentials];

/**
 * Jest globalSetup: authenticates every account once, before any worker starts.
 *
 * Logins run strictly sequentially. Identity providers commonly reject concurrent OAuth code exchanges
 * with `invalid_grant`, so this loop must never be turned into a `Promise.all`.
 *
 * A failure here is not fatal: the account is simply absent from the cache and
 * the spec that needs it falls back to logging in on demand. That keeps a single
 * misconfigured credential from taking the whole run down.
 */
export default async function globalSetup(): Promise<void> {
  const sessions: SessionCache = {};
  const failed: string[] = [];

  for (const credentials of ACCOUNTS) {
    if (!credentials.userName || !credentials.password || !credentials.secret) {
      // Not every environment has all accounts provisioned.
      continue;
    }

    try {
      sessions[sessionKey(credentials)] = await AuthApi.loginAndGetCookie(credentials);
    } catch (error: any) {
      failed.push(`${credentials.userName}: ${error.message}`);
    }
  }

  writeSessionCache(sessions);

  console.log(`\n[auth] cached ${Object.keys(sessions).length}/${ACCOUNTS.length} sessions`);
  if (failed.length > 0) {
    console.warn(`[auth] failed to pre-authenticate (specs will log in on demand):\n  - ${failed.join('\n  - ')}`);
  }
}
