import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IMessage, IUser } from "../types";
import { useAuthStore } from "./useAuthStore";

interface IChatStore {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null | undefined;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => void;
  setSelectedUser: (selectedUser: IUser | null) => void;
  sendMessage: (messageData: any) => void;
  getMessages: (userId: string | undefined) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data.users });
    } catch (error: unknown) {
      console.log("GET USERS", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error fetching users!");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string | undefined) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data.messages });
    } catch (error: unknown) {
      console.log("GET MESSAGES", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error fetching messages!");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    console.log(messageData)

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, response.data.message] });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error sending message!");
      }
    }
  },

  setSelectedUser: (selectedUser: IUser | null) => set({ selectedUser }),

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: IMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      // returns if the message is not sent from a secected User

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
