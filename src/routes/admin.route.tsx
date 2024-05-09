import { RouteObject } from "react-router-dom";
import { adminLoader } from "../api/auth/loader";
import UsersPage from "../pages/admin/UsersList";
import CreateUserPage from "../pages/admin/CreateUser";
import ProfilePage from "../pages/Profile";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import SettingsPage from "../pages/admin/Settings";
import { loadSettings } from "../api/admin/loader";
import { Home, Deliveries } from "../pages/admin";
import DisconnectAllPage from "../pages/admin/DisconnectAll";
import BundlesPage from "../pages/admin/bundles/BundlesList";
import CreateBundlePage from "../pages/admin/bundles/CreateBundle";

const adminRoute: RouteObject = {
  path: "admin",
  loader: adminLoader,
  children: [
    {
      index: true,
      element: <Home />,
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
      path: "settings",
      element: <SettingsPage />,
      loader: loadSettings,
    },
    {
      path: "disconnect-all",
      element: <DisconnectAllPage />,
    },
    {
      path: "change-password",
      element: <ChangePasswordPage />,
    },
    {
      path: "sponsors",
    },
    {
      path: "deliveries",
      element: <Deliveries />,
    },
    {
      path: "recharges",
    },
    {
      path: "subscriptions",
    },
    {
      path: "bundles",
      element: <BundlesPage />,
    },
    {
      path: "create-bundle",
      element: <CreateBundlePage />,
    },
    {
      path: "edit-bundle",
      element: <CreateBundlePage />,
    }
  ],
};

export default adminRoute;
