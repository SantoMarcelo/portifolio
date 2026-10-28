import { z } from "zod";
import { DateTimeSchema } from "../common/common-types";

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "CUSTOMER"]),
  createdAt: DateTimeSchema,
});

export const AuthSessionSchema = z.object({
  token: z.string(),
  expiresIn: z.number().int(),
  expiresAt: DateTimeSchema,
  user: UserSchema,
});

export type UserType = z.infer<typeof UserSchema>;
export type LoginResponseType = z.infer<typeof AuthSessionSchema>;

export type RegisterRequest = { name: string; email: string; password: string };
export type LoginRequest = { email: string; password: string };
