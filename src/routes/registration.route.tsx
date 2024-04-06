import { Navigate, RouteObject } from "react-router-dom";
import { registrationLoader } from "../api/auth/loader";
import ProfilePage from "../pages/Profile";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import {
  NewRegistrationsList,
  CreateInternalDriverPage,
  SettledRegistrationsList,
  UpdateRegistrationPage,
} from "../pages/registration";

const registrationRoute: RouteObject = {
  path: "registration-manager",
  loader: registrationLoader,
  children: [
    {
      index: true,
      element: <Navigate to="new-registrations" />,
    },
    {
      path: "new-registrations",
      element: <NewRegistrationsList />,
    },
    {
      path: "settled-registrations",
      element: <SettledRegistrationsList />,
    },
    {
      path: "create-internal-driver",
      element: <CreateInternalDriverPage />,
    },
    {
      path: "update-registrations/:id",
      element: <UpdateRegistrationPage />,
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
