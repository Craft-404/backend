import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_UPDATED,
} from "../middlewares/constants";
import { DocumentModel } from "../models/document";
const router = Router();
import axios from "axios";

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
    const document = new DocumentModel({
      ...req.body,
      uploadedBy: req.user._id,
    });

    //axios request
    axios.get(
      "https://25e0-2409-4063-6d07-4dd0-61bc-4ec9-c106-7b2b.ngrok.io/tenMS",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await document.save();
    return res.status(201).send(document);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.patch("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { isVerified } = req.body;
    const document = await DocumentModel.findById(_id);
    document!.isVerified = isVerified;
    await document?.save();
    return res.status(RESOURCE_UPDATED.status).send(RESOURCE_UPDATED);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/:appId", async (req: Request, res: Response) => {
  try {
    const { appId } = req.params;
    const document = await DocumentModel.find({
      applicationId: appId,
    });
    return res.status(200).send(document);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});
export default router;
