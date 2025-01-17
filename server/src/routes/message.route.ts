import { Router } from "express";
import { validateUserToken } from "../middlewares/validateUserToken.middleware";
import {
  getAllMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller";

const router = Router();

router.get("/users", validateUserToken, getUsersForSidebar);

router.get("/:id", validateUserToken, getAllMessages);

router.post("/send/:id", validateUserToken, sendMessage);

export default router;
