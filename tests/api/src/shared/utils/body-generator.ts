export function generateExampleFromSchema(schema: any): any {
  if (!schema || typeof schema !== 'object') return {};

  if (schema.type === 'object' && schema.properties) {
    const obj: any = {};
    for (const key in schema.properties) {
      const prop = schema.properties[key];
      obj[key] = guessExampleValue(prop);
    }
    return obj;
  }

  return {};
}

function guessExampleValue(prop: any): any {
  if (!prop) return null;

  switch (prop.type) {
    case 'string':
      return prop.example || 'string';
    case 'integer':
      return prop.example || 0;
    case 'number':
      return prop.example || 0.0;
    case 'boolean':
      return prop.example || true;
    case 'array':
      return [guessExampleValue(prop.items)];
    case 'object':
      return generateExampleFromSchema(prop);
    default:
      return null;
  }
}
