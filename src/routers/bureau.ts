import { Router, Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../middlewares/constants";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
} from "../middlewares/constants";
import { UserModel } from "../models/user";
import { BureauModel } from "../models/bureau";
const router = Router();

router.use(authFunction);

router.get("/", async (req: Request, res: Response) => {
  try {
    const bureaus = await BureauModel.find();
    if (!bureaus || bureaus.length === 0)
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR);
    return res.status(200).send(bureaus);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
