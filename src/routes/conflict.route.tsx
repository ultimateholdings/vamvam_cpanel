import { RouteObject } from "react-router-dom";
import { conflictLoader } from "../api/auth/loader";
import ProfilePage from "../pages/Profile";

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
  ],
};

export default conflictRoute;
