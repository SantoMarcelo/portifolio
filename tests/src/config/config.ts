import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const BASE_URL = process.env.BASE_URL ?? '';

// Environment configurations
export const config = {
  baseURL: `${BASE_URL}${process.env.API_BASE_PATH ?? '/api'}`,
  authLoginURL: `${BASE_URL}${process.env.AUTH_SESSION_PATH ?? '/api/auth/login'}`,
  cookie: process.env.COOKIE || '',
  // Optional mTLS. Leave the TLS_* variables empty when the API does not require client certificates.
  certs: {
    key: process.env.TLS_KEY_PATH ? path.resolve(process.cwd(), process.env.TLS_KEY_PATH) : '',
    cert: process.env.TLS_CERT_PATH ? path.resolve(process.cwd(), process.env.TLS_CERT_PATH) : '',
    ca: process.env.TLS_CA_PATH ? path.resolve(process.cwd(), process.env.TLS_CA_PATH) : '',
  },
};
