import { Schema, model } from "mongoose";

export interface IDesignationDocument extends Document {
  name: string;
}

export const DesignationSchema = new Schema<IDesignationDocument>(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const DesignationModel = model<IDesignationDocument>(
  "Designation",
  DesignationSchema
);
