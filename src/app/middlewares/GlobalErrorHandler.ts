import e, { NextFunction, Request, Response } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { handleZodError } from '../errors/HandleZodError';
import { handleValidationError } from '../errors/HandleValidationError';
import { handleCastError } from '../errors/HandleCastError';
import { handleDuplicateError } from '../errors/HandleDuplicateError';
import { AppError } from '../errors/AppErrors';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_ENV === 'development' ? error?.stack : null,
    // error,
  });
};
