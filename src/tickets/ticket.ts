import * as fs from "fs";

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
  const rawData = fs.readFileSync(filePath);
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

export function writeTicket(ticket: Ticket): Promise<PostResponse> {
  const tickets = getTickets();
  const nextTicketId = getMaxId(tickets);

  ticket.id = nextTicketId;

  const data = JSON.stringify(ticket, null, 2);

  return new Promise((resolve, reject) => {
    if (!ticket.type) {
      reject({ hasErrors: true, message: "Ticket type is required" });
    } else {
      fs.appendFile(filePath, "," + data, (err) => {
        if (err) {
          reject({ hasErrors: true, message: err.message });
        } else {
          resolve({ hasErrors: false, message: "Ticket added successfully" });
        }
      });
    }
  });
}

function getMaxId(tickets: Ticket[]): number {
  return tickets.reduce((maxId, ticket) => {
    return Math.max(maxId, ticket.id);
  }, 1);
}
