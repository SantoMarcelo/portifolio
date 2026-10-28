import { z } from "zod";
import { DateTimeSchema } from "../common/common-types";

export const MessageResponseSchema = z.object({ message: z.string() });

export const IssuedTokenSchema = z.object({
  token: z.string(),
  expiresIn: z.number().int(),
  expiresAt: DateTimeSchema,
});

export type IssuedTokenType = z.infer<typeof IssuedTokenSchema>;
