export class BadRequestError extends Error {
  statusCode;
  
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class ServerRequestError extends Error {
  statusCode;

  constructor() {
    super('Something is wrong with server. Try again later!');
    this.name = 'Internal Server Error';
    this.statusCode = 500;
  }
};

export class InvalidParamError extends Error {
  statusCode;

  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError';
    this.statusCode = 422;
  }
}

export class MissingParamError extends Error {
  statusCode;

  constructor (paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
    this.statusCode = 417;
  }
}

export class NotFoundError extends Error {
  statusCode;

  constructor (content: string) {
    super(`${content} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
