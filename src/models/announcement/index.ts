import { Schema, model, PopulatedDoc } from "mongoose";
import { BureauModel, IBureauDocument } from "../bureau";

export interface IAnnouncementDocument extends Document {
  name: string;
  bureauId: PopulatedDoc<IBureauDocument>;
}

export const AnnouncementSchema = new Schema<IAnnouncementDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    bureauId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: BureauModel,
    },
  },
  {
    timestamps: true,
  }
);

export const AnnouncementModel = model<IAnnouncementDocument>(
  "Announcement",
  AnnouncementSchema
);
