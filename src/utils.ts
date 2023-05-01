import { xml2js, js2xml } from "xml-js";
import { Ticket, TicketWrapper } from "./tickets/ticket";

export function adaptJsonToXml(ticket: Ticket): string {
  ticket._id = ticket._id?.toString();
  const options = {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  };
  return js2xml(ticket, options);
}

export function adaptXmlBodyToJson(xml: any): Ticket {
  const xmlString = js2xml(xml, { compact: true, spaces: 4 });

  const trimmedXmlString = xmlString.trim();

  const ticketJson = xmlToJson(trimmedXmlString) as TicketWrapper;

  return extractTicketData(ticketJson.ticket);
}

export function xmlToJson(xml: string): object {
  const options = {
    compact: true,
    ignoreComment: true,
  };
  return xml2js(xml, options);
}

export function extractTicketData(ticketJson: any): Ticket {
  return {
    type: ticketJson.type._text,
    subject: ticketJson.subject._text,
    description: ticketJson.description._text,
    priority: ticketJson.priority._text,
    status: ticketJson.status._text,
    recipient: ticketJson.recipient._text,
    submitter: ticketJson.submitter._text,
    assignee_id: parseInt(ticketJson.assignee_id._text, 10),
    follower_ids: ticketJson.follower_ids.map((obj: any) =>
      parseInt(obj._text, 10)
    ),
    tags: ticketJson.tags.map((obj: any) => obj._text),
    created_at: ticketJson.created_at?._text,
    updated_at: ticketJson.updated_at?._text,
  };
}
