import { model, Schema } from "mongoose";

export interface IRoleDocument extends Document {
  name: string;
}
//Role SCHEMA
export const RoleSchema = new Schema<IRoleDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const RoleModel = model<IRoleDocument>("Role", RoleSchema);
