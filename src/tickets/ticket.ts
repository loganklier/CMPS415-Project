import { readFileSync } from "fs";
import fs from "fs/promises";
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

const filePath = "./tickets.json";

export function getTickets(): Ticket[] {
  const rawData = readFileSync(path.resolve(__dirname, filePath));
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
  hasErrors: boolean;
  message: string;
};

export async function writeTicket(ticket: Ticket): Promise<PostResponse> {
  const tickets = getTickets();

  const nextTicketId = getNextId(tickets);
  ticket.id = nextTicketId;

  if (!ticket.type) {
    return Promise.resolve({
      hasErrors: true,
      message: "Ticket type is required",
    });
  }

  tickets.push(ticket);
  const updatedContent = JSON.stringify(tickets, null, 2);

  fs.writeFile(filePath, updatedContent);

  return Promise.resolve({
    hasErrors: false,
    message: "Ticket added successfully",
  });
}

function getNextId(tickets: Ticket[]): number {
  return tickets.reduce((maxId, ticket) => {
    return Math.max(maxId, ticket.id) + 1;
  }, 1);
}
