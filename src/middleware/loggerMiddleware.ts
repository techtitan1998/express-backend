import { Request, Response, NextFunction } from "express";

type ExpressRequest = Request<any, any, any>;
type ExpressResponse = Response<any>;
type ExpressNextFunction = NextFunction;

const loggerMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};

export default loggerMiddleware;
