export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details: unknown[] = [],
  ) {
    super(message);
  }

  static badRequest(code: string, message: string, details: unknown[] = []) {
    return new AppError(400, code, message, details);
  }
  static unauthorized(code = 'UNAUTHORIZED', message = 'Autenticação necessária') {
    return new AppError(401, code, message);
  }
  static forbidden(message = 'Você não tem permissão para acessar este recurso') {
    return new AppError(403, 'FORBIDDEN', message);
  }
  static notFound(message = 'Recurso não encontrado', code = 'NOT_FOUND') {
    return new AppError(404, code, message);
  }
  static conflict(code: string, message: string, details: unknown[] = []) {
    return new AppError(409, code, message, details);
  }
  static unprocessable(code: string, message: string, details: unknown[] = []) {
    return new AppError(422, code, message, details);
  }
  static unavailable(code: string, message: string) {
    return new AppError(503, code, message);
  }
}
