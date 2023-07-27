import mongoose, { Schema } from "mongoose";
import { Iuser } from "../Types/Iuser";
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const User = mongoose.model<Iuser>("profile", UserSchema);
export default User;
