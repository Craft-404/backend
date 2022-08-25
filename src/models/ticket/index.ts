import { Schema, model } from "mongoose";
// import { PRIORITY, priorityEnum } from "../../middlewares/constants";

export interface ITicketDocument extends Document {
  title: string;
  reporter: Schema.Types.ObjectId;
  description: string | undefined;
  applicationId: Schema.Types.ObjectId | undefined;
  documentId: string | undefined;
  //   startDate: Date;
  dueDate: Date | undefined;
  priority: Number; //priorityEnum;
  //TODO   status:
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
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const TicketModel = model<ITicketDocument>("Ticket", TicketSchema);
