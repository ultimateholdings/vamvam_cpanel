import { RouteObject } from "react-router-dom";
import { registrationLoader } from "../api/auth/loader";
import ProfilePage from "../pages/Profile";
import ChangePasswordPage from "../pages/auth/ChangePassword";

const registrationRoute: RouteObject = {
  path: "registration",
  loader: registrationLoader,
  children: [
    {
      index: true,
      // element: <HomePage />
    },
    {
      path: "users",
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "change-password",
      element: <ChangePasswordPage />,
    },
  ],
};

export default registrationRoute;
