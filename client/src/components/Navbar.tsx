import React, { FC } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar: FC = (): React.JSX.Element => {
  const { signOut, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b-[0.5px] border-b-[gray] fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MdMessage />
              </div>
              <h1 className="text-xl font-bold">ChatIt</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors bg-amber-500 text-black hover:bg-amber-500 hover:bg-opacity-95"
            >
              <IoMdSettings />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 bg-[dodgerblue] text-black hover:bg-[dodgerblue] hover:bg-opacity-95"
                >
                  <FaUser />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="btn btn-sm flex gap-2 items-center bg-rose-500 text-black hover:bg-rose-500 hover:bg-opacity-95"
                  onClick={signOut}
                >
                  <IoLogOutOutline size={22} />
                  <span className="hidden sm:inline">Sign Out</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
