import { Schema, model, PopulatedDoc } from "mongoose";
import { ISchemeDocument, SchemeModel } from "../scheme";
import { IUserDocument, UserModel } from "../user";

export interface IApplicationDocument extends Document {
  scheme: PopulatedDoc<ISchemeDocument>;
  userId: PopulatedDoc<IUserDocument>;
  status: Number;
  documentLink: String | undefined;
  // marks:
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
    },
    documentLink: {
      type: String,
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
