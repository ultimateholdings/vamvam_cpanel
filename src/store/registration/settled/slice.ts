import { createSlice } from "@reduxjs/toolkit";
import { RegistrationData } from "../../../models/registrations/registration-data";

interface RegistrationState {
  settledRegistrations: RegistrationData[];
  pageToken?: string;
  refreshed: boolean;
  name?: string;
  from?: string;
  to?: string;
  status?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: RegistrationState = {
  settledRegistrations: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const settledRegistrationslice = createSlice({
  name: "settledRegistrations",
  initialState,
  reducers: {
    changeData(state, action) {
      const { settledRegistrations, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newSettledRegistrations = (
          settledRegistrations as RegistrationData[]
        ).filter(
          (newReg) =>
            state.settledRegistrations.findIndex(
              (el) => el.id === newReg.id
            ) === -1
        );
        state.settledRegistrations = [
          ...state.settledRegistrations,
          ...newSettledRegistrations,
        ];
      } else {
        state.settledRegistrations = [
          ...state.settledRegistrations,
          ...settledRegistrations,
        ];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeName(state, action) {
      state.name = action.payload;
      state.currentPage = 0;
    },
    changeInterval(state, action) {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.currentPage = 0;
    },
    changeStatus(state, action) {
      state.status = action.payload;
      state.currentPage = 0;
    },
    changeSettledRegistrations(state, action) {
      state.settledRegistrations = action.payload;
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
    handleSettledRegistration(state, action) {
      const id = action.payload;
      const userIndex = state.settledRegistrations.findIndex(
        (user) => user.id === id
      );
      if (userIndex !== -1) {
        state.settledRegistrations.splice(userIndex, 1);
      }
    },
    emptyState(state) {
      state.settledRegistrations = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.name = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
      state.status = undefined;
      state.from = undefined;
      state.to = undefined;
    },
  },
});

export const settledRegistrationActions = settledRegistrationslice.actions;

export default settledRegistrationslice.reducer;
