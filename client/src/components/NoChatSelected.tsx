import React, { FC } from "react";
import noChatBg from "../assets/no-chats.webp";

const NoChatSelected: FC = (): React.JSX.Element => {
  return (
    <section className="flex flex-col gap-3 justify-center items-center h-full w-[80%]">
      <img src={noChatBg} alt="start chat" className="w-72" />
      <h1 className="text-3xl font-semibold">
        Welcome to <span className="text-[dodgerblue]">ChatIt!</span>
      </h1>
      <span>Start chatting by selecting a chat from sidebar.</span>
    </section>
  );
};

export default NoChatSelected;
