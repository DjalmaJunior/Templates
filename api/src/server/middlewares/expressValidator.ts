import { NextFunction, Request, Response } from "express";

type TError = Error & { statusCode?: number };

export default (err: TError, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err?.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      name: err.name,
      statusCode: err.statusCode
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    name: 'InternalServerError',
    statusCode: 500
  });
}
