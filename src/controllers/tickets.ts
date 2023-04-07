import express, { Request } from "express";
import { getTickets, writeTicket } from "../tickets/ticket";

const router = express.Router();

router.get("/rest/list", (req, res) => {
  const tickets = getTickets();

  return res.status(200).send(JSON.stringify(tickets, null, 2));
});

router.post("/rest/ticket", async (req, res) => {
  const response = await writeTicket(req.body);

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  return res.status(201).send(response.data);
});

router.get("/rest/ticket/:id", (req, res) => {
  const tickets = getTickets();

  const ticket = tickets.find((x) => x.id === Number(req.params.id));

  return ticket
    ? res.status(200).send(JSON.stringify(ticket, null, 2))
    : res.status(404).send(`Ticket with id ${req.params.id} not found.`);
});

export { router as TicketsController };