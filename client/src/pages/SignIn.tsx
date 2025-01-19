import React, { FC, FormEvent, useState } from "react";
import { ISignInFormData } from "../types";
import { useAuthStore } from "../store/useAuthStore";
import bgImage from "../assets/chatting2.webp";
import { MdMessage } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import RingSpinner from "../components/UI/RingSpinner";
import AuthImagePattern from "../components/UI/AuthImagePattern";

const SignIn: FC = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISignInFormData>({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn } = useAuthStore();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    signIn(formData);
  };

  return (
    <section className="min-h-screen flex lg:justify-center lg:items-center md:flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:w-[50%] sm:w-full sm:items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MdMessage color="dodgerblue" size={32} />
              </div>

              <h1 className="text-2xl font-bold mt-12">Create Account</h1>
              <p className="text-sm text-gray-500">
                Sign up to continue using{" "}
                <span className="text-[dodgerblue] font-semibold">ChatIt</span>
              </p>
            </div>
          </div>

          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoIosMail size={22} />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="john.doe@gmail.com"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-control my-6">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10"
                    placeholder="٭٭٭٭٭٭٭٭"
                    value={formData.password}
                    onChange={(event) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        password: event.target.value,
                      }))
                    }
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              className="btn bg-[dodgerblue] text-white w-full hover:bg-[dodgerblue] hover:bg-opacity-95"
              disabled={isSigningIn}
              type="submit"
            >
              {isSigningIn ? (
                <div className="flex items-center gap-1">
                  <RingSpinner width={30} />
                  <span className="text-white">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p>
              Don&apos;t have an account?{"  "}
              <Link to="/sign-up" className="text-[dodgerblue] hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block md:block md:items-center mr-20">
        <AuthImagePattern
          title="Welcome back!!!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
          bgImage={bgImage}
        />
      </div>
    </section>
  );
};

export default SignIn;
