import { NextFunction, Request, Response } from "express";
import { booleanValues, errorMessages, statusCodes } from "../utils/constants";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const validateUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.chatIt;

    if (!token) {
      res.status(statusCodes.code403).json({
        success: booleanValues.falseValue,
        message: errorMessages.unauthorizedNoToken,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      res.status(statusCodes.code403).json({
        success: booleanValues.falseValue,
        message: errorMessages.unauthorizedInvalidToken,
      });
    }

    req.userId = (decoded as jwt.JwtPayload).id;

    next();
  } catch (error: unknown) {
    res.status(statusCodes.code500).json({
      success: booleanValues.falseValue,
      message: errorMessages.internalServerError,
    });
  }
};
