import { createSlice } from "@reduxjs/toolkit";
import UserData from "../../../models/auth/user-data";

interface usersSponsoredState {
  usersSponsored: UserData[];
  pageToken?: string;
  refreshed: boolean;
  prevRole?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: usersSponsoredState = {
  usersSponsored: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const usersSponsoredlice = createSlice({
  name: "usersSponsored",
  initialState,
  reducers: {
    changeData(state, action) {
      const { usersSponsored, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newusersSponsored = (usersSponsored as UserData[]).filter(
          (newSponsor) =>
            state.usersSponsored.findIndex((user) => user.id === newSponsor.id) === -1
        );
        state.usersSponsored = [...state.usersSponsored, ...newusersSponsored];
      } else {
        state.usersSponsored = [...state.usersSponsored, ...usersSponsored];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeusersSponsored(state, action) {
      state.usersSponsored = action.payload;
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
    emptyState(state) {
      state.usersSponsored = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.prevRole = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
    },
  },
});

export const usersponsoredActions = usersSponsoredlice.actions;

export default usersSponsoredlice.reducer;
