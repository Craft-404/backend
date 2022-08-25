import { Schema, model } from "mongoose";

export interface ITaskAssigneeDocument extends Document {
  taskId: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId;
}

//Employee SCHEMA
export const TaskAssigneeSchema = new Schema<ITaskAssigneeDocument>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const TaskAssigneeModel = model<ITaskAssigneeDocument>(
  "TaskAssignee",
  TaskAssigneeSchema
);
