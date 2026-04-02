import { Router } from "express";
import authRouter from "./auth.route";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.send("Welcome to SkillScan API");
});

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", message: "API is healthy" });
});

router.use("/api/v1/auth", authRouter);

router.all("*", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default router;
