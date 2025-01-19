import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    profilePic: {
      type: String,
      default:
        "https://images.freeimages.com/image/thumbs/b3f/insta-profile-icon-png-5690389.png",
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
