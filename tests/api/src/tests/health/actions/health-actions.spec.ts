import { HealthApi } from "../../../domain/health/health-api";

// npx jest src/tests/health/actions/health-actions.spec.ts
// The 503 (database unavailable) response cannot be triggered from a black-box test.
describe("Health - Actions", () => {
  it("GET /api/health - returns 200 with status ok", async () => {
    const response = await HealthApi.check();

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.uptime).toBeGreaterThan(0);
  });
});
