import { PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "./users.slice"

export const actions = {
    setUsersState: (state: UsersState, action: PayloadAction<UsersState>) => {
        state = action.payload;
    },
}