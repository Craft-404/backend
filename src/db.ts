import mongoose from "mongoose";
import { MONGO_URL, SERVICE_ACCOUNT_KEY } from "./config";
import admin from "firebase-admin";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((e) => {
    console.log("hi");
    console.log(e);
  });

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: SERVICE_ACCOUNT_KEY.private_key,
    projectId: SERVICE_ACCOUNT_KEY.project_id,
    clientEmail: SERVICE_ACCOUNT_KEY.client_email,
  }),
});
