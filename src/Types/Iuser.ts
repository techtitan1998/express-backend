import { Document } from "mongoose";

export interface Iuser extends Document {
  email: string;
  password: string;
}
