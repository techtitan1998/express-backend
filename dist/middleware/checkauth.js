"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: "you not supplied a token" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const verifyOptions = {
            secret: "BeT.Y!ua{+nWKtntu*2_S57uEMmhj}-G&>>sKVLz}{e6jr",
        };
        const verify = jsonwebtoken_1.default.verify(token, verifyOptions.secret);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "invalid token" });
    }
};
exports.default = checkAuth;
