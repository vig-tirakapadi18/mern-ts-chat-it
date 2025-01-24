import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { ISignInFormData, ISignUpFormData, IUpdateProfile } from "../types";
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
  signUp: (data: ISignUpFormData) => void;
  signOut: () => void;
  signIn: (data: ISignInFormData) => void;
  updateProfile: (data: IUpdateProfile) => void;
  onlineUsers: any[];
}

export const useAuthStore = create<IAuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  getLoggedInUser: async () => {
    try {
      const response = await axiosInstance.get("/users/user/logged-user");
      set({ authUser: response.data.user });
    } catch (error) {
      console.log("GET LOGGED IN USER", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: ISignUpFormData) => {
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

  signIn: async (data: ISignInFormData) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/sign-in", data);
      set({ authUser: response.data });

      toast.success("User signed in successfully!");
    } catch (error) {
      console.log("SIGN IN", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error creating the account!");
      }
    } finally {
      set({ isSigningIn: false });
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

  updateProfile: async (data: IUpdateProfile) => {
    try {
      const response = await axiosInstance.put(
        "/users/user/update-details",
        data
      );

      set({ authUser: response.data.user });
    } catch (error: unknown) {
      console.log("UPDATE PROFILE", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error updating the profile!");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
