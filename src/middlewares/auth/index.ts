//IMPORTING REQUIRED MODULES AND PACKAGES
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  AUTHENTICATION_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  NULL_ARRAY,
} from "../constants";
import { EmployeeModel } from "../../models/employee";
import { SECRET } from "../../config";
import { UserModel } from "../../models/user";

//TODO RESET PASSWORD

//GETTING JWT SECRET FROM ENV FILE
const secret = SECRET || "";

//DEFINITION OF MIDDLEWARE AUTH FUNCTION
const authFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //CHECKING IF TOKEN IS PRESENT IN HEADER
    const token = req.header("Authorization");
    if (!token || NULL_ARRAY.includes(token)) {
      return res
        .status(AUTHENTICATION_ERROR.status)
        .send(AUTHENTICATION_ERROR.message);
    }
    //DECODING TOKEN
    const { _id } = jwt.verify(token, secret) as JwtPayload;

    if (
      req.header("HTTP_USER_AGENT")?.slice(0, 3) == "APP" ||
      req.header("USER") === "EMPLOYEE"
    ) {
      //CHECKING IF USER EXISTS
      const employee = await EmployeeModel.findById(_id);
      if (!employee) {
        return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
      }

      //ADDING USER AND TOKEN TO REQUEST OBJECT
      req.employee = employee;
      req.token = token;
      next();
    } else if (req.header("USER") === "USER") {
      //CHECKING IF USER EXISTS
      const user = await UserModel.findById(_id);
      if (!user) {
        return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
      }

      //ADDING USER AND TOKEN TO REQUEST OBJECT
      req.user = user;
      req.token = token;
      next();
    } else return res.status(AUTHENTICATION_ERROR.status).send();
  } catch (e: any) {
    if (e.status && e.message) return res.status(e.status).send(e);
    else
      return res
        .status(INTERNAL_SERVER_ERROR.status)
        .send(INTERNAL_SERVER_ERROR);
  }
};

//EXPORTING THE AUTH FUNCTION
export default authFunction;
