import React, { FC } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { IoClose } from "react-icons/io5";

const ChatHeader: FC = (): React.JSX.Element => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header className="py-2 px-4 border-b-[0.5px] border-gray-600 shadow-lg sticky top-0 z-10 bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic}
                alt={selectedUser?.name}
                className=""
              />
            </div>
          </div>

          <div className="">
            <h3 className="font-semibold text-xl">{selectedUser?.name}</h3>
            <p className="text-sm text-gray-300 font-light mt-1">
              {onlineUsers.includes(selectedUser?._id as any)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <IoClose size={24} className="text-rose-500" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
