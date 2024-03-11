import { RouteObject } from "react-router-dom";
import { adminLoader } from "../api/auth/loader";
import HomePage from "../pages/admin/Home";
import UsersPage from "../pages/admin/Users";
import CreateUserPage from "../pages/admin/CreateUser";
import ProfilePage from "../pages/Profile";

const adminRoute: RouteObject = {
  path: "admin",
  loader: adminLoader,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "users",
      element: <UsersPage />,
    },
    {
      path: "create-user",
      element: <CreateUserPage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "sponsors",
    },
    {
      path: "deliveries",
    },
    {
      path: "recharges",
    },
    {
      path: "subscriptions",
    },
  ],
};

export default adminRoute;
