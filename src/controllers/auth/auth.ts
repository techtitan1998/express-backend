import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../../model/User";
import dotenv from "dotenv";
import GenerateToken from "../../middleware/generateToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "../../middleware/errorHandler";

dotenv.config();

export const register: any = errorHandler(async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = req.body;

  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    return res.status(409).json({ message: "Email is already exist" });
  }

  let password = await generatePassword(userData.password);
  let profile = await User.create({
    email: userData.email,
    password: password,
  });

  return res
    .status(200)
    .json({ data: profile, message: "User registered Successfully" });
});

export const login: any = errorHandler(async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = req.body;

  const isExist = await User.findOne({ email: req.body.email });
  console.log(isExist);
  if (!isExist) {
    return res
      .status(409)
      .json({ message: "user with this Email is not exist" });
  }

  bcrypt.compare(userData.password, isExist.password, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (result) {
      const token = GenerateToken(isExist);

      return res
        .status(201)
        .json({ message: "User Login successfully", token: token });
    } else {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
  });
});

export const profile: any = errorHandler(async (req: any, res: any) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]) as {
    _id: string;
  };
  const profile = await User.findOne({ _id: token._id });
  if (profile) {
    return res.status(200).json({ data: profile, message: "User information" });
  }
});

async function generatePassword(userEnteredPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userEnteredPassword, salt);
}
