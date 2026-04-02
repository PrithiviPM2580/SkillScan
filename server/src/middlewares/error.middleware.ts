import { ErrorRequestHandler, Response } from "express";
import mongoose from "mongoose";

import { AppError } from "../utils/error.util";

type ErrorResponse = {
  status: "fail" | "error";
  message: string;
  stack?: string;
  errors?: unknown;
};

const handleCastError = (err: mongoose.Error.CastError): AppError => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldsError = (
  err: mongoose.Error & { code?: number },
): AppError => {
  const rawMessage = err.message ?? "Duplicate field value";
  return new AppError(rawMessage, 409);
};

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): AppError => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

const sendErrorDev = (err: AppError, res: Response): void => {
  const response: ErrorResponse = {
    status: err.status,
    message: err.message,
  };

  if (err.stack) {
    response.stack = err.stack;
  }

  res.status(err.statusCode).json(response);
};

const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  let error = err;

  if (!(error instanceof AppError)) {
    error = new AppError(error.message || "Something went wrong", 500);
  }

  if (err instanceof mongoose.Error.CastError) {
    error = handleCastError(err);
  }

  if ((err as mongoose.Error & { code?: number }).code === 11000) {
    error = handleDuplicateFieldsError(
      err as mongoose.Error & { code?: number },
    );
  }

  if (err instanceof mongoose.Error.ValidationError) {
    error = handleValidationError(err);
  }

  if (process.env["NODE_ENV"] === "development") {
    sendErrorDev(error, res);
    return;
  }

  sendErrorProd(error, res);
};
