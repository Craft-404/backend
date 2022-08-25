import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import { INTERNAL_SERVER_ERROR } from "../middlewares/constants";
import { IBureauDocument } from "../models/bureau";
import { IDesignationDocument } from "../models/designation";
import { EmployeeModel } from "../models/employee";
const router = Router();

router.use(authFunction);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const reg = req.query.q;
    if (!reg) return res.status(200).send({});
    const employees = await EmployeeModel.find({
      $or: [
        { name: { $regex: reg || "", $options: "i" } },
        { username: { $regex: reg || "", $options: "i" } },
        { email: { $regex: reg || "", $options: "i" } },
      ],
    })
      .limit(10)
      .populate<{ bureauId: IBureauDocument }>("bureauId", "id name")
      .populate<{ designationId: IDesignationDocument }>(
        "designationId",
        "id name"
      );
    return res.status(200).send(employees);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
