import express from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

import authRouter from "./routers/auth";
import bureauRouter from "./routers/bureau";
import ticketRouter from "./routers/ticket";
import employeeRouter from "./routers/employee";
import announcementRouter from "./routers/announcement";
import dashboardRouter from "./routers/dashboard";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bureau", bureauRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/announcement", announcementRouter);

export default app;
