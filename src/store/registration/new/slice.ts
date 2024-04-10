import { createSlice } from "@reduxjs/toolkit";
import { RegistrationData } from "../../../models/registrations/registration-data";

interface RegistrationState {
  newRegistrations: RegistrationData[];
  pageToken?: string;
  refreshed: boolean;
  name?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: RegistrationState = {
  newRegistrations: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const newRegistrationslice = createSlice({
  name: "newRegistrations",
  initialState,
  reducers: {
    changeData(state, action) {
      const { newRegistrations, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newnewRegistrations = (
          newRegistrations as RegistrationData[]
        ).filter(
          (newReg) =>
            state.newRegistrations.findIndex((el) => el.id === newReg.id) === -1
        );
        state.newRegistrations = [
          ...state.newRegistrations,
          ...newnewRegistrations,
        ];
      } else {
        state.newRegistrations = [
          ...state.newRegistrations,
          ...newRegistrations,
        ];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeName(state, action) {
      state.name = action.payload;
      state.currentPage = 0;
    },
    changeNewRegistrations(state, action) {
      state.newRegistrations = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changeInitialRequest(state, action) {
      state.initialReqSent = action.payload;
    },
    changeLoading(state, action) {
      state.loading = action.payload;
    },
    handleNewRegistration(state, action) {
      const id = action.payload;
      const userIndex = state.newRegistrations.findIndex(
        (user) => user.id === id
      );
      if (userIndex !== -1) {
        state.newRegistrations.splice(userIndex, 1);
      }
    },
    emptyState(state) {
      state.newRegistrations = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.name = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
    },
  },
});

export const newRegistrationActions = newRegistrationslice.actions;

export default newRegistrationslice.reducer;
