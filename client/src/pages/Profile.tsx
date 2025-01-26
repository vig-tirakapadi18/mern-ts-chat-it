import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FcOldTimeCamera } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Profile: FC = (): React.JSX.Element => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>(
    authUser?.name as string
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image as string);
    };
  };

  const handleProfileUpdate = async (event: FormEvent) => {
    event.preventDefault();

    await updateProfile({
      name: updatedName,
      profilePic:
        selectedImage ||
        "https://res.cloudinary.com/ddb8op2fe/image/upload/v1737289760/7502639_no71aa.webp",
    });
  };

  return (
    <form className="h-screen pt-20" onSubmit={handleProfileUpdate}>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update your profile</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser?.profilePic}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <FcOldTimeCamera size={22} />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your profile picture!"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <FaUser size={18} />
                Full Name
              </div>
              <input
                value={updatedName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setUpdatedName(event.target.value)
                }
                className="px-4 py-2 w-full bg-base-200 rounded-lg border text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <IoIosMail size={22} />
                Email
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border disabled cursor-not-allowed text-gray-500">
                {authUser?.email}
              </p>
            </div>

            <button
              className="bg-[dodgerblue] text-white cursor-pointer w-full py-2 rounded-md hover:opacity-95"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
