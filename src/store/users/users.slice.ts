import {
    createSlice
} from "@reduxjs/toolkit";


import Admin from '../../modules/usersModule/model/admin'
import { reducers } from "./users.actions";
import { ErrorResponseApi } from "../../utils/constants/types";
import { driverRegister, newAdmi, userAll } from "./users.repository";
import { getErrorResponse } from "../../utils/helpers/functions";
import { STATUS } from "../../utils/constants/enums";
import User from "../../modules/usersModule/model/user";


export type UsersState = {
    users?: User[],
    error?: Error,
    errorMessage?: ErrorResponseApi,
    nextTokenPage?:string,

    createUserstatus: STATUS,

    userListstatus: STATUS,

}

const initialState: UsersState = {
    users: [],
    error: undefined,
    errorMessage: undefined,
    nextTokenPage:undefined,

    createUserstatus: STATUS.IDLE,

    userListstatus: STATUS.IDLE,
};


export const authSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: reducers,
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
        },),

        //userAll
        builder.addCase(userAll.pending, (state: UsersState) => {
            state.userListstatus = STATUS.LOADING;
        },),
        builder.addCase(userAll.fulfilled, (state: UsersState, action: any) => {
            state.userListstatus = STATUS.SUCCESS;
            state.errorMessage = undefined;
            state.users = action.payload.results;            
        },),
        builder.addCase(userAll.rejected, (state: UsersState, action: any) => {
            state.errorMessage = getErrorResponse(action.payload)
            state.userListstatus = STATUS.FAIL;
        },)
    },
});

export const {
    setUsersState,
    resetCreateUserState
} = authSlice.actions;

export { initialState };

export default authSlice.reducer;