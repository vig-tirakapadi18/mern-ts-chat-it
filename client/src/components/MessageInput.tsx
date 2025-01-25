import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { IoMdCloseCircle } from "react-icons/io";
import { ImImage } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      return fileInputRef.current.value === "";
    }
  };

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (!message.trim() && !imagePreview) return;

    try {
      await sendMessage({
        message: message.trim(),
        image: imagePreview,
      });

      setMessage("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: unknown) {
      console.log("SEND MESSAGE", error);
    }
  };

  return (
    <section className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-stone-600"
            />

            <button
              onClick={removeSelectedImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <IoMdCloseCircle />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Message"
            value={message}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMessage(event.target.value)
            }
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-stone-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImImage size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`btn btn-md btn-circle ${
            message || imagePreview ? "text-[dodgerblue]" : ""
          }`}
          disabled={!message.trim() && !imagePreview}
        >
          <BsSendFill size={20} />
        </button>
      </form>
    </section>
  );
};

export default MessageInput;
