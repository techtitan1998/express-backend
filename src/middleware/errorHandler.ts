import { Request, Response, NextFunction } from "express";

type ExpressRequest = Request<any, any, any>;
type ExpressResponse = Response<any>;
type ExpressNextFunction = NextFunction;

type ControllerFunction = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => Promise<void>;

type ErrorHandlerMiddleware = (
  controllerFn: ControllerFunction
) => (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => Promise<void>;

const errorHandler: ErrorHandlerMiddleware =
  (controllerFn) => async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default errorHandler;
