import { Schema, model } from "mongoose";

export interface IAnnouncementDocument extends Document {
  name: string;
  bureauId: Schema.Types.ObjectId;
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
