import fs from 'fs';
import path from 'path';
import { UserCredentials } from '../fixtures/users/system-accounts';

/**
 * On-disk cache of session cookies produced by the Jest globalSetup.
 *
 * The login flow (corp JWT -> OAuth2 -> 2FA -> session cookie) cannot run
 * concurrently: parallel OAuth code exchanges are rejected with `invalid_grant`,
 * and the TOTP code is only valid inside a 30s window. globalSetup therefore
 * logs every user in once, sequentially, and writes the resulting cookies here.
 * Jest workers then read this file instead of hitting the identity provider again.
 */

const CACHE_PATH = path.resolve(process.cwd(), '.auth-sessions.json');

/** Cookie strings keyed by the credential's userName. */
export type SessionCache = Record<string, string>;

/**
 * Identifies a credential in the cache. `userName` is the only field guaranteed
 * to be both unique and present for every account in `fixtures/users`.
 */
export function sessionKey(credentials: UserCredentials): string {
  return credentials.userName;
}

export function writeSessionCache(sessions: SessionCache): void {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(sessions, null, 2));
}

export function readSessionCache(): SessionCache {
  if (!fs.existsSync(CACHE_PATH)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) as SessionCache;
  } catch {
    // A truncated or corrupt cache should not be fatal — callers fall back to a
    // live login.
    return {};
  }
}

export function clearSessionCache(): void {
  if (fs.existsSync(CACHE_PATH)) {
    fs.unlinkSync(CACHE_PATH);
  }
}

export { CACHE_PATH };
