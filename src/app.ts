import express from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

import authRouter from "./routers/auth";

app.use("/api/v1/auth", authRouter);

export default app;
