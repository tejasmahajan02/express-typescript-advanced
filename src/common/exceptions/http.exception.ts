import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class HttpException extends Error {
  public statusCode: StatusCodes;
  public error: string;

  constructor(message: string, statusCode: StatusCodes, error?: ReasonPhrases) {
    super(message);
    this.statusCode = statusCode;
    this.error = error || 'Application Error';
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
    };
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict') {
    super(message, StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(message, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error') {
    super(
      message,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
    );
  }
}
