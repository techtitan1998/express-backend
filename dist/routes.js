"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./routes/auth/auth"));
const random_1 = __importDefault(require("./routes/random/random"));
function default_1(app) {
    app.use("/api/auth", auth_1.default);
    app.use("/api/users", random_1.default);
}
exports.default = default_1;
