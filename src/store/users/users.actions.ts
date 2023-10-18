import { PayloadAction } from "@reduxjs/toolkit";
import { UsersState, initialState } from "./users.slice"

export const reducers = {
    setUsersState: (state: UsersState, action: PayloadAction<UsersState>) => {
        state = action.payload;
    },
    resetCreateUserState: (state: UsersState) => {
        state.createUserstatus = initialState.createUserstatus;
        state.errorMessage = initialState.errorMessage;
    },
}