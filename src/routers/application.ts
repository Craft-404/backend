import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
} from "../middlewares/constants";
import { ApplicationModel } from "../models/application";
const router = Router();
import moment from "moment";
import { ISchemeDocument, SchemeModel } from "../models/scheme";
import { IUserDocument } from "../models/user";

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
    const application = new ApplicationModel({
      ...req.body,
      userId: req.user._id,
    });
    await application.save();
    return res.status(RESOURCE_CREATED.status).send(application);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const applications = await ApplicationModel.find({
      userId: req.user._id,
    })
      .populate<{ userId: IUserDocument }>("userId", "id name")
      .populate<{ scheme: ISchemeDocument }>("scheme", "id name");
    console.log(applications);
    return res.status(200).send(applications);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
