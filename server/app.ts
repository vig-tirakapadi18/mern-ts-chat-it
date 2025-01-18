import express, { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./src/db/connectToDB";

// Routes
import authRoutes from "./src/routes/auth.route";
import userRoutes from "./src/routes/user.route";
import messageRoutes from "./src/routes/message.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
  connectToDB();
});
