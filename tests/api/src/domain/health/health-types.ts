import { z } from "zod";
import { DateTimeSchema } from "../common/common-types";

export const HealthResponseSchema = z.object({
  status: z.string(),
  uptime: z.number(),
  timestamp: DateTimeSchema,
});
export type HealthResponseType = z.infer<typeof HealthResponseSchema>;
