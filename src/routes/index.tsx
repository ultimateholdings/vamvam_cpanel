import { RouteObject, createBrowserRouter, Navigate } from "react-router-dom";
import adminRoute from "./admin.route";
import {
  authenticationLoader,
  logoutAction,
  tokenLoader,
} from "../api/auth/loader";
import { getUserRole } from "../helper/utils";
import Layout from "../components/UI/Layout";
import SignInPage from "../pages/auth/SignIn";
import registrationRoute from "./registration.route";
import conflictRoute from "./conflict.route";
import ErrorPage from "../pages/Error";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import ValidateCodePage from "../pages/auth/ValidateCode";

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
    path: "/forgot-password",
    loader: authenticationLoader,
    element: <ForgotPasswordPage />,
  },
  {
    path: "/validate-code",
    loader: authenticationLoader,
    element: <ValidateCodePage />,
  },
  {
    path: "/reset-password",
    loader: authenticationLoader,
    element: <ResetPasswordPage />,
  },
  {
    path: "/logout",
    loader: logoutAction,
  },
];

const router = createBrowserRouter(routes);

export default router;
