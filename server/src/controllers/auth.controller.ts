import { Request, Response } from "express";
import {
  booleanValues,
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 8) {
    res.status(statusCodes.code400).json({
      success: booleanValues.falseValue,
      message: errorMessages.invalidInputRequest,
    });
    return;
  }

  const user = await User.findOne({ email });
  if (user) {
    res.status(statusCodes.code400).json({
      success: booleanValues.falseValue,
      message: errorMessages.userExists,
    });
  }

  const hashedPasword = await bcrypt.hash(password, 9);

  const newUser = await User.create({ ...req.body, password: hashedPasword });

  if (!newUser) {
    res.status(statusCodes.code500).json({ message: errorMessages.createUser });
    return;
  }

  const token = generateToken(
    { id: newUser._id.toString(), email: newUser.email },
    res
  );

  res.status(statusCodes.code201).json({
    success: booleanValues.trueValue,
    message: successMessages.createUser,
    user: {
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
    },
    token,
  });

  try {
  } catch (error: unknown) {
    console.log("SIGN UP", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(statusCodes.code401).json({
        success: booleanValues.falseValue,
        message: errorMessages.invalidCredentials,
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(statusCodes.code401).json({
        success: booleanValues.falseValue,
        message: errorMessages.invalidCredentials,
      });
      return;
    }

    res.status(statusCodes.code200).json({
      success: booleanValues.trueValue,
      message: successMessages.userLogin,
      user: { email: user.email, name: user.name, profilePic: user.profilePic },
    });
  } catch (error: unknown) {
    console.log("SIGN IN", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};

export const signOut = (req: Request, res: Response) => {
  try {
    res.cookie("chatIt", "", { maxAge: 0 });
  } catch (error: unknown) {
    console.log("SIGN OUT", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};
