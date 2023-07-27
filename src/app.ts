import express, { Request, Response, NextFunction, Express } from "express";
import { Server } from "http";
const app = express();

import routes from "./routes";
import fileUpload from "express-fileupload";
import connectorDb from "./config/Dbconnector";
import dotenv from "dotenv";
dotenv.config();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbConnectionString: string = process.env.DB_URL ?? "";
connectorDb(dbConnectionString);
routes(app);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: "bad Request",
  });
});
const server: Server = app.listen(3000, () =>
  console.log("server is running on port 3000")
);
export default app;
