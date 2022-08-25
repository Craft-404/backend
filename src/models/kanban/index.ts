import { Schema, model } from "mongoose";

export interface IKanbanDocument extends Document {
  name: string;
  bureauId: Schema.Types.ObjectId;
}

//Employee SCHEMA
export const KanbanSchema = new Schema<IKanbanDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    bureauId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const KanbanModel = model<IKanbanDocument>("Kanban", KanbanSchema);
