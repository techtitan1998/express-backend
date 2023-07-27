"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Dbconnector_1 = __importDefault(require("./config/Dbconnector"));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(400).json({
//     message: "bad Request",
//   });
// });
const dbConnectionString = "mongodb+srv://test_task:test_task@db.e6le9.mongodb.net/testing?retryWrites=true&w=majority" !== null && "mongodb+srv://test_task:test_task@db.e6le9.mongodb.net/testing?retryWrites=true&w=majority" !== void 0 ? "mongodb+srv://test_task:test_task@db.e6le9.mongodb.net/testing?retryWrites=true&w=majority" : "";
(0, Dbconnector_1.default)(dbConnectionString);
(0, routes_1.default)(app);
const server = app.listen(3000, () => console.log("server is running on port 3000"));
exports.default = app;
