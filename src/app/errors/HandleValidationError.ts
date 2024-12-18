import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};
