import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/ddb8op2fe/image/upload/v1737289760/7502639_no71aa.webp",
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
