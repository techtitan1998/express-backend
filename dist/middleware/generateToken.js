"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    const secretKey = "BeT.Y!ua{+nWKtntu*2_S57uEMmhj}-G&>>sKVLz}{e6jr" || "";
    const options = {
        expiresIn: "1h",
    };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    return token;
};
exports.default = generateToken;
