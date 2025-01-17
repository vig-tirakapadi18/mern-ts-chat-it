import { Request, Response } from "express";
import User from "../models/user.model";
import {
  booleanValues,
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    res.status(statusCodes.code200).json({
      success: booleanValues.trueValue,
      users,
      message: successMessages.usersFetch,
    });
  } catch (error: unknown) {
    console.log("GET USERS FOR SIDEBAR", error);
    res.status(statusCodes.code500).json({
      success: booleanValues.falseValue,
      message: errorMessages.internalServerError,
    });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  const receiverId = req.params.id;
  const senderId = req.userId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(statusCodes.code200).json({
      success: booleanValues.trueValue,
      messages,
      message: successMessages.messageFetch,
    });
  } catch (error: unknown) {
    console.log("GET ALL MESSAGES", error);
    res.status(statusCodes.code500).json({
      success: booleanValues.falseValue,
      message: errorMessages.internalServerError,
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { message, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.userId;

  try {
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: socket.io will be added
  } catch (error: unknown) {
    console.log("SEND MESSAGE", error);
    res.status(statusCodes.code500).json({
      success: booleanValues.falseValue,
      message: errorMessages.internalServerError,
    });
  }
};
