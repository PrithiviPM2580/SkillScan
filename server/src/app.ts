import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index.route";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/", router);
app.use(globalErrorHandler);

export default app;
