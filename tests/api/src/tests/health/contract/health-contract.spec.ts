import { HealthApi } from "../../../domain/health/health-api";
import { HealthResponseSchema } from "../../../domain/health/health-types";
import SchemaValidator from "../../../shared/schema-validator-adapter";

// npx jest src/tests/health/contract/health-contract.spec.ts
describe("Health - Contract", () => {
  it("GET /api/health - 200 matches the health schema", async () => {
    const response = await HealthApi.check();

    const result = SchemaValidator.validateSchema(
      HealthResponseSchema,
      response.data,
    );
    expect(result.error).toBeUndefined();
  });
});
