import { Request, Response } from "express";
import {
  booleanValues,
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";
import cloudinary from "../db/cloudinary";
import User from "../models/user.model";

export const updateUserDetails = async (req: Request, res: Response) => {
  const { name, profilePic } = req.body;
  const userId = req.userId;

  if (!name || !profilePic) {
    res.status(statusCodes.code400).json({
      success: booleanValues.falseValue,
      message: errorMessages.invalidInputRequest,
    });
    return;
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(statusCodes.code200).json({
      success: statusCodes.code200,
      user: updatedUser,
      message: successMessages.userUpdate,
    });
  } catch (error) {
    console.log("UPDATE USER DETAILS", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(statusCodes.code403).json({
        success: booleanValues.falseValue,
        message: errorMessages.unauthorized,
      });
      return;
    }

    res.status(statusCodes.code200).json({
      success: booleanValues.trueValue,
      user,
      message: successMessages.userFetch,
    });
  } catch (error) {
    console.log("GET LOGGED IN USER", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};
