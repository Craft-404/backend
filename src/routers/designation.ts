import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import { DesignationModel } from "../models/designation";
const router = Router();

router.use(authFunction);

router.get("/", async (req: Request, res: Response) => {
  const designations = await DesignationModel.find({});
  console.log(designations);
  return res.send(200).send(designations);
});

export default router;
