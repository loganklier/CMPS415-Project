import express from "express";
import { json } from "body-parser";
import { TicketRouter } from "./routes/ticket";

const app = express();

app.use(json());
app.use("/", TicketRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
