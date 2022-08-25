import { Router, Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../middlewares/constants";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
} from "../middlewares/constants";
import { UserModel } from "../models/user";
const router = Router();

router.post("/", async (req: any, res: Response) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password, req, res);
    await user.generateAuthToken();
    return res.status(200).send(user);
  } catch (e: any) {
    return res.send(INTERNAL_SERVER_ERROR);
  }
});

export default router;
