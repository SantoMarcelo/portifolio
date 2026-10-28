import fs from 'fs';
import path from 'path';
import { UserCredentials } from '../fixtures/users/system-accounts';

/**
 * On-disk cache of session tokens produced by the Jest globalSetup.
 *
 * globalSetup logs every user in once through `POST /auth/login` and writes the
 * resulting JWTs here. Jest workers then read this file instead of repeating the
 * login (bcrypt makes it CPU-bound on the server).
 */

const CACHE_PATH = path.resolve(process.cwd(), '.auth-sessions.json');

/** Bearer tokens keyed by the credential's userName. */
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
