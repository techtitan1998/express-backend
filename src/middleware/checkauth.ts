import { Request, Response, NextFunction } from "express";
import jwt, { VerifyOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type ExpressRequest = Request<any, any, any>;
type ExpressResponse = Response<any>;
type ExpressNextFunction = NextFunction;

type MiddlewareFunction = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => void;

const checkAuth: MiddlewareFunction = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "you not supplied a token" });
    }

    const token: string = req.headers.authorization.split(" ")[1];
    const verifyOptions: any = {
      secret: "BeT.Y!ua{+nWKtntu*2_S57uEMmhj}-G&>>sKVLz}{e6jr",
    };

    const verify = jwt.verify(token, verifyOptions.secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

export default checkAuth;
