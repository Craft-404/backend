import { Schema, model } from "mongoose";

export interface ISchemeDocument extends Document {
  name: string;
  maxStatus: Number;
  minAge: Number;
  maxAge: Number;
}

//TODO add template document

export const SchemeSchema = new Schema<ISchemeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    maxStatus: {
      type: Number,
      required: true,
    },
    minAge: {
      type: Number,
      required: true,
    },
    maxAge: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const SchemeModel = model<ISchemeDocument>("Scheme", SchemeSchema);
