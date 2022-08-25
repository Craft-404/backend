import { Schema, model } from "mongoose";
import { PRIORITY, priorityEnum } from "../../middlewares/constants";

export interface ITaskDocument extends Document {
  title: string;
  reporter: Schema.Types.ObjectId;
  description: string | undefined;
  bucketId: Schema.Types.ObjectId;
  link: string | undefined;
  startDate: Date;
  dueDate: Date;
  priority: priorityEnum;
}

//Employee SCHEMA
export const TaskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (title: string) {
          return title.length <= 60;
        },
        message: `Title should be less than 60 characters!`,
      },
    },
    reporter: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    bucketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    link: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: PRIORITY,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const TaskModel = model<ITaskDocument>("Task", TaskSchema);
