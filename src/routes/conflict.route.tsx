import { RouteObject } from "react-router-dom";
import { conflictLoader } from "../api/auth/loader";
import ProfilePage from "../pages/Profile";
import ChangePasswordPage from "../pages/auth/ChangePassword";

const conflictRoute: RouteObject = {
  path: "conflict",
  loader: conflictLoader,
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

export default conflictRoute;
