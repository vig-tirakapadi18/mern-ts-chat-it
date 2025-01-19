import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { IFormData } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

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
  signUp: (data: IFormData) => void;
  signOut: () => void;
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

  signUp: async (data: IFormData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/sign-up", data);
      toast.success("Account created successfully!");
      set({ authUser: response.data.user });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error creating the account!");
      }
      console.log("SIGN UP", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signOut: async () => {
    try {
      await axiosInstance.post("/auth/sign-out");
      set({ authUser: null });

      toast.success("User signed out successfully!");
    } catch (error: unknown) {
      console.log("SIGN OUT", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error creating the account!");
      }
    }
  },
}));
