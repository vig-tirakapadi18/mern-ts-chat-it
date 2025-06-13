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

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(statusCodes.code400).json({
        success: booleanValues.falseValue,
        message: errorMessages.invalidInputRequest,
      });
    }

    console.log("HEY");

    const user = await User.findOne({ email });
    if (user) {
      return res.status(statusCodes.code400).json({
        success: booleanValues.falseValue,
        message: errorMessages.userExists,
      });
    }

    const hashedPasword = await bcrypt.hash(password, 9);
    const newUser = await User.create({ ...req.body, password: hashedPasword });

    if (!newUser) {
      return res.status(statusCodes.code500).json({
        message: errorMessages.createUser,
      });
    }

    const token = generateToken(
      { id: newUser._id.toString(), email: newUser.email },
      res
    );

    return res.status(statusCodes.code201).json({
      success: booleanValues.trueValue,
      message: successMessages.createUser,
      user: {
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
      token,
    });
  } catch (error: unknown) {
    console.log("SIGN UP ERROR:", error);
    return res.status(statusCodes.code500).json({
      message: errorMessages.internalServerError,
    });
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

    const token = generateToken(
      { id: user._id.toString(), email: user.email },
      res
    );

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
      token,
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
    res
      .status(200)
      .json({ success: true, message: successMessages.userSignOut });
  } catch (error: unknown) {
    console.log("SIGN OUT", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};
