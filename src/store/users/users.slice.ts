import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { actions } from "./users.actions";
import { ErrorResponseApi } from "../../utils/constants/types";
import { driverRegister, newAdmi } from "./users.repository";
import { getErrorResponse } from "../../utils/helpers/functions";
import { STATUS } from "../../utils/constants/enums";


export type UsersState = {
    users?: Admin,
    error?: Error,
    errorMessage?: ErrorResponseApi,

    createUserstatus: STATUS,
}

const initialState: UsersState = {
    users: undefined,
    error: undefined,
    errorMessage: undefined,

    createUserstatus: STATUS.IDLE
};


export const authSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: actions,
    extraReducers(builder) {

        //driverRegister
        builder.addCase(driverRegister.pending, (state: UsersState) => {
            state.createUserstatus = STATUS.LOADING;
        },),
            builder.addCase(driverRegister.fulfilled, (state: UsersState) => {
                state.createUserstatus = STATUS.SUCCESS;
            },),
            builder.addCase(driverRegister.rejected, (state: UsersState, action: any) => {
                state.errorMessage = getErrorResponse(action.payload);
                state.createUserstatus = STATUS.FAIL;
            },),

            //newAdmi
            builder.addCase(newAdmi.pending, (state: UsersState) => {
                state.createUserstatus = STATUS.LOADING;
            },),
            builder.addCase(newAdmi.fulfilled, (state: UsersState) => {
                state.createUserstatus = STATUS.SUCCESS;
                state.errorMessage = undefined;
            },),
            builder.addCase(newAdmi.rejected, (state: UsersState, action: any) => {
                state.errorMessage = getErrorResponse(action.payload)
                state.createUserstatus = STATUS.FAIL;
            },)
    },
});

export const {
    setUsersState,
    resetCreateUserState
} = authSlice.actions;

export {initialState};

export default authSlice.reducer;