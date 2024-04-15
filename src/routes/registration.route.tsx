import { Navigate, RouteObject } from "react-router-dom";
import { registrationLoader } from "../api/auth/loader";
import ProfilePage from "../pages/Profile";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import {
  NewRegistrationsList,
  CreateInternalDriverPage,
  SettledRegistrationsList,
  RegistrationDetails,
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
      children: [
        {
          index: true,
          element: <NewRegistrationsList />,
        },
        {
          path: ":id",
          element: <RegistrationDetails />,
        },
      ],
    },
    {
      path: "settled-registrations",
      children: [
        {
          index: true,
          element: <SettledRegistrationsList />,
        },
        {
          path: ":id",
          element: <RegistrationDetails />,
        },
      ],
    },
    {
      path: "create-internal-driver",
      element: <CreateInternalDriverPage />,
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
