//IMPORTS
import { HydratedDocument } from "mongoose";
import { IUser } from ".";
import bcrypt from "bcryptjs";

//DECLARING PRE SAVE HOOK FUNCTION
export const preSave = async function (this: HydratedDocument<IUser>) {
  //CONVERTING EMAIL TO SMALL CAPS BEFORE SAVING
  this.email = this.email.toLowerCase();

  //CHECK IF PASSWORD IS CHANGED AND HASH ACCORDINGLY
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
};

export default preSave;
