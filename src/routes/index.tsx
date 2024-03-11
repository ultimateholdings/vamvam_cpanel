import { RouteObject, createBrowserRouter, Navigate } from "react-router-dom";
import adminRoute from "./admin.route";
import {
  authenticationLoader,
  logoutAction,
  tokenLoader,
} from "../api/auth/loader";
import { getUserRole } from "../helper/utils";
import Layout from "../components/UI/Layout";
import SignInPage from "../pages/SignIn";
import registrationRoute from "./registration.route";
import conflictRoute from "./conflict.route";
import ErrorPage from "../pages/Error";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={getUserRole()!} />,
      },
      adminRoute,
      registrationRoute,
      conflictRoute,
    ],
  },

  {
    path: "/signing",
    loader: authenticationLoader,
    element: <SignInPage />,
  },
  {
    path: "/logout",
    loader: logoutAction,
  },
];

export const router = createBrowserRouter(routes);
