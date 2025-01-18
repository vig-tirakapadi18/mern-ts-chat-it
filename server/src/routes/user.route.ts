import { Router } from "express";
import {
  getLoggedInUser,
  updateUserDetails,
} from "../controllers/user.controller";
import { validateUserToken } from "../middlewares/validateUserToken.middleware";

const router = Router();

router.put("/update-details", validateUserToken, updateUserDetails);

router.get("/logged-user", getLoggedInUser);

export default router;
