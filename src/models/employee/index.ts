import { Request, Response } from "express";
import { model, Schema, Document, Model, PopulatedDoc } from "mongoose";
import { BureauModel, IBureauDocument } from "../bureau";
import { DesignationModel, IDesignationDocument } from "../designation";
import { findByCredentials } from "./findByCredentials";
import { generateAuthToken } from "./generateAuthToken";
// import postRemove from "./postRemove";
import { preSave } from "./preSave";
import toJSON from "./toJson";

//Employee INTERFACE
export interface IEmployeeDocument extends Document {
  email: string;
  name: string;
  phone: string;
  token: string | undefined;
  password: string;
  _id: string;
  username: string;
  dateOfJoining: Date;
  fcmToken: string | undefined;
  bureauId: PopulatedDoc<IBureauDocument>;
  designationId: PopulatedDoc<IDesignationDocument>;
}

//Employee INTERFACE WITH METHODS
export interface IEmployee extends IEmployeeDocument {
  generateAuthToken(this: IEmployeeDocument): Promise<string>;
  toJSON(this: IEmployeeDocument): Promise<IEmployeeDocument>;
}

//Employee INTERFACE WITH STATICS
export interface IEmployeeModel extends Model<IEmployee> {
  findByCredentials(
    email: string,
    password: string,
    req: Request,
    res: Response
  ): Promise<IEmployee>;
}

//Employee SCHEMA
export const EmployeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: `Enter a valid Email address!`,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (phone: string) {
          return /^\d{10}$/.test(phone);
        },
        message: `Enter a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },

    token: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
    },
    dateOfJoining: {
      type: Date,
      default: Date.now(),
    },
    fcmToken: {
      type: String,
    },
    bureauId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: BureauModel,
    },
    designationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: DesignationModel,
    },
  },
  {
    timestamps: true,
  }
);

//PRE SAVE HOOK
EmployeeSchema.pre("save", preSave);

//POST REMOVE HOOK
// EmployeeSchema.post("remove", postRemove);

//GENERATE AUTH TOKEN METHOD ON SCHEMA
EmployeeSchema.methods.generateAuthToken = generateAuthToken;

//FIND BY CREDENTIALS STATIC METHOD ON SCHEMA
EmployeeSchema.statics.findByCredentials = findByCredentials;

EmployeeSchema.methods.toJSON = toJSON;

//EXPORTING MODEL
export const EmployeeModel = model<IEmployee, IEmployeeModel>(
  "Employee",
  EmployeeSchema
);
