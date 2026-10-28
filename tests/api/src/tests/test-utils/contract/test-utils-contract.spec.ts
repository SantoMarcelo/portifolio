import { TestUtilsApi } from "../../../domain/test-utils/test-utils-api";
import {
  IssuedTokenSchema,
  MessageResponseSchema,
} from "../../../domain/test-utils/test-utils-types";
import { ErrorResponseSchema } from "../../../domain/common/common-types";
import SchemaValidator from "../../../shared/schema-validator-adapter";
import { defaultUserCredentials } from "../../../fixtures/users/system-accounts";

// npx jest src/tests/test-utils/contract/test-utils-contract.spec.ts
describe("Test utils - Contract", () => {
  it("POST /api/test/token - 201 matches the token schema", async () => {
    const response = await TestUtilsApi.issueToken({
      email: defaultUserCredentials.userName,
    });

    expect(
      SchemaValidator.validateSchema(IssuedTokenSchema, response.data).error,
    ).toBeUndefined();
  });

  it("POST /api/test/token - 404 matches the error schema", async () => {
    const response = await TestUtilsApi.issueToken({
      email: "ninguem@loja.com",
    });

    expect(
      SchemaValidator.validateSchema(ErrorResponseSchema, response.data).error,
    ).toBeUndefined();
  });

  it("POST /api/test/expired-token - 201 matches the token schema", async () => {
    const response = await TestUtilsApi.issueExpiredToken({
      email: defaultUserCredentials.userName,
    });

    expect(
      SchemaValidator.validateSchema(IssuedTokenSchema, response.data).error,
    ).toBeUndefined();
  });

  it("POST /api/test/seed - 200 matches the message schema", async () => {
    const response = await TestUtilsApi.seed();

    expect(
      SchemaValidator.validateSchema(MessageResponseSchema, response.data)
        .error,
    ).toBeUndefined();
  });
});
