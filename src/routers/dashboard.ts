import { Router, Request, Response } from "express";
import { Schema } from "mongoose";
import authFunction from "../middlewares/auth";
import {
  ADMIN,
  APPROVAL,
  CREATED,
  INTERNAL_SERVER_ERROR,
  IN_PROCESS,
  RESOURCE_CREATED,
  RESTRICTED_ERROR,
  TASK,
} from "../middlewares/constants";
import { AnnouncementModel } from "../models/announcement";
import { BureauModel, IBureauDocument } from "../models/bureau";
import { DesignationModel } from "../models/designation";
import { IDocumentDocument } from "../models/document";
import { IEmployeeDocument } from "../models/employee";
import { TicketModel } from "../models/ticket";
import { TicketAssigneeModel } from "../models/ticketAsssignee";
const router = Router();

router.use(authFunction);

router.get("/", async (req: Request, res: Response) => {
  try {
    const taskAssignees = await TicketAssigneeModel.find({
      employeeId: req.employee._id,
    });
    let tickets: Schema.Types.ObjectId[] = [];
    taskAssignees.map((task) => {
      tickets.push(task.ticketId);
    });
    const tasks = await TicketModel.find({
      _id: { $in: tickets },
      status: { $in: [IN_PROCESS, CREATED] },
      category: TASK,
      applicationId: { $exists: false },
    })
      .limit(3)
      .populate<{ reporter: IEmployeeDocument }>("reporter", "id name")
      .populate<{ documentId: IDocumentDocument }>("documentId", "id link");
    const overdue = await TicketModel.find({
      _id: { $in: tickets },
      status: { $in: [IN_PROCESS, CREATED] },
      dueDate: { $lte: new Date(Date.now()) },
    })
      .populate<{ reporter: IEmployeeDocument }>("reporter", "id name")
      .populate<{ documentId: IDocumentDocument }>("documentId", "id link");
    const approvals = await TicketModel.find({
      _id: { $in: tickets },
      status: { $in: [IN_PROCESS, CREATED] },
      category: APPROVAL,
      applicationId: { $exists: true },
    })
      .limit(3)
      .populate<{ reporter: IEmployeeDocument }>("reporter", "id name")
      .populate<{ documentId: IDocumentDocument }>("documentId", "id link");
    const bureau = await BureauModel.findById(req.employee.bureauId);
    const announcements = await AnnouncementModel.find({
      bureauId: bureau?._id,
    }).limit(3);
    // .populate<{ bureauId: IBureauDocument }>("bureauId");
    return res.status(200).send({ approvals, announcements, tasks, overdue });
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
