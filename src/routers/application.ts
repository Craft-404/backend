import { Router, Request, Response } from "express";
import authFunction from "../middlewares/auth";
import {
  APPROVAL,
  INTERNAL_SERVER_ERROR,
  LILAVATI_AWARD,
  RESOURCE_CREATED,
  SWANATH_SCHOLARSHIP_SCHEME,
  YOUTH_UNDERTAKING_VISIT_FOR_ACQUIRING_KNOWLEDGE,
} from "../middlewares/constants";
import { ApplicationModel, IApplicationDocument } from "../models/application";
const router = Router();
import moment from "moment";
import { ISchemeDocument, SchemeModel } from "../models/scheme";
import { IUserDocument } from "../models/user";
import { BureauModel } from "../models/bureau";
import { EmployeeModel, IEmployeeDocument } from "../models/employee";
import { TicketModel } from "../models/ticket";
import { TicketAssigneeModel } from "../models/ticketAsssignee";

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  try {
    const scheme = await SchemeModel.findOne({ name: req.body.name });

    let bureau: string = "Administration";
    if (scheme!.name === SWANATH_SCHOLARSHIP_SCHEME) bureau = "Administration";
    else if (scheme!.name === YOUTH_UNDERTAKING_VISIT_FOR_ACQUIRING_KNOWLEDGE)
      bureau = "Approval";
    else if (scheme!.name === LILAVATI_AWARD) bureau = "Finance";
    const bureauId = (await BureauModel.findOne({ name: bureau }))?._id;
    const employee = await EmployeeModel.findOne({
      bureauId,
      designationId: "630749082d9754bace7d6d00",
    });
    const application = new ApplicationModel({
      ...req.body,
      userId: req.user._id,
      scheme: scheme!._id,
    });
    await application.save();
    const ticket = new TicketModel({
      reporter: employee!._id,
      title: scheme!.name,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      category: "Approval",
      applicationId: application._id,
      description: `Computer Generated: Approval for scheme ${scheme!.name}`,
    });
    await ticket.save();

    const ticketAssignee = new TicketAssigneeModel({
      employeeId: employee!._id,
      ticketId: ticket!._id,
    });

    await ticketAssignee.save();

    return res.status(RESOURCE_CREATED.status).send(application);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/tickets/:applicationId", async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const tickets = await TicketModel.find({
      applicationId,
      category: APPROVAL,
    })
      .populate<{ reporter: IEmployeeDocument }>("reporter", "id name")
      .populate<{ applicationId: IApplicationDocument }>(
        "applicationId",
        "scheme"
      );

    return res.status(200).send(tickets);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const application = await ApplicationModel.findById(req.params.id)
      .populate<{ userId: IUserDocument }>("userId", "id name email")
      .populate<{ scheme: ISchemeDocument }>("scheme", "id name");

    console.log(application);
    return res.status(200).send(application);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const applications = await ApplicationModel.find({
      userId: req.user._id,
    })
      .populate<{ userId: IUserDocument }>("userId", "id name")
      .populate<{ scheme: ISchemeDocument }>("scheme", "id name");
    console.log(applications);
    return res.status(200).send(applications);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
