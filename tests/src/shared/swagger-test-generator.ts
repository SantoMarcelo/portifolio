import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import SwaggerParser from '@apidevtools/swagger-parser';
import { config } from '../config/config';
import { generateExampleFromSchema } from './utils/body-generator';
import { HttpClientAdapter } from './http-client-adapter';

export class SwaggerService {
  private swagger: any;

  async loadSwagger(swaggerPath: string): Promise<void> {
    try {
      const parser = new SwaggerParser();
      this.swagger = await parser.dereference(swaggerPath);

      if (!this.swagger.paths) {
        throw new Error('Swagger loaded file not contains "paths". Verify the file.');
      }
    } catch (error) {
      console.error('Error while loading Swagger:');
      throw error;
    }
  }

  private buildEndpoint(endpoint: string, parameters: any[] = []): string {
    let finalEndpoint = endpoint;
    const queryParams: string[] = [];

    if (parameters && parameters.length > 0) {
      parameters.forEach((param) => {
        const exampleValue = this.getExampleValue(param);

        if (param.in === 'path') {
          finalEndpoint = finalEndpoint.replace(`{${param.name}}`, encodeURIComponent(exampleValue));
        } else if (param.in === 'query') {
          queryParams.push(`${encodeURIComponent(param.name)}=${encodeURIComponent(exampleValue)}`);
        }
      });
    }

    if (queryParams.length > 0) {
      finalEndpoint += `?${queryParams.join('&')}`;
    }

    return finalEndpoint;
  }

  private getExampleValue(param: any): string {
    if (param.example !== undefined) {
      return param.example.toString();
    }
    if (param.schema?.example !== undefined) {
      return param.schema.example.toString();
    }

    // Default type
    const type = param.schema?.type || 'string';
    switch (type) {
      case 'integer':
      case 'number':
        return '1';
      case 'boolean':
        return 'true';
      case 'string':
      default:
        return 'example';
    }
  }

  generateAllTests() {
    if (!this.swagger) {
      throw new Error('Swagger not loaded!');
    }

    this.generateFunctionalTests();
    this.generateHealthTests();
    this.generateContractTests();

    console.log('All tests generated with success!');
  }

