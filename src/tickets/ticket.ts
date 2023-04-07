import * as fs from "fs";
import path from "path";

export interface Ticket {
  id: number;
  created_at: string;
  updated_at: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  recipient: string;
  submitter: string;
  assignee_id: number;
  follower_ids: number[];
  tags: string[];
}

const filePath = "../../tickets-db.json";

export function getTickets(): Ticket[] {
  const rawData = fs.readFileSync(path.resolve(__dirname, filePath));
  const jsonData = JSON.parse(rawData.toString());
  return jsonData.map((data: any) => ({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    type: data.type,
    subject: data.subject,
    description: data.description,
    priority: data.priority,
    status: data.status,
    recipient: data.recipient,
    submitter: data.submitter,
    assignee_id: data.assignee_id,
    follower_ids: data.follower_ids,
    tags: data.tags,
  }));
}

export type PostResponse = {
  validationResult?: ValidationResult;
  data: string;
};

export async function writeTicket(ticket: Ticket): Promise<PostResponse> {
  const tickets = getTickets();

  const nextTicketId = getNextId(tickets);
  ticket.id = nextTicketId;
  ticket.created_at = new Date().toISOString();
  ticket.updated_at = new Date().toISOString();

  const validationResult = validateTicket(ticket);

  if (validationResult.hasErrors) {
    return Promise.resolve({
      data: "",
      validationResult: validationResult,
    });
  }

  tickets.push(ticket);
  const updatedContent = JSON.stringify(tickets, null, 2);

  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), updatedContent);
    return Promise.resolve({
      data: JSON.stringify(ticket, null, 2),
    });
  } catch (err) {
    console.log(err);
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: ["Failed to write ticket to file"],
      },
    });
  }
}

function getNextId(tickets: Ticket[]): number {
  return tickets.reduce((maxId, ticket) => {
    return Math.max(maxId, ticket.id) + 1;
  }, 1);
}

type ValidationResult = {
  hasErrors: boolean;
  errorMessages: string[];
};

function validateTicket(ticket: Ticket): ValidationResult {
  const requiredProperties: (keyof Ticket)[] = [
    "type",
    "subject",
    "description",
    "priority",
    "status",
    "recipient",
    "submitter",
    "assignee_id",
  ];

  const errorMessages: string[] = requiredProperties
    .filter((property) => !ticket[property])
    .map(getRequiredText);

  return {
    hasErrors: errorMessages.length > 0,
    errorMessages,
  };
}

function getRequiredText(property: string) {
  return `${property} is required`;
}
