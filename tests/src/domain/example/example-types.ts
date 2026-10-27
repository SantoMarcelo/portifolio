import SchemaValidator, { schemaValidatorInfer } from '../../shared/schema-validator-adapter';

const sv = SchemaValidator.getSchemaValidatorClient();

// Each request/response schema is self-contained: fields are always declared inline,
// never composed from shared helper schemas.

export const SearchItemsRequestSchema = sv.object({
  ids: sv.array(sv.number()).optional(),
  limit: sv.number(),
  offset: sv.number(),
});
export type SearchItemsRequestType = schemaValidatorInfer<typeof SearchItemsRequestSchema>;

export const SearchItemsResponseSchema = sv.array(
  sv.object({
    id: sv.number(),
    name: sv.string(),
    quantity: sv.number(),
  })
);
export type SearchItemsResponseType = schemaValidatorInfer<typeof SearchItemsResponseSchema>;

export const CreateItemRequestSchema = sv.object({
  name: sv.string(),
  quantity: sv.number(),
});
export type CreateItemRequestType = schemaValidatorInfer<typeof CreateItemRequestSchema>;

export const CreateItemResponseSchema = sv.object({
  id: sv.number(),
  name: sv.string(),
  quantity: sv.number(),
});
export type CreateItemResponseType = schemaValidatorInfer<typeof CreateItemResponseSchema>;

export const UpdateItemRequestSchema = sv.object({
  name: sv.string().optional(),
  quantity: sv.number().optional(),
});
export type UpdateItemRequestType = schemaValidatorInfer<typeof UpdateItemRequestSchema>;

// Mutations (PATCH/PUT) respond with data + successes + failures
export const UpdateItemResponseSchema = sv.object({
  data: sv.array(
    sv.object({
      id: sv.number(),
      name: sv.string(),
      quantity: sv.number(),
    })
  ),
  successes: sv.array(sv.object({ resource: sv.object({ name: sv.string(), fields: sv.array(sv.string()) }) })),
  failures: sv.array(
    sv.object({
      resource: sv.object({ name: sv.string(), fields: sv.array(sv.string()) }),
      errors: sv.array(
        sv.object({ statusCode: sv.number(), title: sv.string(), detail: sv.string(), code: sv.string() })
      ),
    })
  ),
});
export type UpdateItemResponseType = schemaValidatorInfer<typeof UpdateItemResponseSchema>;

export const ErrorResponseSchema = sv.object({
  errors: sv.array(sv.object({ statusCode: sv.number(), title: sv.string(), detail: sv.string(), code: sv.string() })),
});
export type ErrorResponseType = schemaValidatorInfer<typeof ErrorResponseSchema>;
