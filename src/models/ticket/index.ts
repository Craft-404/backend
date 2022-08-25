import { Schema, model } from "mongoose";
import { PRIORITY, priorityEnum } from "../../middlewares/constants";

export interface ITicketDocument extends Document {
  title: string;
  reporter: Schema.Types.ObjectId;
  description: string | undefined;
  //   bucketId: Schema.Types.ObjectId;
  documentLink: string | undefined;
  //   startDate: Date;
  dueDate: Date;
  priority: priorityEnum;
}

//Employee SCHEMA
export const TicketSchema = new Schema<ITicketDocument>(
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
    // bucketId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    documentLink: {
      type: String,
    },
    // startDate: {
    //   type: Date,
    //   default: Date.now(),
    // },
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
export const TicketModel = model<ITicketDocument>("Ticket", TicketSchema);
