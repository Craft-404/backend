import { Schema, model, PopulatedDoc } from "mongoose";
import { ISchemeDocument, SchemeModel } from "../scheme";
import { IUserDocument, UserModel } from "../user";

export interface IApplicationDocument extends Document {
  scheme: PopulatedDoc<ISchemeDocument>;
  userId: PopulatedDoc<IUserDocument>;
  status: Number;
}

export const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    scheme: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: SchemeModel,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const ApplicationModel = model<IApplicationDocument>(
  "Application",
  ApplicationSchema
);
