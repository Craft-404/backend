import { Schema, model } from "mongoose";

export interface IBucketDocument extends Document {
  name: string;
  kanbanId: Schema.Types.ObjectId;
  color: string;
}

//Employee SCHEMA
export const BucketSchema = new Schema<IBucketDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    kanbanId: {
      type: Schema.Types.ObjectId,
    },
    color: {
      type: String,
      //TODO default: random hex code picker
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const BucketModel = model<IBucketDocument>("Bucket", BucketSchema);
