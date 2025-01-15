import express, { Request, Response } from "express";
import "dotenv/config";

// Routes
import authRoutes from "./src/routes/auth.route";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on ${PORT}!`));
