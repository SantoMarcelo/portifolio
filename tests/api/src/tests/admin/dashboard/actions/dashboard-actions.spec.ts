import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminDashboardApi } from "../../../../domain/admin/dashboard/dashboard-api";
import { expectApiError } from "../../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

// npx jest src/tests/admin/dashboard/actions/dashboard-actions.spec.ts
describe("Admin dashboard - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  it("GET /admin/dashboard - returns 200 with consistent totals", async () => {
    const response = await AdminDashboardApi.get(asAdmin);

    expect(response.status).toBe(200);
    const {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalOrders,
      ordersByStatus,
    } = response.data;
    expect(Object.keys(ordersByStatus).sort()).toEqual([
      "CANCELLED",
      "PAID",
      "PAYMENT_FAILED",
      "PENDING",
    ]);
    expect(Object.values(ordersByStatus).reduce((sum, n) => sum + n, 0)).toBe(
      totalOrders,
    );
    expect(outOfStockProducts).toBeLessThanOrEqual(lowStockProducts);
    expect(lowStockProducts).toBeLessThanOrEqual(totalProducts);
  });

  it("GET /admin/dashboard - returns 401 UNAUTHORIZED without a token", async () => {
    expectApiError(await AdminDashboardApi.get(NO_AUTH), 401, "UNAUTHORIZED");
  });

  it("GET /admin/dashboard - returns 403 FORBIDDEN for a CUSTOMER", async () => {
    expectApiError(await AdminDashboardApi.get(asCustomer), 403, "FORBIDDEN");
  });
});
