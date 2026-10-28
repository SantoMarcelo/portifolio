import z from 'zod';

export type schemaValidatorInfer<T> = z.infer<T>;

export default class SchemaValidator {
  private static schemaValidatorClient = z;

  public static validateSchema(schema: z.ZodType, data: unknown) {
    return schema.safeParse(data);
  }

  public static getSchemaValidatorClient() {
    return this.schemaValidatorClient;
  }
}
