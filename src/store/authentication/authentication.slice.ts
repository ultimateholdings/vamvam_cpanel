import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { authReducers } from "./authentication.actions";
import { adminLogin } from "./authentication.repository";
import { ErrorResponseApi } from "../../utils/constants/types";
import { getErrorResponse } from "../../utils/helpers/functions";
import { authStorage } from "../../modules/authModule/helpers/auth";
import { STATUS } from "../../utils/constants/enums";


export type AuthState = {
    currentUser?: Admin,
    connected: boolean,
    token: string,
    error?: Error,
    errorMessage?: ErrorResponseApi,

    signInstatus: STATUS,
}

const storedAuthState = authStorage.getStoreAuthState();


const initialState: AuthState = {
    currentUser: undefined,
    connected: false,
    token: "",
    error: undefined,
    errorMessage: undefined,

    signInstatus: STATUS.IDLE
};



export const authSlice = createSlice({
    name: "auth",
    initialState: storedAuthState ? storedAuthState :  initialState,
    reducers: authReducers,
    extraReducers(builder) {

        //adminLogin
        builder.addCase(adminLogin.pending, (state: AuthState) => {
            state.signInstatus = STATUS.LOADING;
        },),
        builder.addCase(adminLogin.fulfilled, (state: AuthState, action: any) => {
            state.signInstatus = STATUS.SUCCESS;
            state.token = action.payload.token;
            state.connected = true;
            authStorage.localStoreAuthState(state);
        },),
        builder.addCase(adminLogin.rejected, (state: AuthState, action: any) => {
            state.errorMessage = getErrorResponse(action.payload)
            state.signInstatus = STATUS.FAIL;
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