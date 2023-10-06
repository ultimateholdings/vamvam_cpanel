import { Outlet, Navigate } from 'react-router-dom';

export default function () {
    const isAuth = null; // your logic here

    return isAuth ? <Outlet /> : <Navigate to="/auth/signin" />;
}