import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on ${PORT}!`));
