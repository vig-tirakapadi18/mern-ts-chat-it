import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: String,
    image: String,
  },
  { timestamps: true }
);

const MessageModel = model("Message", messageSchema);

export default MessageModel;
