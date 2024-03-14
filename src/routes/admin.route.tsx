import { RouteObject } from "react-router-dom";
import { adminLoader } from "../api/auth/loader";
import UsersPage from "../pages/admin/Users";
import CreateUserPage from "../pages/admin/CreateUser";
import ProfilePage from "../pages/Profile";
import { Home, Deliveries } from "../pages/admin";

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
            path: "sponsors",
        },
        {
            path: "deliveries",
            element: <Deliveries />
        },
        {
            path: "recharges",
        },
        {
            path: "subscriptions",
        }
    ]
};

export default adminRoute;
