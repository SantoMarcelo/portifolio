import { AuthApi } from "../../domain/auth/auth-api";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../fixtures/users/system-accounts";

// npx jest src/tests/auth/login.spec.ts
describe("Auth login tests", () => {
  it("loginAndGetToken - returns a bearer token for a valid user", async () => {
    const token = await AuthApi.loginAndGetToken(defaultUserCredentials);

    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("performLogin - returns a fresh token for the admin account", async () => {
    const token = await AuthApi.performLogin(adminUserCredentials);

    expect(token.split(".")).toHaveLength(3); // JWT: header.payload.signature
  });

  it("performLogin - rejects invalid credentials", async () => {
    await expect(
      AuthApi.performLogin({
        ...defaultUserCredentials,
        password: "wrong-password",
      }),
    ).rejects.toThrow(/Failed to login/);
  });
});
