import { z } from "zod";

export const DashboardSchema = z.object({
  totalProducts: z.number().int(),
  inactiveProducts: z.number().int(),
  lowStockProducts: z.number().int(),
  outOfStockProducts: z.number().int(),
  totalOrders: z.number().int(),
  ordersByStatus: z.record(z.string(), z.number().int()),
});
export type DashboardType = z.infer<typeof DashboardSchema>;
