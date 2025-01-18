import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface IAuthState {
  authUser: {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  } | null;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  getLoggedInUser: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  getLoggedInUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/logged-user");
      set({ authUser: response.data.user });
    } catch (error) {
      console.log("GET LOGGED IN USER", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
