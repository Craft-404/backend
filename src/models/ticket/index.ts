import { Schema, model, PopulatedDoc } from "mongoose";
import {
  CREATED,
  STATUSES,
  STATUS_ENUM,
  TICKET_TYPE_ENUM,
  TYPES,
} from "../../middlewares/constants";
import { ApplicationModel, IApplicationDocument } from "../application";
import { DocumentModel, IDocumentDocument } from "../document";
import { EmployeeModel, IEmployeeDocument } from "../employee";
// import { PRIORITY, priorityEnum } from "../../middlewares/constants";

export interface ITicketDocument extends Document {
  title: string;
  reporter: PopulatedDoc<IEmployeeDocument>;
  description: string | undefined;
  applicationId: PopulatedDoc<IApplicationDocument>;
  documentId: PopulatedDoc<IDocumentDocument>;
  remarks: string | undefined;
  dueDate: Date | undefined;
  priority: Number;
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
      ref: EmployeeModel,
    },
    description: {
      type: String,
    },

    documentId: {
      type: Schema.Types.ObjectId,
      ref: DocumentModel,
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
      ref: ApplicationModel,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: CREATED,
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
