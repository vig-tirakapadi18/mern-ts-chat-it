import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const App = () => {
  const { authUser, getLoggedInUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
};

export default App;
