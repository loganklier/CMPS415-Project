import * as fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
export interface Ticket {
  _id: ObjectId;
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

const uri =
  "mongodb+srv://loganklier:BpKepJmxn7qpwcI0@cmps415-project.2s3p4k5.mongodb.net/?retryWrites=true&w=majority";

export async function getTickets(): Promise<Ticket[]> {
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db("CMPS415-Project");
    const ticketsCollection = db.collection("Tickets");

    const cursor = ticketsCollection.find();
    const jsonData = await cursor.toArray();

    return jsonData.map((data: any) => ({
      _id: data._id,
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
  } finally {
    await client.close();
  }
}

export async function getTicketById(id: number): Promise<Ticket> {
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db("CMPS415-Project");
    const ticketsCollection = db.collection("Tickets");

    const ticket = (await ticketsCollection.findOne({ id: id })) as Ticket;

    return ticket;
  } finally {
    await client.close();
  }
}

export type CreateUpdateResponse = {
  validationResult?: ValidationResult;
  data: string;
};

export async function createTicket(
  ticket: Ticket
): Promise<CreateUpdateResponse> {
  ticket.created_at = new Date().toISOString();
  ticket.updated_at = new Date().toISOString();

  const validationResult = validateTicket(ticket);

  if (validationResult.hasErrors) {
    return Promise.resolve({
      data: "",
      validationResult: validationResult,
    });
  }

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db("CMPS415-Project");
    const ticketsCollection = db.collection("Tickets");

    const result = await ticketsCollection.insertOne(ticket);

    if (!result.acknowledged) {
      return {
        data: "",
        validationResult: {
          hasErrors: true,
          errorMessages: ["Database Error"],
        },
      };
    }

    const insertedTicket = (await ticketsCollection.findOne({
      _id: result.insertedId,
    })) as Ticket;

    return {
      data: JSON.stringify(insertedTicket, null, 2),
      validationResult: { hasErrors: false, errorMessages: [] },
    };
  } finally {
    await client.close();
  }
}

export async function updateTicket(
  ticket: Ticket,
  id: number
): Promise<CreateUpdateResponse> {
  const validationResult = validateTicket(ticket);

  if (validationResult.hasErrors) {
    return Promise.resolve({
      data: "",
      validationResult: validationResult,
    });
  }

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db("CMPS415-Project");
    const ticketsCollection = db.collection("Tickets");

    const existingTicket = await ticketsCollection.findOne({ id: id });

    if (!existingTicket) {
      return {
        data: "",
        validationResult: {
          hasErrors: true,
          errorMessages: ["Ticket not found"],
        },
      };
    }

    ticket.updated_at = new Date().toISOString();

    const result = await ticketsCollection.updateOne(
      { id: id },
      { $set: ticket }
    );

    if (!result.acknowledged) {
      return {
        data: "",
        validationResult: {
          hasErrors: true,
          errorMessages: ["Database Error"],
        },
      };
    }

    const updatedTicket = (await ticketsCollection.findOne({
      id: id,
    })) as Ticket;

    return {
      data: JSON.stringify(updatedTicket, null, 2),
      validationResult: { hasErrors: false, errorMessages: [] },
    };
  } finally {
    await client.close();
  }
}

export async function deleteTicket(id: number): Promise<string> {
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db("CMPS415-Project");
    const ticketsCollection = db.collection("Tickets");

    const existingTicket = await ticketsCollection.findOne({ id: id });

    if (!existingTicket) {
      return `Ticket with id ${id} not found.`;
    }

    const result = await ticketsCollection.deleteOne({ id: id });

    if (!result.acknowledged || result.deletedCount !== 1) {
      return `Database Error`;
    }

    return `Ticket with id ${id} deleted.`;
  } finally {
    await client.close();
  }
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
