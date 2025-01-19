import { Router } from "express";
import {
  getLoggedInUser,
  updateUserDetails,
} from "../controllers/user.controller";
import { validateUserToken } from "../middlewares/validateUserToken.middleware";

const router = Router();

router.put("/user/update-details", validateUserToken, updateUserDetails);

router.get("/user/logged-user", validateUserToken, getLoggedInUser);

export default router;
