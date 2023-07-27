"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../model/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateToken_1 = __importDefault(require("../../middleware/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorHandler_1 = __importDefault(require("../../middleware/errorHandler"));
dotenv_1.default.config();
exports.register = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const isExist = yield User_1.default.findOne({ email: req.body.email });
    if (isExist) {
        return res.status(409).json({ message: "Email is already exist" });
    }
    let password = yield generatePassword(userData.password);
    let profile = yield User_1.default.create({
        email: userData.email,
        password: password,
    });
    return res
        .status(200)
        .json({ data: profile, message: "User registered Successfully" });
}));
exports.login = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const isExist = yield User_1.default.findOne({ email: req.body.email });
    console.log(isExist);
    if (!isExist) {
        return res
            .status(409)
            .json({ message: "user with this Email is not exist" });
    }
    bcrypt_1.default.compare(userData.password, isExist.password, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        if (result) {
            const token = (0, generateToken_1.default)(isExist);
            return res
                .status(201)
                .json({ message: "User Login successfully", token: token });
        }
        else {
            return res
                .status(400)
                .json({ message: "email or password is incorrect" });
        }
    });
}));
exports.profile = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.decode(req.headers.authorization.split(" ")[1]);
    const profile = yield User_1.default.findOne({ _id: token._id });
    if (profile) {
        return res.status(200).json({ data: profile, message: "User information" });
    }
}));
function generatePassword(userEnteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(userEnteredPassword, salt);
    });
}
