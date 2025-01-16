import { Router } from "express";
import { updateUserDetails } from "../controllers/user.controller";
import { validateUserToken } from "../middlewares/validateUserToken.middleware";

const router = Router();

router.put("/update-details", validateUserToken, updateUserDetails);

export default router;
