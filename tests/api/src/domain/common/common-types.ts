import { z } from "zod";

/** Error envelope returned by every failing endpoint: `{ error: { code, message, details } }`. */
export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(z.unknown()).optional(),
  }),
});
export type ErrorResponseType = z.infer<typeof ErrorResponseSchema>;

export const PaginationSchema = z.object({
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

/** Paginated envelope: `{ data: item[], pagination }`. */
export const pageOf = <T extends z.ZodType>(item: T) =>
  z.object({ data: z.array(item), pagination: PaginationSchema });

export type PageQuery = { page?: number | string; pageSize?: number | string };

export const DateTimeSchema = z.iso.datetime();

export type PageOf<T> = {
  data: T[];
  pagination: z.infer<typeof PaginationSchema>;
};
