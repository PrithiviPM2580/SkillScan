import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index.route";
import { globalErrorHandler } from "./middlewares/error.middleware";
import ENV from "./config/env.config";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(helmet());

app.use("/", router);
app.use(globalErrorHandler);

export default app;
