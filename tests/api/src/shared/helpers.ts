import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import * as ExcelJS from 'exceljs';

/**
 * Function to write a value to a specific cell in a template.
 * @param inputPath Path to the original file (.xlsx)
 * @param outputPath Path to the new file that will be generated
 * @param cellAddress Cell address (e.g., 'B4', 'C10')
 * @param value The content you want to insert
 */
export async function writeToExcel(
  inputPath: string,
  outputPath: string,
  cellAddress: string,
  value: string | number | boolean | Date
): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(inputPath);

    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      throw new Error('Worksheet not found.');
    }

    const cell = worksheet.getCell(cellAddress);
    cell.value = value;

    await workbook.xlsx.writeFile(outputPath);
    console.log(`✅ Value "${value}" inserted in cell ${cellAddress} successfully!`);
  } catch (error) {
    console.error('Error processing the file:', error);
  }
}

/**
 * Saves a data buffer to a /temp folder in the project directory
 * if the SAVE_TEST_OUTPUT environment variable is set to "true".
 * @param fileName The name of the file to be saved.
 * @param data The data buffer (e.g., from an axios response with arraybuffer).
 */
export function saveFileIfEnabled(fileName: string, data: ArrayBuffer) {
  if (process.env.SAVE_TEST_OUTPUT?.toLowerCase() === 'true') {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(data));
    console.log(`Test file saved at: ${filePath}`);
  }
}

/**
 * Creates a FormData with a file for upload.
 * @param filePath Full path of the file to be uploaded.
 * @param fieldName Name of the field in FormData (default: "file").
 * @returns FormData configured with the file.
 */
export function createFormDataWithFile(filePath: string, fieldName: string = 'file'): FormData {
  const form = new FormData();
  const fileStream = fs.createReadStream(filePath);
  form.append(fieldName, fileStream);
  return form;
}

export function buildEndpoint(
  endpoint: string,
  pathParams?: Record<string, string | number>,
  queryParams?: Record<string, string | number | boolean | string[]>
) {
  let result = endpoint;

  // Replace path parameters (e.g., {id} with actual values)
  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, String(value));
    });
  }

  // Add query parameters if provided
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryPairs: string[] = [];

    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays - create multiple parameters with the same key
        value.forEach((item) => {
          queryPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        });
      } else {
        // Handle single values
        queryPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });

    const queryString = queryPairs.join('&');
    result = `${result}?${queryString}`;
  }

  console.log('Builded endpoint result ' + result);

  return result;
}

/**
 * Gets the current date in YYYY-MM-DD format.
 * @returns {string} The formatted date string.
 */
export function getFormattedCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getFormattedNextDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
