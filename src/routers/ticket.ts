import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import authFunction from "../middlewares/auth";
import {
  ADMIN,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  RESOURCE_UPDATED,
  RESTRICTED_ERROR,
} from "../middlewares/constants";
import { TicketAssigneeModel } from "../models/ticketAsssignee";
import { TicketModel } from "../models/ticket";
import { DesignationModel } from "../models/designation";
const router = Router();

router.use(authFunction);

router.post("/", async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const ticket = new TicketModel(req.body);
      await ticket.save({ session });
      const assignees = req.body.assignees;
      if (assignees.length === 0 || !assignees)
        return res.status(BAD_REQUEST_ERROR.status).send(BAD_REQUEST_ERROR);
      await Promise.all(
        assignees.map(async (assigneeId: string) => {
          const taskAssignee = new TicketAssigneeModel({
            employee: assigneeId,
            ticketId: ticket._id,
          });
          await taskAssignee.save({ session });
        })
      );
    });
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
    let isAuthenticated = false;
    let ticketAssignees = await TicketAssigneeModel.find({ ticketId: _id });
    let ticketAssigneeIDs = ticketAssignees.map((ticket) => {
      return ticket.employeeId;
    });
    const designation = await DesignationModel.findById(
      req.employee.designationId
    );
    if (
      [ticket.reporter.toString(), ...ticketAssigneeIDs].includes(
        req.employee._id
      ) ||
      designation?.name === ADMIN
    )
      isAuthenticated = true;
    if (!isAuthenticated)
      return res.status(RESTRICTED_ERROR.status).send(RESTRICTED_ERROR);
    ticket = {
      ...ticket,
      ...req.body,
    };
    await ticket!.save();
    return res.status(RESOURCE_UPDATED.status).send(ticket);
  } catch (e: any) {
    if (e.status) return res.status(e.status).send(e.message);
    else return res.status(INTERNAL_SERVER_ERROR.status).send(e);
  }
});

router.get("/", async (req: Request, res: Response) => {});

export default router;
