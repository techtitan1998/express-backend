import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import errorHandler from "../../middleware/errorHandler";

dotenv.config();

const BASE_URL = "https://randomuser.me/api/";

export const random: any = errorHandler(async (req: any, res: any) => {
  const response: AxiosResponse = await axios.get(BASE_URL);
  return res.status(200).json({ data: response.data, message: "random" });
});
