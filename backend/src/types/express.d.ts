import type { Role } from '../constants';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; role: Role };
    }
  }
}

export {};
