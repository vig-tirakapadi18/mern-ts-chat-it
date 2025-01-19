import React, { FC, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore";
import bgImage from "../assets/chatting.webp";
import RingSpinner from "../components/UI/RingSpinner";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/UI/AuthImagePattern";
import toast from "react-hot-toast";
import { ISignUpFormData } from "../types";

const SignUp: FC = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signUp } = useAuthStore();

  const validateFromData = () => {
    if (!formData.name.trim())
      return toast.error("Please enter your full name!");

    if (!formData.email.trim()) return toast.error("Please enter your email!");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Please enter a valid email address!");

    if (!formData.password) return toast.error("Please enter a password!");

    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters long!");

    return true;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (validateFromData() === true) {
      signUp(formData);
    }
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
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser size={20} />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

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
              disabled={isSigningUp}
              type="submit"
            >
              {isSigningUp ? (
                <div className="flex items-center gap-1">
                  <RingSpinner width={30} />
                  <span className="text-white">Loading...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p>
              Already have an account?{"  "}
              <Link to="/sign-in" className="text-[dodgerblue] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block md:block md:items-center mr-20">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay connected with your loved ones!"
          bgImage={bgImage}
        />
      </div>
    </section>
  );
};

export default SignUp;
