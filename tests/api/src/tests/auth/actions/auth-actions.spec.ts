import { randomUUID } from "crypto";
import { AuthApi } from "../../../domain/auth/auth-api";
import { TestUtilsApi } from "../../../domain/test-utils/test-utils-api";
import { expectApiError } from "../../../shared/assertions";
import { bearer } from "../../../shared/request-options";
import { defaultUserCredentials } from "../../../fixtures/users/system-accounts";

const newUser = () => ({
  name: "Usuário QA",
  email: `qa-${randomUUID().slice(0, 8)}@loja.com`,
  password: "Senha@1234",
});

// npx jest src/tests/auth/actions/auth-actions.spec.ts
describe("Auth - Actions", () => {
  let customerToken: string;

  beforeAll(async () => {
    customerToken = await AuthApi.loginAndGetToken(defaultUserCredentials);
  });

  describe("POST /auth/register", () => {
    it("returns 201 and creates a CUSTOMER session", async () => {
      const body = newUser();

      const response = await AuthApi.register(body);

      expect(response.status).toBe(201);
      expect(response.data.user.email).toBe(body.email);
      expect(response.data.user.role).toBe("CUSTOMER");
      expect(response.data.token.length).toBeGreaterThan(0);
    });

    it.each([
      ["invalid e-mail", { email: "not-an-email" }],
      ["password shorter than 8 characters", { password: "1234567" }],
      ["name shorter than 2 characters", { name: "A" }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, override) => {
      const response = await AuthApi.register({ ...newUser(), ...override });

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 400 VALIDATION_ERROR when the body is empty", async () => {
      const response = await AuthApi.register({});

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 409 EMAIL_ALREADY_EXISTS for an e-mail already registered", async () => {
      const response = await AuthApi.register({
        ...newUser(),
        email: defaultUserCredentials.userName,
      });

      expectApiError(response, 409, "EMAIL_ALREADY_EXISTS");
    });
  });

  describe("POST /auth/login", () => {
    it("returns 200 with the session of the logged user", async () => {
      const response = await AuthApi.login({
        email: defaultUserCredentials.userName,
        password: defaultUserCredentials.password,
      });

      expect(response.status).toBe(200);
      expect(response.data.user.email).toBe(defaultUserCredentials.userName);
      expect(response.data.user.role).toBe("CUSTOMER");
    });

    it.each([
      ["invalid e-mail", { email: "not-an-email", password: "Cliente@123" }],
      ["short password", { email: "cliente@loja.com", password: "123" }],
      ["missing fields", {}],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, body) => {
      const response = await AuthApi.login(body);

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 INVALID_CREDENTIALS for a wrong password", async () => {
      const response = await AuthApi.login({
        email: defaultUserCredentials.userName,
        password: "SenhaErrada@1",
      });

      expectApiError(response, 401, "INVALID_CREDENTIALS");
    });

    it("returns 401 INVALID_CREDENTIALS for an unknown e-mail", async () => {
      const response = await AuthApi.login({
        email: "ninguem@loja.com",
        password: "Cliente@123",
      });

      expectApiError(response, 401, "INVALID_CREDENTIALS");
    });
  });

  describe("POST /auth/logout", () => {
    it("returns 204 for an authenticated user", async () => {
      const response = await AuthApi.logout(bearer(customerToken));

      expect(response.status).toBe(204);
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      const response = await AuthApi.logout({
        headers: { authorization: undefined },
      });

      expectApiError(response, 401, "UNAUTHORIZED");
    });

    it("returns 401 INVALID_TOKEN for a malformed token", async () => {
      const response = await AuthApi.logout(bearer("not.a.jwt"));

      expectApiError(response, 401, "INVALID_TOKEN");
    });
  });

  describe("GET /auth/me", () => {
    it("returns 200 with the profile of the token owner", async () => {
      const response = await AuthApi.me(bearer(customerToken));

      expect(response.status).toBe(200);
      expect(response.data.email).toBe(defaultUserCredentials.userName);
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      const response = await AuthApi.me({
        headers: { authorization: undefined },
      });

      expectApiError(response, 401, "UNAUTHORIZED");
    });

    it("returns 401 INVALID_TOKEN for a malformed token", async () => {
      const response = await AuthApi.me(bearer("not.a.jwt"));

      expectApiError(response, 401, "INVALID_TOKEN");
    });

    it("returns 401 TOKEN_EXPIRED for an expired token", async () => {
      const expired = await TestUtilsApi.issueExpiredToken({
        email: defaultUserCredentials.userName,
      });

      const response = await AuthApi.me(bearer(expired.data.token));

      expectApiError(response, 401, "TOKEN_EXPIRED");
    });
  });
});
