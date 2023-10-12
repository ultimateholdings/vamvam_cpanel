import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { actions } from "./authentication.actions";
import { adminLogin } from "./authentication.repository";
import { ErrorResponseApi } from "../../utils/constants/types";
import { getResponse } from "../../utils/helpers/functions";
import { setBearerAccessToken } from "../../services/auth/auth";


export type AuthState = {
    currentUser?: Admin,
    connected: boolean,
    token: string,
    loading: boolean,
    error?: Error,
    errorMessage?: ErrorResponseApi,
}

const initialState: AuthState = {
    currentUser: undefined,
    connected: true,
    loading: false,
    token: "",
    error: undefined,
    errorMessage: undefined,
};


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: actions,
    extraReducers(builder) {

        //adminLogin
        builder.addCase(adminLogin.pending, (state: AuthState) => {
            state.loading = true;
        },),
            builder.addCase(adminLogin.fulfilled, (state: AuthState, action: any) => {
                state.loading = false;
                state.token = action.payload.token;
                setBearerAccessToken(action.payload.token);
                state.connected = true;
            },),
            builder.addCase(adminLogin.rejected, (state: AuthState, action: any) => {
                state.errorMessage = getResponse(action)
                state.loading = false;
            },)
    },
});

export const {
    setToken,
    setCurrentUser,
    toogleConnect,
    setAuthState
} = authSlice.actions;

export default authSlice.reducer;