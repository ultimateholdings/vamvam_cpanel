import { PayloadAction } from "@reduxjs/toolkit";
import User from "../../modules/usersModule/model/user";
import { AuthState } from "./authentication.slice"

export const actions = {
    setToken: (state: AuthState, action: PayloadAction<string>) => {
        state.token = action.payload;
    },
    setCurrentUser: (state: AuthState, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
    },
    toogleConnect: (state: AuthState) => {
        state.connected = !state.connected;
    },
    setAuthState: (state: AuthState, action: PayloadAction<AuthState>) => {
        state = action.payload;
    },
}