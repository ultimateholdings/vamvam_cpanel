import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { actions } from "./users.actions";
import { ErrorResponseApi } from "../../utils/constants/types";
import { getResponse } from "../../utils/helpers/functions";
import { setBearerAccessToken } from "../../services/auth/auth";
import { driverRegister } from "./users.repository";


export type UsersState = {
    users?: Admin,
    error?: Error,
    errorMessage?: ErrorResponseApi,
    loading: boolean,
}

const initialState: UsersState = {
    users: undefined,
    loading: false,
    error: undefined,
    errorMessage: undefined,
};


export const authSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: actions,
    extraReducers(builder) {
        
        //driverRegister
        builder.addCase(driverRegister.pending, (state: UsersState) => {
            state.loading = true;
        },),
            builder.addCase(driverRegister.fulfilled, (state: UsersState, action: any) => {
                state.loading = false;
                setBearerAccessToken(action.payload.token);
            },),
            builder.addCase(driverRegister.rejected, (state: UsersState, action: any) => {
                state.errorMessage = getResponse(action)
                state.loading = false;
            },),

        //newAdmi
        builder.addCase(driverRegister.pending, (state: UsersState) => {
            state.loading = true;
        },),
            builder.addCase(driverRegister.fulfilled, (state: UsersState, action: any) => {
                state.loading = false;
                setBearerAccessToken(action.payload.token);
            },),
            builder.addCase(driverRegister.rejected, (state: UsersState, action: any) => {
                state.errorMessage = getResponse(action)
                state.loading = false;
            },)
    },
});

export const {
    setUsersState
} = authSlice.actions;

export default authSlice.reducer;