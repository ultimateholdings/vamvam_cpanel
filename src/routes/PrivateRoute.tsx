import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function () {
    const isAuth = useSelector((state: any) => {
        return state.auth.connected
    });

    return isAuth ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}