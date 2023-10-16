import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { authReducers } from "./authentication.actions";
import { adminLogin } from "./authentication.repository";
import { ErrorResponseApi } from "../../utils/constants/types";
import { getResponse } from "../../utils/helpers/functions";
import { authStorage } from "../../services/auth/auth";


export type AuthState = {
    currentUser?: Admin,
    connected: boolean,
    token: string,
    loading: boolean,
    error?: Error,
    errorMessage?: ErrorResponseApi,
}

const storedAuthState = authStorage.getStoreAuthState();


const initialState: AuthState = {
    currentUser: undefined,
    connected: false,
    loading: false,
    token: "",
    error: undefined,
    errorMessage: undefined,

};



export const authSlice = createSlice({
    name: "auth",
    initialState: storedAuthState ? storedAuthState :  initialState,
    reducers: authReducers,
    extraReducers(builder) {

        //adminLogin
        builder.addCase(adminLogin.pending, (state: AuthState) => {
            state.loading = true;
        },),
            builder.addCase(adminLogin.fulfilled, (state: AuthState, action: any) => {
                state.loading = false;
                state.token = action.payload.token;
                authStorage.setBearerAccessToken(action.payload.token);
                state.connected = true;
                authStorage.localStoreAuthState(state);
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
    setAuthState,
    userLogOut
} = authSlice.actions;

export {initialState};

export default authSlice.reducer;