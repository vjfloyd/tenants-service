export type ErrorCode =
  | 'INVALID_MONTH'
  | 'INVALID_YEAR';

export class DomainError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, code: ErrorCode, status = 400, details?: unknown) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, code, 400, details);
    this.name = 'ValidationError';
  }
}