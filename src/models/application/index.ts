import { Schema, model } from "mongoose";

export interface IApplicationDocument extends Document {
  scheme: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  status: Number;
  applicationFormLink: String | undefined;
}

export const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    scheme: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: Number,
    },
    applicationFormLink: {
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
