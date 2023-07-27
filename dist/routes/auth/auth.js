"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../controllers/auth/auth");
const checkauth_1 = __importDefault(require("../../middleware/checkauth"));
const loggerMiddleware_1 = __importDefault(require("../../middleware/loggerMiddleware"));
const router = (0, express_1.Router)();
router.use(loggerMiddleware_1.default);
router
    .route("/register")
    .post((0, express_validator_1.check)("email", "Please enter email").not().isEmpty(), (0, express_validator_1.check)("password", "Please enter password").not().isEmpty(), auth_1.register);
router
    .route("/login")
    .post((0, express_validator_1.check)("email", "Please enter email").not().isEmpty(), (0, express_validator_1.check)("password", "Please enter password").not().isEmpty(), auth_1.login);
router.route("/profile").get(checkauth_1.default, (req, res) => {
    (0, auth_1.profile)(req, res);
});
exports.default = router;
