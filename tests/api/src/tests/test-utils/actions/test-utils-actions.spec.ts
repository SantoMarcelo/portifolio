import { AuthApi } from "../../../domain/auth/auth-api";
import { TestUtilsApi } from "../../../domain/test-utils/test-utils-api";
import { expectApiError } from "../../../shared/assertions";
import { bearer } from "../../../shared/request-options";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../fixtures/users/system-accounts";

// npx jest src/tests/test-utils/actions/test-utils-actions.spec.ts
// `reset` wipes every table: run this spec serially (npm test / --runInBand), never beside other specs.
describe("Test utils - Actions", () => {
  describe("POST /api/test/token", () => {
    it("returns 201 with a token that authenticates the requested user", async () => {
      const response = await TestUtilsApi.issueToken({
        email: defaultUserCredentials.userName,
        expiresInSeconds: 3600,
      });

      expect(response.status).toBe(201);
      expect(response.data.expiresIn).toBe(3600);

      const me = await AuthApi.me(bearer(response.data.token));
      expect(me.status).toBe(200);
      expect(me.data.email).toBe(defaultUserCredentials.userName);
    });

    it("returns 404 USER_NOT_FOUND for an unknown e-mail", async () => {
      const response = await TestUtilsApi.issueToken({
        email: "ninguem@loja.com",
      });

      expectApiError(response, 404, "USER_NOT_FOUND");
    });
  });

  describe("POST /api/test/expired-token", () => {
    it("returns 201 with a token that is rejected as TOKEN_EXPIRED", async () => {
      const response = await TestUtilsApi.issueExpiredToken({
        email: adminUserCredentials.userName,
      });

      expect(response.status).toBe(201);
      expect(response.data.expiresIn).toBeLessThanOrEqual(0);

      const me = await AuthApi.me(bearer(response.data.token));
      expectApiError(me, 401, "TOKEN_EXPIRED");
    });

    it("returns 404 USER_NOT_FOUND for an unknown e-mail", async () => {
      const response = await TestUtilsApi.issueExpiredToken({
        email: "ninguem@loja.com",
      });

      expectApiError(response, 404, "USER_NOT_FOUND");
    });
  });

  describe("POST /api/test/seed", () => {
    it("returns 200 and keeps the seed users able to log in", async () => {
      const response = await TestUtilsApi.seed();

      expect(response.status).toBe(200);

      const login = await AuthApi.login({
        email: defaultUserCredentials.userName,
        password: defaultUserCredentials.password,
      });
      expect(login.status).toBe(200);
    });
  });

  describe("POST /api/test/reset", () => {
    it("returns 200 and restores the seed users", async () => {
      const response = await TestUtilsApi.reset();

      expect(response.status).toBe(200);

      const login = await AuthApi.login({
        email: adminUserCredentials.userName,
        password: adminUserCredentials.password,
      });
      expect(login.status).toBe(200);
      expect(login.data.user.role).toBe("ADMIN");
    });
  });
});
