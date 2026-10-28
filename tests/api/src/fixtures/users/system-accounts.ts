import "dotenv/config"; // credentials are read at import time, so .env must be loaded first

/**
 * Test accounts. Credentials always come from environment variables — never hardcode them.
 * To add an account: add its variables to `.env.example`, export it here and register it in
 * `ACCOUNTS` in `src/global-setup.ts` so its token is cached before the specs run.
 */
export interface UserCredentials {
  userId: number;
  userName: string; // login e-mail
  password: string;
}

export const defaultUserCredentials: UserCredentials = {
  userId: Number(process.env.DEFAULT_USER_ID ?? 0),
  userName: process.env.DEFAULT_USER_USERNAME!,
  password: process.env.DEFAULT_USER_PASSWORD!,
};

export const adminUserCredentials: UserCredentials = {
  userId: Number(process.env.ADMIN_USER_ID ?? 0),
  userName: process.env.ADMIN_USER_USERNAME!,
  password: process.env.ADMIN_USER_PASSWORD!,
};
