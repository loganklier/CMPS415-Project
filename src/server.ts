import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import xmlparser from "express-xml-bodyparser";
import { TicketsController } from "./controllers/tickets";

const app = express();

function parseBody(req: Request, res: Response, next: NextFunction): void {
  const contentType = req.headers["content-type"];

  if (contentType === "application/json") {
    return json()(req, res, next);
  } else if (contentType === "application/xml" || contentType === "text/xml") {
    return xmlparser()(req, res, next);
  } else {
    // Create an error and pass it to the next middleware using the `next` function
    const error = new Error("Unsupported media type");
    res.status(415);
    next(error);
  }
}

app.use(parseBody); // Use the parseBody function as middleware

app.use("/", TicketsController);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
