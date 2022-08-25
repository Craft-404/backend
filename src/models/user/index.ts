import { Schema, model } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  dob: Date;
  phone: string;
  email: string;
  password: string;
  tenthURL: string | undefined;
  twelthURL: string | undefined;
}

//Employee SCHEMA
export const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tenthURL: {
      type: String,
    },
    twelthURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const UserModel = model<IUserDocument>("User", UserSchema);
