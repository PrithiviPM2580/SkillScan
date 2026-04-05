import { Router } from "express";
import authRouter from "./auth.route";
import interviewRouter from "./interview.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", message: "API is healthy" });
});

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/interview", interviewRouter);
router.all("/{*any}", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default router;
