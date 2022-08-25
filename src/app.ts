import express from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

import authRouter from "./routers/auth";
import bureauRouter from "./routers/bureau";
import ticketRouter from "./routers/ticket";
import employeeRouter from "./routers/employee";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bureau", bureauRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/employee", employeeRouter);
export default app;
