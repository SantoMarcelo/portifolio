import { randomUUID } from "crypto";
import { AuthApi } from "../../../domain/auth/auth-api";
import { AuthSessionSchema, UserSchema } from "../../../domain/auth/auth-types";
import { ErrorResponseSchema } from "../../../domain/common/common-types";
import SchemaValidator from "../../../shared/schema-validator-adapter";
import { bearer } from "../../../shared/request-options";
import { defaultUserCredentials } from "../../../fixtures/users/system-accounts";

const matches = (
  schema: Parameters<typeof SchemaValidator.validateSchema>[0],
  data: unknown,
) => SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/auth/contract/auth-contract.spec.ts
describe("Auth - Contract", () => {
  it("POST /auth/register - 201 matches the session schema", async () => {
    const response = await AuthApi.register({
      name: "Usuário QA",
      email: `qa-${randomUUID().slice(0, 8)}@loja.com`,
      password: "Senha@1234",
    });

    expect(matches(AuthSessionSchema, response.data)).toBeUndefined();
  });

  it("POST /auth/register - 400 matches the error schema", async () => {
    const response = await AuthApi.register({});

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /auth/login - 200 matches the session schema", async () => {
    const response = await AuthApi.login({
      email: defaultUserCredentials.userName,
      password: defaultUserCredentials.password,
    });

    expect(matches(AuthSessionSchema, response.data)).toBeUndefined();
  });

  it("POST /auth/login - 401 matches the error schema", async () => {
    const response = await AuthApi.login({
      email: defaultUserCredentials.userName,
      password: "SenhaErrada@1",
    });

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /auth/me - 200 matches the user schema", async () => {
    const token = await AuthApi.loginAndGetToken(defaultUserCredentials);

    const response = await AuthApi.me(bearer(token));

    expect(matches(UserSchema, response.data)).toBeUndefined();
  });

  it("GET /auth/me - 401 matches the error schema", async () => {
    const response = await AuthApi.me({
      headers: { authorization: undefined },
    });

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});
