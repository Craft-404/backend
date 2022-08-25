import { Schema, model } from "mongoose";

export interface IBureauDocument extends Document {
  name: string;
  managerId: Schema.Types.ObjectId;
}

//Employee SCHEMA
export const BureauSchema = new Schema<IBureauDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    managerId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const BureauModel = model<IBureauDocument>("Bureau", BureauSchema);
