import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { AuthState } from '../store/authentication/authentication.slice';

export default function () {
    const authState = useSelector((state: { auth: AuthState }) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.connected) {
            navigate("/auth/signin");
        }
        return () => {
        }
    }, [authState])
    

    return authState.connected ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}