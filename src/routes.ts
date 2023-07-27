import { Express } from "express";
import AuthRoutes from "./routes/auth/auth";
import RandomRoutes from "./routes/random/random";

export default function (app: Express) {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/users", RandomRoutes);
}
