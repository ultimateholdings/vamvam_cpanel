import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { actions } from "./authentication.actions";


export type AuthState = {
    currentUser: Admin,
    connected: boolean,
    token: string,
}

const initialState: AuthState = {
    currentUser: new Admin(),
    connected: true,
    token: "",
};


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: actions
});

export const {
    setToken,
    setCurrentUser,
    toogleConnect,
    setAuthState
} = authSlice.actions;

export default authSlice.reducer;