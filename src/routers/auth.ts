import { Router, Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../middlewares/constants";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
} from "../middlewares/constants";
import { EmployeeModel } from "../models/employee";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const employee = new EmployeeModel(req.body);
    const token = await employee.generateAuthToken();
    return res.status(RESOURCE_CREATED.status).send({ ...employee, token });
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const employee = await EmployeeModel.findByCredentials(
      email,
      password,
      req,
      res
    );
    await employee.generateAuthToken();
    return res.status(200).send(employee);
  } catch (e: any) {
    if (e.status && e.message) return res.status(e.status).send(e);
    else
      return res
        .status(INTERNAL_SERVER_ERROR.status)
        .send(INTERNAL_SERVER_ERROR);
  }
});

router.use(authFunction);

router.patch("/verify", async (req: Request, res: Response) => {
  try {
    const { fcmToken } = req.body;
    req.employee.fcmToken = fcmToken;
    await req.employee.save();
    return res.status(RESOURCE_UPDATED.status).send(RESOURCE_UPDATED);
  } catch (e: any) {
    if (e.status && e.message) return res.status(e.status).send(e);
    else
      return res
        .status(INTERNAL_SERVER_ERROR.status)
        .send(INTERNAL_SERVER_ERROR);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).send({
        status: 400,
        message: "Please send an employee Id to update.",
      });
    }
    let employee = await EmployeeModel.findById(_id);
    if (!employee)
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR);

    employee = {
      ...employee,
      ...req.body,
    };
    await employee!.save();
    return res.status(RESOURCE_UPDATED.status).send(employee);
  } catch (e: any) {
    if (e.status && e.message) return res.status(e.status).send(e);
    else
      return res
        .status(INTERNAL_SERVER_ERROR.status)
        .send(INTERNAL_SERVER_ERROR);
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  try {
    let employee = req.employee;
    delete employee.token;
    await employee.save();
    return res.status(RESOURCE_UPDATED.status).send(RESOURCE_UPDATED);
  } catch (e: any) {
    if (e.status && e.message) return res.status(e.status).send(e);
    else
      return res
        .status(INTERNAL_SERVER_ERROR.status)
        .send(INTERNAL_SERVER_ERROR);
  }
});

export default router;
