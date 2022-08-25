import { AnnouncementModel } from "../models/announcement";
import { Router, Request, Response } from "express";
import { DesignationModel } from "../models/designation";
import {
  ADMIN,
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
  RESTRICTED_ERROR,
} from "../middlewares/constants";
import authFunction from "../middlewares/auth";
const router = Router();

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req);
    const designation = await DesignationModel.findById(
      req.employee.designationId
    );
    if (designation!.name !== ADMIN)
      return res.status(RESTRICTED_ERROR.status).send(RESTRICTED_ERROR);
    const announcement = new AnnouncementModel(req.body);
    await announcement.save();
    return res.status(RESOURCE_CREATED.status).send(announcement);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
