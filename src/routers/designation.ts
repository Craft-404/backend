import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import { INTERNAL_SERVER_ERROR } from "../middlewares/constants";
import { DesignationModel } from "../models/designation";
const router = Router();

router.use(authFunction);

router.get("/", async (req: Request, res: Response) => {
  try {
    const designations = await DesignationModel.find({});
    console.log(designations);
    return res.send(200).send(designations);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