  generateFunctionalTests() {
    const paths = Object.keys(this.swagger.paths);
    const describeBlocks: Record<string, string[]> = {};
    console.log('paths: ', paths);
    paths.forEach((endpoint) => {
      console.log(`DEBUG: Processing endpoint: ${endpoint}`);
      const methods = Object.keys(this.swagger.paths[endpoint]);
      console.log(`DEBUG: Methods found: ${methods}`);

      methods.forEach((method) => {
        console.log(`DEBUG: Processing method: ${method} for endpoint: ${endpoint}`);
        const operation = this.swagger.paths[endpoint][method];
        console.log(`DEBUG: Operation object:`, operation);
        console.log(`DEBUG: Operation.responses:`, operation?.responses);

        if (!operation) {
          console.error(`ERROR: Operation is null/undefined for ${method} ${endpoint}`);
          return;
        }

        if (!operation.responses) {
          console.error(`ERROR: operation.responses is null/undefined for ${method} ${endpoint}`);
          return;
        }

        const lowerMethod = method.toLowerCase();
        const responseTypes = Object.keys(operation.responses);
        const finalEndpoint = this.buildEndpoint(endpoint, operation.parameters);
        const needsBody = ['post', 'put', 'patch'].includes(lowerMethod);

        // Unique identifier per method + endpoint + status
        const tags = operation.tags && operation.tags.length > 0 ? operation.tags : ['SemTag'];

        responseTypes.forEach((statusCode) => {
          let bodyDeclaration = '';
          let axiosCall = '';

          if (needsBody && operation.requestBody?.content?.['application/json']?.schema) {
            const example = generateExampleFromSchema(operation.requestBody.content['application/json'].schema);
            bodyDeclaration = `const body = ${JSON.stringify(example, null, 2)};\n    `;
            axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`, body);`;
          } else {
            axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`);`;
          }

          const testName = `${method.toUpperCase()} ${endpoint} - deve retornar status ${statusCode}`;
          const testCode = `
    it('${testName}', async () => {
      ${bodyDeclaration}${axiosCall};
      expect(response.status).toBe(${statusCode});
    });`;

          tags.forEach((tag: string | number) => {
            if (!describeBlocks[tag]) {
              describeBlocks[tag] = [];
            }

            // Evita duplicatas
            if (!describeBlocks[tag].some((t) => t.includes(testName))) {
              describeBlocks[tag].push(testCode);
            }
          });
        });
      });
    });

    // Build final content with multiple describes
    let finalTestContent =
      'import { HttpService } from "../../services/httpService";\nimport { config } from "../../config/config";\n';

    Object.entries(describeBlocks).forEach(([tag, tests]) => {
      finalTestContent += `
  describe('${tag} - Functional Tests', () => {
  ${tests.join('\n')}
  });
  `;
    });

    const outputDir = path.join(__dirname, '../tests/generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'functional.test.ts'), finalTestContent.trim(), 'utf-8');
  }

  generateHealthTests() {
    const paths = Object.keys(this.swagger.paths);
    const describeBlocks: Record<string, string[]> = {}; // tag => [testCases]

    paths.forEach((endpoint) => {
      const methods = Object.keys(this.swagger.paths[endpoint]);

      methods.forEach((method) => {
        const operation = this.swagger.paths[endpoint][method];
        const lowerMethod = method.toLowerCase();
        const finalEndpoint = this.buildEndpoint(endpoint, operation.parameters);
        const needsBody = ['post', 'put', 'patch'].includes(lowerMethod);

        // Ensure single execution per method+endpoint
        const uniqueTestName = `${lowerMethod.toUpperCase()} ${finalEndpoint}`;

        // Determinar a tag (ou usar "SemTag")
        const tags = operation.tags && operation.tags.length > 0 ? operation.tags : ['SemTag'];

        // Create test body
        let bodyDeclaration = '';
        let axiosCall = '';

        if (needsBody && operation.requestBody?.content?.['application/json']?.schema) {
          const example = generateExampleFromSchema(operation.requestBody.content['application/json'].schema);
          bodyDeclaration = `const body = ${JSON.stringify(example, null, 2)};\n    `;
          axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`, body);`;
        } else {
          axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`);`;
        }

        const testCode = `
    it('${uniqueTestName} deve retornar 200', async () => {
      ${bodyDeclaration}${axiosCall}
      expect(response.status).toBe(200);
    });`;

        // Add the test to all related tags
        tags.forEach((tag: string | number) => {
          if (!describeBlocks[tag]) {
            describeBlocks[tag] = [];
          }

          // Avoid adding duplicate tests
          if (!describeBlocks[tag].some((t) => t.includes(uniqueTestName))) {
            describeBlocks[tag].push(testCode);
          }
        });
      });
    });

    // Build final content with multiple describes
    let finalTestContent =
      'import { HttpService } from "../../services/httpService";\nimport { config } from "../../config/config";\n';

    Object.entries(describeBlocks).forEach(([tag, tests]) => {
      finalTestContent += `
  describe('${tag} - Health Check', () => {
  ${tests.join('\n')}
  });
  `;
    });

    const outputDir = path.join(__dirname, '../tests/generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'health.test.ts'), finalTestContent.trim(), 'utf-8');
  }

  generateContractTests() {
    const paths = Object.keys(this.swagger.paths);
    const describeBlocks: Record<string, string[]> = {};
    const ajv = new Ajv({ allErrors: true, strict: false });

    paths.forEach((endpoint) => {
      const methods = Object.keys(this.swagger.paths[endpoint]);

      methods.forEach((method) => {
        const operation = this.swagger.paths[endpoint][method];
        const lowerMethod = method.toLowerCase();
        const finalEndpoint = this.buildEndpoint(endpoint, operation.parameters);
        const tags = operation.tags && operation.tags.length > 0 ? operation.tags : ['SemTag'];
        const response = operation.responses?.['200'];
        const schema = response?.content?.['application/json']?.schema;

        if (!schema) return;

        let bodyDeclaration = '';
        let axiosCall = '';

        const needsBody = ['post', 'put', 'patch'].includes(lowerMethod);

        if (needsBody && operation.requestBody?.content?.['application/json']?.schema) {
          const example = generateExampleFromSchema(operation.requestBody.content['application/json'].schema);
          bodyDeclaration = `const body = ${JSON.stringify(example, null, 2)};\n    `;
          axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`, body);`;
        } else {
          axiosCall = `const response = await HttpService.${lowerMethod}(\`\${config.baseURL}${finalEndpoint}\`);`;
        }

        const testName = `${method.toUpperCase()} ${endpoint} - contrato da resposta deve ser válido`;
        const testCode = `
    it('${testName}', async () => {
      ${bodyDeclaration}${axiosCall}
      const schema = ${JSON.stringify(schema, null, 2)};
      const validate = new Ajv({ allErrors: true, strict: false }).compile(schema);
      const valid = validate(response.data);
      if (!valid) {
        console.error(validate.errors);
      }
      expect(valid).toBe(true);
    });`;

        tags.forEach((tag: string | number) => {
          if (!describeBlocks[tag]) {
            describeBlocks[tag] = [];
          }
          if (!describeBlocks[tag].some((t) => t.includes(testName))) {
            describeBlocks[tag].push(testCode);
          }
        });
      });
    });

    let finalTestContent = `
  import { HttpService } from "../../services/httpService";
  import { config } from "../../config/config";
  import Ajv from "ajv";
  
  `;

    Object.entries(describeBlocks).forEach(([tag, tests]) => {
      finalTestContent += `
  describe('${tag} - Contract Tests', () => {
  ${tests.join('\n')}
  });
  `;
    });

    const outputDir = path.join(__dirname, '../tests/generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'contract.test.ts'), finalTestContent.trim(), 'utf-8');
  }
}
