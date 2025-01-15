import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (
  payload: { id: string; email: string },
  res: Response
) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("chatIt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
