import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Typing for the function
type GenerateTokenFunction = (user: any) => string;

const generateToken: GenerateTokenFunction = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const secretKey: Secret = process.env.SECRET_KEY || "";

  const options: SignOptions = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

export default generateToken;
