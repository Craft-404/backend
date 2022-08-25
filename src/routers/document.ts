import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import { INTERNAL_SERVER_ERROR } from "../middlewares/constants";
import { DocumentModel } from "../models/document";
const router = Router();

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
    const document = new DocumentModel({
      ...req.body,
      uploadedBy: req.employee._id,
    });
    await document.save();
    return res.status(201).send(document);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

// router.get("/")
export default router;
