import { Schema, model } from "mongoose";
export interface IDocumentDocument extends Document {
  title: string;
  uploadedBy: Schema.Types.ObjectId;
  description: string | undefined;
  documentLink: string;
  organisationName: string;
  organisationContact: string;
  metadata: string | undefined;
  isVerified: Boolean;
  applicationId: Schema.Types.ObjectId;
}

export const DocumentSchema = new Schema<IDocumentDocument>(
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
    uploadedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },

    documentLink: {
      type: String,
      required: true,
    },
    organisationName: {
      type: String,
      required: true,
    },
    organisationContact: {
      type: String,
      required: true,
    },
    metadata: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORTING MODEL
export const DocumentModel = model<IDocumentDocument>(
  "Document",
  DocumentSchema
);
