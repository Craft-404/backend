//IMPORTS
import { IUserDocument } from ".";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { SECRET } from "../../config";

//GETTING JWT KEY
const secret = SECRET || "";

//DECLARING FUNCTION TO GENERATE AN AUTH TOKEN ON SIGN UP AND LOGIN
export const generateAuthToken = async function (
  this: HydratedDocument<IUserDocument>
) {
  //GETTING UIUserDocument
  const user = this;

  //GENERATING TOKEN AND APPENDING TO user
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.token = token;

  //SAVING user AND RETURNING THE TOKEN
  await user.save();
  return token;
};
