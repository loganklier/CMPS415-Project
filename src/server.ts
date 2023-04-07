import express from "express";
import { json } from "body-parser";
import { TicketsController } from "./controllers/tickets";

const app = express();

app.use(json());
app.use("/", TicketsController);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
