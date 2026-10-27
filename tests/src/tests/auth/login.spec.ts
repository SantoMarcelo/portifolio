import { AuthApi } from '../../domain/auth/auth-api';
import { defaultUserCredentials } from '../../fixtures/users/system-accounts';

// npx jest src/tests/auth/login.spec.ts
describe('Auth login tests', () => {
  it('loginAndGetCookie - returns a session cookie for a valid user', async () => {
    const cookie = await AuthApi.loginAndGetCookie(defaultUserCredentials);

    expect(typeof cookie).toBe('string');
    expect(cookie.length).toBeGreaterThan(0);
  });
});
