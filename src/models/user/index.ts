import { Schema, model, Model } from "mongoose";
import { findByCredentials } from "./findByCredentials";
import { generateAuthToken } from "./generateAuthToken";
// import toJSON from "./toJson";
import { Request, Response } from "express";
import preSave from "./preSave";
import { USER_TYPE, USER_TYPES } from "../../middlewares/constants";

export interface IUserDocument extends Document {
  name: string;
  dob: Date;
  phone: string;
  email: string;
  password: string;
  tenthURL: string | undefined;
  twelthURL: string | undefined;
  token: string | undefined;
  _id: string;
  userType: USER_TYPE;
}

//Employee INTERFACE WITH METHODS
export interface IUser extends IUserDocument {
  generateAuthToken(this: IUserDocument): Promise<string>;
  toJSON(this: IUserDocument): Promise<IUserDocument>;
}

//User INTERFACE WITH STATICS
export interface IUserModel extends Model<IUser> {
  findByCredentials(
    email: string,
    password: string,
    req: Request,
    res: Response
  ): Promise<IUser>;
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
      unique: true,
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
    token: {
      type: String,
    },
    userType: {
      type: String,
      enum: USER_TYPES,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", preSave);

UserSchema.methods.generateAuthToken = generateAuthToken;

//FIND BY CREDENTIALS STATIC METHOD ON SCHEMA
UserSchema.statics.findByCredentials = findByCredentials;

// UserSchema.methods.toJSON = toJSON;

//EXPORTING MODEL
export const UserModel = model<IUser, IUserModel>("User", UserSchema);
