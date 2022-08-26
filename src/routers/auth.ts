import { Router, Request, Response } from "express";
import {
  ADMIN,
  NOT_FOUND_ERROR,
  AUTHENTICATION_ERROR,
  RESTRICTED_ERROR,
} from "../middlewares/constants";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
} from "../middlewares/constants";
import { EmployeeModel } from "../models/employee";
import { DesignationModel } from "../models/designation";
import { BureauModel, IBureauDocument } from "../models/bureau";
const router = Router();

//TODO protect this path according to role

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const employee = await EmployeeModel.findByCredentials(
      email,
      password,
      req,
      res
    );
    await employee.generateAuthToken();
    if (req.header("HTTP_USER_AGENT")) {
      employee.bureauId = undefined;
      employee.designationId = undefined;
    }

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

router.post("/", async (req: Request, res: Response) => {
  try {
    let isAuthenticated = false;
    const employeeDesignation = await DesignationModel.findById(
      req.employee.designationId
    );
    // console.log("hi");
    // console.log(employeeDesignation!.name === ADMIN);
    // console.log(
    //   req.body.bureauId == req.employee.bureauId &&
    //     employeeDesignation!.name === LEVEL_THREE
    // );

    const designation = await DesignationModel.findById(req.body.designationId);
    const employeeBureau = await BureauModel.findById(req.employee.bureauId);
    const bureau = await BureauModel.findById(req.body.bureauId);
    if (!employeeDesignation || !employeeBureau || !bureau || !designation)
      return res.status(AUTHENTICATION_ERROR.status).send(AUTHENTICATION_ERROR);
    if (employeeDesignation.name === ADMIN) isAuthenticated = true;
    // else if (
    //   req.body.bureauId == req.employee.bureauId &&
    //   employeeDesignation.name === LEVEL_THREE
    // ) {
    //   if ([LEVEL_ONE, LEVEL_TWO].includes(designation.name))
    //     isAuthenticated = true;
    // } else if (
    //   req.body.bureauId == req.employee.bureauId &&
    //   employeeDesignation.name == LEVEL_TWO
    // ) {
    //   if (designation.name === LEVEL_ONE) isAuthenticated = true;
    // }
    if (!isAuthenticated)
      return res.status(RESTRICTED_ERROR.status).send(RESTRICTED_ERROR);

    const employee = new EmployeeModel(req.body);
    await employee.save();
    // const token = await employee.generateAuthToken();
    return res.status(RESOURCE_CREATED.status).send(employee);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.patch("/employee/fcm", async (req: Request, res: Response) => {
  try {
    const { fcmToken } = req.body;
    req.employee.fcmToken = fcmToken;
    console.log("fcm token: ", req.employee);
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
