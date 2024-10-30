export class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  code: number;

  constructor(
    message: string = 'INTERNAL SERVER ERROR',
    statusCode: number = 400,
    code: number = 142,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
