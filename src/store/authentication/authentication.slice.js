import {
    createSlice
} from "@reduxjs/toolkit";

import {actions} from './authentication.actions'

const initialState = [{
    name: "",
}];


export const authSlice = createSlice({
    name: "siceName",
    initialState:initialState,
    reducers: actions
});

export const {
    updateBoxValue
} = authSlice.actions;

export default authSlice.reducer;