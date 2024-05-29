import { createSlice } from "@reduxjs/toolkit";
import SponsorData from "../../models/sponsors/sponsor-data";

interface SponsorState {
  sponsors: SponsorData[];
  pageToken?: string;
  refreshed: boolean;
  prevRole?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: SponsorState = {
  sponsors: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const sponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {
    changeData(state, action) {
      const { sponsors, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newSponsors = (sponsors as SponsorData[]).filter(
          (newSponsor) =>
            state.sponsors.findIndex((sponsor) => sponsor.id === newSponsor.id) === -1
        );
        state.sponsors = [...state.sponsors, ...newSponsors];
      } else {
        state.sponsors = [...state.sponsors, ...sponsors];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeSponsors(state, action) {
      state.sponsors = action.payload;
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
      state.sponsors = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.prevRole = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
    },
  },
});

export const sponsorActions = sponsorSlice.actions;

export default sponsorSlice.reducer;
