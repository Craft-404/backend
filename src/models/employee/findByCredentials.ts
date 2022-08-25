//IMPORTS
import { EmployeeModel } from ".";
import bcrypt from "bcryptjs";
import {
  AUTHENTICATION_ERROR,
  NOT_FOUND_ERROR,
} from "../../middlewares/constants";
import { Request, Response } from "express";

//FIND BY CREDENTIALS FUNCTION USED FOR LOGGING IN
export const findByCredentials = async (
  email: string,
  password: string,
  req: Request,
  res: Response
) => {
  //CHECK IF employee EXISTS
  const employee = await EmployeeModel.findOne({ email });
  if (!employee) {
    return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
  }

  //CHECK IF PASSWORD IS CORRECT
  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) {
    return res
      .status(AUTHENTICATION_ERROR.status)
      .send(AUTHENTICATION_ERROR.message);
  }

  //IF EVERYTHING IS IN ORDER, RETURN employee
  return employee;
};
