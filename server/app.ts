import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDB } from "./src/db/connectToDB";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
  connectToDB();
});
