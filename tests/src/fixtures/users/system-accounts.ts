/**
 * Test accounts. Credentials always come from environment variables — never hardcode them.
 * To add an account: add its variables to `.env.example`, export it here and register it in
 * `ACCOUNTS` in `src/global-setup.ts` so its session is cached before the specs run.
 */
export interface UserCredentials {
  userId: number;
  secret: string;
  userName: string;
  password: string;
}

export const defaultUserCredentials: UserCredentials = {
  userId: Number(process.env.DEFAULT_USER_ID ?? 0),
  secret: process.env.DEFAULT_USER_SECRETKEY!,
  userName: process.env.DEFAULT_USER_USERNAME!,
  password: process.env.DEFAULT_USER_PASSWORD!,
};

export const adminUserCredentials: UserCredentials = {
  userId: Number(process.env.ADMIN_USER_ID ?? 0),
  secret: process.env.ADMIN_USER_SECRETKEY!,
  userName: process.env.ADMIN_USER_USERNAME!,
  password: process.env.ADMIN_USER_PASSWORD!,
};
