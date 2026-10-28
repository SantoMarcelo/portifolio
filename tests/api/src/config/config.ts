import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const BASE_URL = process.env.BASE_URL ?? '';

// Environment configurations
export const config = {
  // Server root (no API prefix). Health and test-utils routes live here, outside `API_BASE_PATH`.
  serverURL: BASE_URL,
  baseURL: `${BASE_URL}${process.env.API_BASE_PATH ?? '/api/v1'}`,
  // Bearer token of the active session, set by `AuthApi` after logging in through `POST /auth/login`.
  token: '',
  // Optional mTLS. Leave the TLS_* variables empty when the API does not require client certificates.
  certs: {
    key: process.env.TLS_KEY_PATH ? path.resolve(process.cwd(), process.env.TLS_KEY_PATH) : '',
    cert: process.env.TLS_CERT_PATH ? path.resolve(process.cwd(), process.env.TLS_CERT_PATH) : '',
    ca: process.env.TLS_CA_PATH ? path.resolve(process.cwd(), process.env.TLS_CA_PATH) : '',
  },
};
