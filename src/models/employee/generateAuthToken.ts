//IMPORTS
import { IEmployee } from ".";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { SECRET } from "../../config";

//GETTING JWT KEY
const secret = SECRET || "";

//DECLARING FUNCTION TO GENERATE AN AUTH TOKEN ON SIGN UP AND LOGIN
export const generateAuthToken = async function (
  this: HydratedDocument<IEmployee>
) {
  //GETTING employee
  const employee = this;

  //GENERATING TOKEN AND APPENDING TO employee
  const token = jwt.sign({ _id: employee._id.toString() }, secret);
  employee.token = token;

  //SAVING employee AND RETURNING THE TOKEN
  await employee.save();
  return employee;
};
