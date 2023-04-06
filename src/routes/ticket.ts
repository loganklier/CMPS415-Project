import express, { Request } from "express";
import { getTickets, writeTicket } from "../tickets/ticket";

const router = express.Router();

router.get("/rest/list", (req, res) => {
  const tickets = getTickets();

  return res.status(200).send(JSON.stringify(tickets, null, 2));
});

router.post("/rest/ticket", async (req, res) => {
  const response = await writeTicket(req.body);

  if (response.hasErrors) {
    return res.status(400).send(response.message);
  }

  return res.status(201).send(response.message);
});

router.get("/rest/ticket/:id", (req, res) => {
  const tickets = getTickets();

  const ticket = tickets.find((x) => x.id === Number(req.params.id));

  return ticket
    ? res.status(200).send(JSON.stringify(ticket, null, 2))
    : res.status(404).send(`Ticket with id ${req.params.id} not found.`);
});

export { router as TicketRouter };
