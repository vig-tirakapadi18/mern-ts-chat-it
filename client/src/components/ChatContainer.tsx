import React, { FC, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import RingSpinner from "./UI/RingSpinner";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatDateTime } from "../utils/formatDateTime";
import { IMessage } from "../types";

const ChatContainer: FC = (): React.JSX.Element => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessages(selectedUser?._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    getMessages,
    selectedUser?._id,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Scrolles to the new message
  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return (
      <RingSpinner className="flex justify-center items-center w-full text-stone-500" />
    );

  return (
    <section className="flex-1 flex-col overflow-auto">
      <ChatHeader />

      <section className="flex-1 overflow-y-scroll p-4 space-y-0">
        {messages.map((message: IMessage) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic
                      : selectedUser?.profilePic
                  }
                  alt="message profile"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatDateTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.message && (
                <p
                  className={`${
                    message.senderId === authUser?._id
                      ? "text-end"
                      : "text-start"
                  }`}
                >
                  {message.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <MessageInput />
    </section>
  );
};

export default ChatContainer;
