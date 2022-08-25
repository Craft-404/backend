import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import { INTERNAL_SERVER_ERROR } from "../middlewares/constants";
import { AnnouncementModel } from "../models/announcement";

const router = Router();

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});
