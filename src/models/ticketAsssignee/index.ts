import { Schema, model } from "mongoose";

export interface ITicketAssigneeDocument extends Document {
  ticketId: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId;
}

//Employee SCHEMA
export const TicketAssigneeSchema = new Schema<ITicketAssigneeDocument>(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const TicketAssigneeModel = model<ITicketAssigneeDocument>(
  "TicketAssignee",
  TicketAssigneeSchema
);
