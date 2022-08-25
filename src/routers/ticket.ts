import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import authFunction from "../middlewares/auth";
import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../middlewares/constants";
import { TaskAssigneeModel } from "../models/taskAssignee";
import { TicketModel } from "../models/ticket";
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
          const taskAssignee = new TaskAssigneeModel({
            assigneeId,
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

export default router;
