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
import designationRouter from "./routers/designation";
import userRouter from "./routers/user";
import schemeRouter from "./routers/scheme";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bureau", bureauRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/designation", designationRouter);
app.use("/api/v1/scheme", schemeRouter);

export default app;
