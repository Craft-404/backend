import { Schema, model } from "mongoose";
import {
  STATUSES,
  STATUS_ENUM,
  TICKET_TYPE_ENUM,
  TYPES,
} from "../../middlewares/constants";
// import { PRIORITY, priorityEnum } from "../../middlewares/constants";

export interface ITicketDocument extends Document {
  title: string;
  reporter: Schema.Types.ObjectId;
  description: string | undefined;
  applicationId: Schema.Types.ObjectId | undefined;
  documentId: string | undefined;
  remarks: string | undefined;
  dueDate: Date | undefined;
  priority: Number; //priorityEnum;
  status: STATUS_ENUM;
  category: TICKET_TYPE_ENUM;
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

    documentId: {
      type: Schema.Types.ObjectId,
    },

    dueDate: Date,
    priority: {
      type: Number,
      max: 5,
      min: 1,
      default: 3,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: STATUSES,
    },
    remarks: {
      type: String,
    },
    category: {
      type: String,
      enum: TYPES,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const TicketModel = model<ITicketDocument>("Ticket", TicketSchema);
