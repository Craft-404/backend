import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import {
  ADMIN,
  INTERNAL_SERVER_ERROR,
  RESTRICTED_ERROR,
} from "../middlewares/constants";
import { DesignationModel } from "../models/designation";
import { SchemeModel } from "../models/scheme";
import moment from "moment";

const router = Router();

router.use(authFunction);

router.get("/", async (req: Request, res: Response) => {
  try {
    var years = moment().diff(req.user.dob, "years", false);
    const schemes = await SchemeModel.find({
      minAge: { $gte: years },
      maxAge: { $lte: years },
    });
    return res.status(200).send(schemes);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const designation = await DesignationModel.findById(
      req.employee.designationId
    );
    if (designation?.name !== ADMIN)
      return res.status(RESTRICTED_ERROR.status).send(RESTRICTED_ERROR);
    const scheme = new SchemeModel(req.body);
    await scheme.save();
    return res.status(201).send(scheme);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
