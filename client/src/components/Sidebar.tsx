import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { FaUsers } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineUsersOnly, setShowOnlineUsersOnly] =
    useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredOnlineUsers = showOnlineUsersOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 text-[dodgerblue] text-2xl justify-between">
          <span className="font-medium hidden lg:block">Contacts</span>
          <FaUsers size={30} />
        </div>

        <div className="mt-3 hidde lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineUsersOnly}
              onChange={(event) => setShowOnlineUsersOnly(event.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online Only</span>
          </label>
          <span className="text-xs text-stone-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredOnlineUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic}
                alt={user.name}
                className="size-1/2 object-cover rounded-full w-10"
              />

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-sky-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">
                {user.name || "Anonymous"}
              </div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredOnlineUsers.length === 0 && (
          <div className="text-center text-stone-500 py-4">
            No Online Users!
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
