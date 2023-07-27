"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const random_1 = require("../../controllers/random/random");
const checkauth_1 = __importDefault(require("../../middleware/checkauth"));
const loggerMiddleware_1 = __importDefault(require("../../middleware/loggerMiddleware"));
const router = (0, express_1.Router)();
router.use(loggerMiddleware_1.default);
router.route("/random").post(checkauth_1.default, random_1.random);
exports.default = router;
