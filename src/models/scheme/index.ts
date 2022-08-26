import { Schema, model } from "mongoose";
import { USER_TYPE, USER_TYPES } from "../../middlewares/constants";

export interface ISchemeDocument extends Document {
  name: string;
  for: USER_TYPE;
  description: string | undefined;
}

//TODO add template document

export const SchemeSchema = new Schema<ISchemeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    for: {
      type: String,
      enum: USER_TYPES,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const SchemeModel = model<ISchemeDocument>("Scheme", SchemeSchema);
