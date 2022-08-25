//IMPORTS
import { HydratedDocument } from "mongoose";
import { IEmployee } from ".";
import bcrypt from "bcryptjs";

//DECLARING PRE SAVE HOOK FUNCTION
export const preSave = async function (this: HydratedDocument<IEmployee>) {
  //CONVERTING EMAIL TO SMALL CAPS BEFORE SAVING
  this.email = this.email.toLowerCase();

  //CHECK IF PASSWORD IS CHANGED AND HASH ACCORDINGLY
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
};
