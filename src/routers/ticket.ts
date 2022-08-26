import { Router, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import authFunction from "../middlewares/auth";
import {
  ADMIN,
  BAD_REQUEST_ERROR,
  COMPLETED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
  RESTRICTED_ERROR,
} from "../middlewares/constants";
import { TicketAssigneeModel } from "../models/ticketAsssignee";
import { ITicketDocument, TicketModel } from "../models/ticket";
import { DesignationModel } from "../models/designation";
import { IUserDocument } from "../models/user";
const router = Router();

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const ticket = new TicketModel({
        ...req.body,
        reporter: req.employee._id,
      });
      await ticket.save({ session });
      const assignees = req.body.assignees;
      if (assignees.length === 0 || !assignees)
        return res.status(BAD_REQUEST_ERROR.status).send(BAD_REQUEST_ERROR);
      await Promise.all(
        assignees.map(async (assigneeId: string) => {
          const taskAssignee = new TicketAssigneeModel({
            employeeId: assigneeId,
            ticketId: ticket._id,
          });
          await taskAssignee.save({ session });
        })
      );
    });
    return res.status(201).send(RESOURCE_CREATED);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  } finally {
    await session.endSession();
  }
});

router.patch("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res.status(BAD_REQUEST_ERROR.status).send(BAD_REQUEST_ERROR);
    let ticket = await TicketModel.findById(_id);
    if (!ticket)
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR);
    console.log();
    let isAuthenticated = false;
    let ticketAssignee = await TicketAssigneeModel.find({
      ticketId: _id,
      employeeId: req.employee._id,
    });

    const designation = await DesignationModel.findById(
      req.employee.designationId
    );
    if (ticketAssignee || designation?.name === ADMIN) isAuthenticated = true;
    if (!isAuthenticated)
      return res.status(RESTRICTED_ERROR.status).send(RESTRICTED_ERROR);
    const { status, priority } = req.body;
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    // console.log(ticket);
    // console.log(req.body);
    await ticket!.save();
    return res.status(RESOURCE_UPDATED.status).send(ticket);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/date", async (req: Request, res: Response) => {
  try {
    const { endDate, overdue, startDate } = req.query;
    const END_DATE = new Date(endDate as string);
    const START_DATE = new Date(startDate as string);
    console.log("end: ", END_DATE, "start: ", START_DATE, "overdue: ", overdue);
    const ticketAssignee = await TicketAssigneeModel.find({
      employeeId: req.employee._id,
    });
    let ticketIds: Schema.Types.ObjectId[] = [];
    ticketAssignee.map((t) => {
      ticketIds.push(t.ticketId);
    });

    if (overdue) {
      const overdue = await TicketModel.find({
        _id: { $in: ticketIds },
        dueDate: { $lte: new Date(endDate!.toString()) },
        status: { $ne: COMPLETED },
      }).populate<{ reporter: IUserDocument }>("reporter", "id name");
      return res.status(200).send({ tasks: overdue });
    }
    console.log(startDate, endDate);
    const tasks = await TicketModel.find({
      _id: { $in: ticketIds },
      dueDate: { $lte: new Date(endDate!.toString()) },
      startDate: { $gte: new Date(startDate!.toString()) },
      status: { $ne: COMPLETED },
    }).populate<{ reporter: IUserDocument }>("reporter", "id name");
    return res.status(200).send(tasks);
  } catch (e: any) {
    console.log(e);
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/completed", async (req: Request, res: Response) => {
  try {
    const ticketAssignee = await TicketAssigneeModel.find({
      employeeId: req.employee._id,
    });
    let ticketIds: Schema.Types.ObjectId[] = [];
    ticketAssignee.map((t) => {
      ticketIds.push(t.ticketId);
    });
    const tasks = await TicketModel.find({
      _id: { $in: ticketIds },
      status: COMPLETED,
    }).populate<{ reporter: IUserDocument }>("reporter", "id name");
    return res.status(200).send(tasks);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    console.log(req.employee);
    const ticketAssignee = await TicketAssigneeModel.find({
      employeeId: req.employee._id,
    });

    let tickets: Schema.Types.ObjectId[] = [];
    ticketAssignee.map((ticket) => tickets.push(ticket.ticketId));

    const finalTickets = await TicketModel.find({
      _id: { $in: tickets },
    }).populate<{ reporter: IUserDocument }>("reporter", "id name");
    console.log(finalTickets);
    return res.status(200).send(finalTickets);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const ticketAssignee = await TicketAssigneeModel.findOne({
      ticketId: _id,
      employeeId: req.employee._id,
    });
    const ticket = await TicketModel.findById(_id);
    const designation = await DesignationModel.findById(
      req.employee.designationId
    );
    if (
      designation?.name === ADMIN ||
      ticketAssignee ||
      ticket!.reporter!.toString() == req.employee._id
    ) {
      return res.status(200).send(ticket);
    }
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

export default router;
