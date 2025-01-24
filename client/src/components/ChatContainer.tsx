import React, { FC, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import RingSpinner from "./UI/RingSpinner";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer: FC = (): React.JSX.Element => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  if (isMessagesLoading) return <RingSpinner className="flex justify-center items-center w-full text-stone-500" />;

  return <section className="flex-1 flex-col overflow-auto">
    <ChatHeader />

    <p>Messages...</p>

    <MessageInput />
  </section>;
};

export default ChatContainer;
