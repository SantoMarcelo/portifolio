import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminDashboardApi } from "../../../../domain/admin/dashboard/dashboard-api";
import { DashboardSchema } from "../../../../domain/admin/dashboard/dashboard-types";
import { ErrorResponseSchema } from "../../../../domain/common/common-types";
import SchemaValidator from "../../../../shared/schema-validator-adapter";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

// npx jest src/tests/admin/dashboard/contract/dashboard-contract.spec.ts
describe("Admin dashboard - Contract", () => {
  it("GET /admin/dashboard - 200 matches the dashboard schema", async () => {
    const token = await AuthApi.loginAndGetToken(adminUserCredentials);

    const response = await AdminDashboardApi.get(bearer(token));

    expect(
      SchemaValidator.validateSchema(DashboardSchema, response.data).error,
    ).toBeUndefined();
  });

  it("GET /admin/dashboard - 401 matches the error schema", async () => {
    const response = await AdminDashboardApi.get(NO_AUTH);

    expect(
      SchemaValidator.validateSchema(ErrorResponseSchema, response.data).error,
    ).toBeUndefined();
  });

  it("GET /admin/dashboard - 403 matches the error schema", async () => {
    const token = await AuthApi.loginAndGetToken(defaultUserCredentials);

    const response = await AdminDashboardApi.get(bearer(token));

    expect(
      SchemaValidator.validateSchema(ErrorResponseSchema, response.data).error,
    ).toBeUndefined();
  });
});
