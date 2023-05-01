import express from "express";
import {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../tickets/ticket";
import { adaptJsonToXml, adaptXmlBodyToJson } from "../utils";

const router = express.Router();

router.get("/rest/list", async (req, res) => {
  const tickets = await getTickets();

  return res.status(200).send(JSON.stringify(tickets, null, 2));
});

router.post("/rest/ticket", async (req, res) => {
  const response = await createTicket(req.body);

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  return res.status(201).send(response.data);
});

router.get("/rest/ticket/:id", async (req, res) => {
  const ticket = await getTicketById(Number(req.params.id));

  return ticket
    ? res.status(200).send(JSON.stringify(ticket, null, 2))
    : res.status(404).send(`Ticket with id ${req.params.id} not found.`);
});

router.put("/rest/ticket/:id", async (req, res) => {
  const response = await updateTicket(req.body, Number(req.params.id));

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  return res.status(200).send(response.data);
});

router.delete("/rest/ticket/:id", async (req, res) => {
  const response = await deleteTicket(Number(req.params.id));

  return res.status(200).send(response);
});

router.get("/rest/xml/ticket/:id", async (req, res) => {
  try {
    const ticket = await getTicketById(Number(req.params.id));

    if (ticket) {
      const xmlTicket = adaptJsonToXml(ticket);
      res.status(200).contentType("application/xml").send(xmlTicket);
    } else {
      res.status(404).send(`Ticket with id ${req.params.id} not found.`);
    }
  } catch (error) {
    res.status(500).send("Error processing the request.");
  }
});

router.put("/rest/xml/ticket/:id", async (req, res) => {
  try {
    const ticket = adaptXmlBodyToJson(req.body);
    if (ticket) {
      const response = await updateTicket(ticket, Number(req.params.id));

      if (response.validationResult?.hasErrors) {
        res
          .status(400)
          .send(
            JSON.stringify(response.validationResult.errorMessages, null, 2)
          );
      } else {
        res.status(200).send(response.data);
      }
    } else {
      res.status(400).send("Invalid XML data.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error processing the request.");
  }
});

export { router as TicketsController };
