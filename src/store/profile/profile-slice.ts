import { createSlice } from "@reduxjs/toolkit";
import UserData from "../../models/auth/user-data";

interface ProfileState {
  userData?: UserData;
  loading: boolean;
  error?: Error;
}

const initialState: ProfileState = {
  userData: undefined,
  loading: false,
  error: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    changeUserData(state, action) {
      state.userData = action.payload.userData;
      state.loading = false;
      state.error = undefined;
    },
    changeIsLoading(state) {
      state.loading = true;
    },
    changeError(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
    updateProfile(state, action) {
      state.userData = { ...state.userData, ...action.payload.userData };
    },
    deleteAvatar(state) {
      const avatar = state.userData?.avatar;
      if (avatar) {
        state.userData!.avatar = undefined;
      }
    },
    updateAvatar(state, action) {
      state.userData!.avatar = action.payload.avatar;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
