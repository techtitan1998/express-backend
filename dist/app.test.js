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
const axios_1 = __importDefault(require("axios"));
// Replace the below URL with your API endpoint URL
const REGISTER_API_URL = "http://localhost:3000/api/auth/register";
const LOGIN_API_URL = "http://localhost:3000/api/auth/login";
// Sample user data for testing
const sampleUserData = {
    email: "test6907@example.com",
    password: "testpassword",
};
describe("Register API", () => {
    it("registers a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(REGISTER_API_URL, sampleUserData);
            expect(response.status).toBe(200);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
    it("login a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(LOGIN_API_URL, sampleUserData);
            expect(response.status).toBe(201);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
